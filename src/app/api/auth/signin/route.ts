import { NextRequest, NextResponse } from "next/server";
import { auth } from '@/utils/firebaseClient'
import { signInWithEmailAndPassword } from "firebase/auth";
import { signIn } from "@/utils/zod";
import db from "@/db/db";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    const { email, password } = await req.json()

    try {
        const isValid = signIn.safeParse({
            email: email,
            password: password
        })
        if(!isValid.success) {
            return NextResponse.json({
                success: 0,
                msg: "Invalid inputs"
            }, 
            {
                status: 400
            })
        }
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        const tokens = await db.token.findUnique({
            where: {
                userId: user.uid
            }
        })
        const cookieStore = await cookies()
        cookieStore.set({
            name: 'sessionKey',
            value: tokens?.accessToken as string,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 30 // 1 month
        })
        return NextResponse.json({
            success: 1,
            msg: "Successfully signed in",
        })
    } catch(error) {
        console.log(error)
        return NextResponse.json({
            success: 0,
            msg: "Failed to signed in"
        })
    }
}