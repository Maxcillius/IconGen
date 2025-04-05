import authOptions from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json()
    const session = await getServerSession(authOptions)
    console.log(session)
    // console.log(body)
    return NextResponse.json({
        status: 200,
        message: "Hi, I am a POST request"
    })
}