import { cookies } from "next/headers";

export async function GET() {
    return Response.json({accessToken: cookies().get('accessToken')?.value})
}