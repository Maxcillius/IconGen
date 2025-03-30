import { NextRequest, NextResponse } from "next/server";
import db from "@/db/db";
import { signUp } from "@/utils/zod";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/firebaseClient";
import { cookies } from "next/headers";
import admin from "@/utils/firebaseAdmin";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { email, password } = body;
    try {
        const inputValidation = signUp.safeParse({
            email,
            password,
        });
        if (!inputValidation.success) {
            return NextResponse.json(
                {
                    success: 0,
                    msg: "Invalid inputs",
                },
                {
                    status: 422,
                }
            )
        }
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        const accessToken = await user.getIdToken()
        await db.$transaction(async (prisma) => {
            await prisma.account.create({
                data: {
                    uid: user.uid
                }
            })
            await prisma.token.create({
            data: {
                userId: user.uid,
                refreshToken: user.refreshToken,
                accessToken: accessToken,
            },
            })
            await prisma.user.create({
            data: {
                email: email,
                username: "FrostyByte",
                userId: user.uid,
                firstname: email.split("@")[0],
            },
            })
            const idToken = await user.getIdToken()
            const expiresIn = 60 * 60 * 24 * 30 // 1 month
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
        })
        return NextResponse.json({
            success: 1,
            msg: "User created",
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: 0,
            msg: "Failed to signup",
        });
    }
}