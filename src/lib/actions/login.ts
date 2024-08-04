'use server';
import cookie from 'cookie';
import { cookies } from 'next/headers';

export default async function login(prevState: any, formData: FormData) {
    const { email, password } = Object.fromEntries(formData);
    console.log({email, password});
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/auth/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        if(!response.ok) {
            const error = await response.json();
            return {
                type: 'error',
                message: error.errors[0].message
            }
        }

        const c = response.headers.getSetCookie();
        const accessToken = c.find((cookie) => cookie.includes('accessToken'));
        const refreshToken = c.find((cookie) => cookie.includes('refreshToken'));
        if(!accessToken || !refreshToken) {
            return {
                type: 'error',
                message: 'Invalid credentials'
            }
        }
        const parsedAccessToken = cookie.parse(accessToken);
        const parsedRefreshToken = cookie.parse(refreshToken);
        cookies().set({
            name: 'accessToken',
            value: parsedAccessToken.accessToken,
            expires: new Date(parsedAccessToken.Expires),
            httpOnly: (parsedAccessToken.HttpOnly as unknown as boolean) || true,
            path: parsedAccessToken.Path,
            domain: parsedAccessToken.Domain,
            sameSite: parsedAccessToken.SameSite as 'strict' | 'lax' | 'none',
        });

        cookies().set({
            name: 'refreshToken',
            value: parsedRefreshToken.refreshToken,
            expires: new Date(parsedRefreshToken.Expires),
            httpOnly: (parsedRefreshToken.HttpOnly as unknown as boolean) || true,
            path: parsedRefreshToken.Path,
            domain: parsedRefreshToken.Domain,
            sameSite: parsedRefreshToken.SameSite as 'strict' | 'lax' | 'none',
        })
        return {
            type: 'success',
            message: 'Login successful'
        }
    }
    catch (error : any) {
        console.error(error);
        return {
            type: 'error',
            message: error?.message || 'Something went wrong'
        };
    }
    return {};
}