import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/utils/firebaseClient"
import { signInWithEmailAndPassword } from "firebase/auth";
import { signIn } from "@/utils/zod";
// import db from "@/db/db";
import { cookies } from "next/headers";
import admin from "@/utils/firebaseAdmin";
import { FirebaseError } from "firebase/app";

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
                status: 422
            })
        }
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const user = userCredential.user
            const idToken = await user.getIdToken()
            const expiresIn = 1000 * 60 * 60 *24 * 7 * 2 // 2 weeks
            const cookieStore = await cookies()
            const createCookie = await admin.auth().createSessionCookie( idToken, { expiresIn })
            // console.log(createCookie)
            cookieStore.set({
                name: "sessionKey",
                value: createCookie,
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 30 // 1 month
            })
            return NextResponse.json({
                success: 1,
                msg: "Successfully signed in",
            })
        } catch(error) {
            if(error instanceof FirebaseError) {
                if(error.code == 'auth/invalid-credential') {
                    return NextResponse.json({
                        success: 0,
                        msg: "Invalid credentials"
                    },
                    {
                        status: 401
                    })
                }
            }
            return NextResponse.json({
                msg: "Something went wrong"
            },
            {
                status: 500
            })
        }
    } catch(error) {
        console.log(error)
        return NextResponse.json({
            success: 0,
            msg: "Failed to signed in"
        },
        {
            status: 500
        })
    }
}