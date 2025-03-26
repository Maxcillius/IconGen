import { NextResponse, type NextRequest } from "next/server"

export async function middleware(res: NextRequest){
    const token = res.cookies.get("sessionKey")
    if(!token) {
        return NextResponse.redirect(new URL("/", res.url))
    } else {
        return NextResponse.next()
    }
}

export const config = {
    matcher: ["/api/user", "/api/icon"]
};
