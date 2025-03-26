import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import admin from "@/utils/firebaseAdmin";
import OpenAI from "openai"
import { ImageGenerateParams } from "openai/resources/images.mjs";
import db from "@/db/db";

const openai = new OpenAI();

let modeContent = new Map<string, string>()
modeContent.set("Normal", "Create a balanced photograph with natural lighting and realistic proportions. Use standard photography techniques with moderate contrast and depth. Colors should appear true-to-life with natural saturation. The subject is ")
modeContent.set("Cartoon", "Generate a cartoon illustration with bold black outlines of varying thickness. Use flat, vibrant colors with minimal gradients. Exaggerate key features while simplifying details. Show expressive facial features and playful proportions with larger heads/eyes. The scene depicts ")
modeContent.set("Pixel", "Design a pixel art image within a limited resolution grid (64x64). Use a restricted color palette of 16 colors maximum. Create deliberate blocky shapes with clear pixel definition. Implement dithering techniques for gradients. The composition shows ")    
modeContent.set("Realistic", "Render a photorealistic image with complex lighting effects including highlights, reflections, and accurate shadows. Include subtle texture variations across all surfaces. Apply accurate color theory with nuanced transitions between hues. Maintain precise anatomical proportions and perspective. The scene features ")

export async function POST(req: NextRequest) {
    try {
        const { prompt, model, quality, size, style, mode } = await req.json()
        const cookieStore = await cookies();
        let sessionTokenCookie = cookieStore.get("sessionKey")
        let sessionToken = sessionTokenCookie?.value
        if(!sessionToken) {
            return NextResponse.json({
                success: 0,
                msg: "No session token found"
            })
        }
        const decodedToken = await admin.auth().verifySessionCookie(sessionToken)
        if(!decodedToken) {
            return NextResponse.json({
                success: 0,
                msg: "Unauthorized"
            },
            {
                status: 401
            })
        }
        const userAccount = await db.account.findUnique({
            where: {
                uid: decodedToken.uid
            }
        })
        if(userAccount && userAccount.credits <= 0) {
            return NextResponse.json({
                success: 0,
                msg: "Insufficient funds"
            },
            {
                status: 409
            })
        }
        console.log({
            prompt: modeContent.get(mode) + prompt,
            model: model,
            quality: quality,
            size: size,
            style: style
        })
        const openaiRequest: ImageGenerateParams = {
            prompt: modeContent.get(mode) + prompt,
            model: model,
            n: 1,
            quality: quality,
            size: size,
            style: style,
        }
        try {
            await db.account.update({
                where: {
                    uid: decodedToken.uid
                },
                data: {
                    credits: { decrement: 1 }
                }
            })
            const image = await openai.images.generate(openaiRequest)
            if(image) {
                console.log(image)
                return NextResponse.json({
                    success: 1,
                    Images: image
                })
            } else {
                await db.account.update({
                    where: {
                        uid: decodedToken.uid
                    },
                    data: {
                        credits: { increment: 1 }
                    }
                })
                return NextResponse.json({
                    success: 0,
                    msg: "Error with image generation"
                })
            }
        } catch(error) {
            console.log(error)
            return NextResponse.json({
                success: 0,
                msg: "Failed to generate image"
            })
        }
    } catch(error) {
        console.log(error)
        return NextResponse.json({
            success: 0,
            msg: "Something went wrong with user handling"
        })
    }
}