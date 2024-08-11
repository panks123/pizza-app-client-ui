import { cookies } from "next/headers";
import cookie from 'cookie';

export async function POST() {
    const res = await fetch(`${process.env.BACKEND_URL}/api/auth/auth/refresh`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${cookies().get('accessToken')?.value}`,
            Cookie: `refreshToken=${cookies().get('refreshToken')?.value}`
        }
    });
    if(!res.ok) {
        console.log("Error refreshing token");
        return Response.json({success: false});
    }

    const c = res.headers.getSetCookie();
        const accessToken = c.find((cookie) => cookie.includes('accessToken'));
        const refreshToken = c.find((cookie) => cookie.includes('refreshToken'));
        if(!accessToken || !refreshToken) {
            console.log("Error refreshing token");
            return Response.json({success: false});
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

        return Response.json({success: true});
}