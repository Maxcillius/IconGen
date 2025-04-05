import GoogleProvider from 'next-auth/providers/google'
import { NextAuthOptions, Session } from 'next-auth'
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import db from '@/db/db';

interface session extends Session {
  user: {
    name: string,
    email: string,
    image: string,
    id: string
  }
}

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_CLIENT_ID as string,
            clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET as string,
            authorization: {
              params: {
                    redirect_uri: process.env.NEXTAUTH_URL + "/api/auth/callback/google"
              }
            }
        })
    ],
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET || 'secr3t',
    callbacks: {
      async signIn({ user, account, profile }) {
        return true
      },
      async session({ session, user }) {
        const newSession: session = session as session;
        if(newSession.user) {
          newSession.user.id = user.id
        }
        return newSession;
      },
    },
    // pages: {
    //   signOut: '/api/auth/signout',
    // },
} satisfies NextAuthOptions;

export default authOptions