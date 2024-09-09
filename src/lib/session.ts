import { User } from "@/types";
import { cookies } from "next/headers";

export async function getSession() {
    return await getSelf()
}

export type Session = {
    user: User;
}

const getSelf = async (): Promise<Session | null> => {
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/auth/auth/self`, {
            headers: {
                'Authorization': `Bearer ${cookies().get('accessToken')?.value}`,
            }
        });
    
        if(!response.ok) {
            return null
        }
        return {
            user: (await response.json()) as User
        }
    } catch (error) {
        console.log("Error getting session", error);
        return null
    }
}