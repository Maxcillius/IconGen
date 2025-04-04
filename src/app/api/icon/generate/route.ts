import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import admin from "@/utils/firebaseAdmin";
import OpenAI from "openai"
import { ImageGenerateParams } from "openai/resources/images.mjs";
import db from "@/db/db";
import axios from "axios";
import s3 from "@/utils/s3"
import { PutObjectCommand } from "@aws-sdk/client-s3"

const openai = new OpenAI();

const MODES = {
    STICKER: 'Sticker',
    PIXEL: 'Pixel',
    VECTOR: 'Vector'
} as const
type PromptMode = typeof MODES[keyof typeof MODES];
const promptTemplates: Record<PromptMode, (prompt: string) => string> = {
    [MODES.STICKER]: (prompt) => 
        `A high-quality **vector sticker icon of ${prompt}**, without unnecessary extra details. designed with a bold outline and a clean white border. The sticker should have a flat, minimalistic appearance with no shadows, gradients, or extra color outside the white border. The background must be fully white. Ensure the design is crisp and well-defined for use as a sticker. DO NOT add any background or additional elements—keep it as an isolated icon. just use it AS-IS.`,
    [MODES.PIXEL]: (prompt) => 
        `Design a **pixel art icon of ${prompt}**, clean pixel rendering. Keep the design **simple and iconic**, without unnecessary extra details and fully white background. Use **proper lighting and contrast** to enhance clarity while maintaining a **true pixel art aesthetic**. Ensure the subject is instantly recognizable and visually appealing. DO NOT add any background or additional elements—keep it as an isolated icon. just use it AS-IS. **No grid**`,
    [MODES.VECTOR]: (prompt) =>
        `A clean and precise **vector icon of ${prompt}**, without unnecessary extra details. designed with sharp lines and a flat, minimalistic style. It must be made with polygons. The icon should use a limited color palette with no gradients, shadows, or unnecessary details. Ensure a bold, well-defined outline for clarity and scalability. The background should be fully white. DO NOT add any background or additional elements—keep it as an isolated icon. just use it AS-IS.`,
}

const formatPrompt = (mode: string, prompt: string): string => {
    return (Object.values(MODES) as string[]).includes(mode)
        ? promptTemplates[mode as PromptMode](prompt)
        : prompt;
}

export async function POST(req: NextRequest) {
    try {
        const { prompt, model, quality, size, style, mode } = await req.json()
        const cookieStore = await cookies();
        const sessionTokenCookie = cookieStore.get("sessionKey")
        const sessionToken = sessionTokenCookie?.value
        if(!sessionToken) {
            return NextResponse.json({
                success: 0,
                msg: "No session token found"
            },
            {
                status: 401
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
        if(userAccount
             && ((model === "dall-e-2" && userAccount.credits < 1)
             || (model === "dall-e-3" && userAccount.credits < 2))) {
            return NextResponse.json({
                success: 0,
                msg: "Insufficient funds"
            },
            {
                status: 409
            })
        }
        console.log({
            prompt: formatPrompt(mode, prompt),
            model: model,
            quality: quality,
            size: size,
            style: style
        })
        const openaiRequest: ImageGenerateParams = {
            prompt: formatPrompt(mode, prompt),
            model: model,
            n: 1,
            quality: quality,
            size: size,
            style: style,
        }
        try {
            const image = await openai.images.generate(openaiRequest)
            if(image) {
                console.log(image)
                await db.account.update({
                    where: {
                        uid: decodedToken.uid
                    },
                    data: {
                        credits: { decrement: model === "dall-e-2" ? 1 : 2 }
                    }
                })
                const response = await axios({
                    method: "GET",
                    url: image.data[0].url,
                    responseType: "arraybuffer",
                })
                
                const uniqueKey = `${Date.now()}`
                const command = new PutObjectCommand({
                    Bucket: process.env.BUCKET_NAME as string,
                    Key: `userIcons/${decodedToken.uid}/${uniqueKey}`,
                    Body: response.data,
                    ContentType: "image/png"
                })
                await s3.send(command)
                return NextResponse.json({
                    success: 1,
                    url: image.data[0].url
                })
            } else {
                return NextResponse.json({
                    success: 0,
                    msg: "Error with image generation"
                },
                {
                    status: 500
                })
            }
        } catch(error) {
            console.log(error)
            return NextResponse.json({
                success: 0,
                msg: "Failed to generate image"
            },
            {
                status: 500
            })
        }
    } catch(error) {
        console.log(error)
        return NextResponse.json({
            success: 0,
            msg: "Something went wrong with user handling"
        },
        {
            status: 500
        })
    }
}