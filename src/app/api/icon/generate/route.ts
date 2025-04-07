import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"
import { ImageGenerateParams } from "openai/resources/images.mjs";
import db from "@/db/db";
import axios from "axios";
import s3 from "@/lib/s3"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";

const openai = new OpenAI();

const MODES = {
    STICKER: 'Sticker',
    PIXEL: 'Pixel',
    VECTOR: 'Vector',
    CLAY: 'Clay',
    DOODLE: 'Doodle',
    FLAT: 'Flat'
} as const
type PromptMode = typeof MODES[keyof typeof MODES];
const promptTemplates: Record<PromptMode, (prompt: string) => string> = {
    [MODES.STICKER]: (prompt) => 
        `A high-quality **vector sticker icon of ${prompt}**, without unnecessary extra details. designed with a bold outline and a clean white border. The sticker should have a flat, minimalistic appearance with no shadows, gradients, or extra color outside the white border. The background must be fully white. Ensure the design is crisp and well-defined for use as a sticker. DO NOT add any background or additional elements—keep it as an isolated icon. just use it AS-IS.`,
    [MODES.PIXEL]: (prompt) => 
        `Design a **pixel art icon of ${prompt}**, clean pixel rendering. Keep the design **simple and iconic**, without unnecessary extra details and fully white background. Use **proper lighting and contrast** to enhance clarity while maintaining a **true pixel art aesthetic**. Ensure the subject is instantly recognizable and visually appealing. DO NOT add any background or additional elements—keep it as an isolated icon. just use it AS-IS. **No grid**`,
    [MODES.VECTOR]: (prompt) =>
        `A clean and precise **vector icon of ${prompt}**, without unnecessary extra details. designed with sharp lines and a flat, minimalistic style. It must be made with polygons. The icon should use a limited color palette with no gradients, shadows, or unnecessary details. Ensure a bold, well-defined outline for clarity and scalability. The background should be fully white. DO NOT add any background or additional elements—keep it as an isolated icon. just use it AS-IS.`,
    [MODES.CLAY]: (prompt) =>
        `A **${prompt} icon in claymorphic 3D style**, soft rounded edges, pastel color palette, realistic soft shadows, subtle lighting, minimal background, cute and slightly playful — rendered like soft clay or plasticine, modern and clean aesthetic. just use it AS-IS.`,
    [MODES.DOODLE]: (prompt) => 
        `A **${prompt} icon in doodle/sketch style**, hand-drawn with imperfect lines, rough pencil or ink strokes, playful and casual look, black and white or simple color fill, minimal detail, white background like a sketchbook page, fun and expressive — looks like it was drawn by hand in a notebook. just use it AS-IS.`,
    [MODES.FLAT]: (prompt) => 
        `A **${prompt} icon in flat minimalist style**, simple geometric shapes, clean lines, no shading or depth, solid colors with a limited palette, modern and balanced composition, no background or a soft neutral one, highly readable and optimized for UI and digital use. just use it AS-IS.`,
}

const formatPrompt = (mode: string, prompt: string): string => {
    return (Object.values(MODES) as string[]).includes(mode)
        ? promptTemplates[mode as PromptMode](prompt)
        : prompt;
}

export async function POST(req: NextRequest) {
    try {
        const { prompt, model, quality, size, style, mode, count } = await req.json()
        const session = await getServerSession(authOptions)
        if(!session) {
            return NextResponse.json({
                success: 0,
                msg: "Not Authorized"
            },
            {
                status: 401
            })
        }
        const userAccount = await db.account.findFirst({
            where: {
                userId: session?.user.id
            }
        })
        if(!userAccount) {
            return NextResponse.json({
                success: 0,
                msg: "No account found"
            })
        }
        const cost = count * ( model === "dall-e-2" ? 1 : 2)
        if(userAccount && userAccount.credits < cost) {
            return NextResponse.json({
                success: 0,
                msg: "Insufficient funds"
            },
            {
                status: 409
            })
        }
        // if(userAccount) {
        //     if(userAccount.subscription < 1 && (model === "dall-e-3" || quality === "hd" || count > 1 || mode !== "" || size !== "512x512")) {
        //         return NextResponse.json({
        //             success: 1,
        //             msg: "Upgrade your plan"
        //         })
        //     }
        // }
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
            n: count,
            quality: quality,
            size: size,
            style: style,
        }
        try {
            const image = await openai.images.generate(openaiRequest)
            if(image) {
                console.log(image)
                const account = await db.account.findFirst({
                    where: {
                        userId: session?.user.id
                    }
                })
                await db.account.update({
                    where: {
                        id: account?.id
                    },
                    data: {
                        credits: { decrement: cost }
                    }
                })
                for(const i in image.data) {
                    const imageUrl = image.data[i].url as string
                    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' })
                    const buffer = Buffer.from(response.data, 'binary')
                    const fileName = `userIcons/${session.user.id}/icon-${Date.now()}-${i}.png`
                    const uploadParams = {
                        Bucket: process.env.BUCKET_NAME,
                        Key: fileName,
                        Body: buffer,
                        ContentType: 'image/png'
                    }
                    await s3.send(new PutObjectCommand(uploadParams))
                    await db.icons.create({
                        data: {
                            id: account!.id,
                            name: `${Date.now()}`,
                            avatarKey: fileName
                        }
                    })
                }
                return NextResponse.json({
                    success: 1,
                    msg: "Image generated successfully",
                    contents: image.data
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
        }
    )
    }
}