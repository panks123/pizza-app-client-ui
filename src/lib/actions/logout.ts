'use server';

import { cookies } from "next/headers";

export const logout = async () => {
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/auth/auth/logout`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${cookies().get('accessToken')?.value}`,
                cookie: `refreshToken=${cookies().get('refreshToken')?.value}`
            }
        });
        if(!response.ok) {
            console.log("Logout failed!", response.status);
            return false;
        }
        cookies().delete('accessToken');
        cookies().delete('refreshToken');
        return true;
    }
    catch (error : any) {
        console.error(error);
        return false
    }
} 