'use client';
import React, { useEffect, useRef } from 'react';
import * as jose from 'jose';

const Refresher: React.FC<{children: React.ReactNode}> = ({children}) => {
    const timeoutId = useRef<NodeJS.Timeout | null>(null);
    const getAccessToken = async () => {
        const res = await fetch('/api/auth/accessToken');
        if(!res.ok) {
            return false
        }
        const accessToken = await res.json();
        return accessToken.accessToken;
    }

    const refreshAccessToken = async () => {
        try {
            const res = await fetch('/api/auth/refresh', {method: 'POST'});
            if(!res.ok) {
                console.log("Could not refresh token");
                return;
            }
            const refreshData = await res.json();
            if(!refreshData.success) {
                console.log("Could not refresh token");
                return;
            }
            console.log("Refreshed token");
        } catch (e) {
            console.error(e)
        }

        startRefresh();
    }

    const startRefresh = React.useCallback(async () => {
        if(timeoutId.current) {
            clearTimeout(timeoutId.current);
        }
        try {
            const accessToken = await getAccessToken();
            if(!accessToken) {
                console.log("NO access token")
                return;
            }
            const token = await jose.decodeJwt(accessToken);
            const exp = (token.exp as number) * 1000; // convert to ms
            const now = Date.now();
            const refreshTime = exp - now - 8000;
            console.log("Current time:: ", new Date(now).toISOString());
            console.log("Token expiry time::", new Date(exp).toISOString());
            console.log("Schedule Time:: ", new Date(refreshTime + now).toISOString());
            
            timeoutId.current = setTimeout(() => {
                refreshAccessToken();
            }, refreshTime);

        } catch (e) {
            console.error(e)
        }
    }, []);
    
    useEffect(() => {
        startRefresh();

        return () => {
            if(timeoutId.current) {
                clearTimeout(timeoutId.current);
            }
        }
    }, [startRefresh]);
  return (
    <>
      {children}
    </>
  )
}

export default Refresher;
