import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

// Auth options define करो
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",  // Login form का नाम

      // credentials fields define (form में दिखेंगे)
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@email.com" },
        password: { label: "Password", type: "password" },
      },

      // authorize function – login logic यहाँ
      async authorize(credentials: { email?: string; password?: string } | undefined) {
        // Type safe: credentials undefined या missing fields check
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email और Password दोनों जरूरी हैं");
          // या return null; अगर error throw नहीं करना चाहो
        }

        try {
          // User ढूंढो prisma से
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (!user) {
            throw new Error("इस email से कोई user नहीं मिला");
          }

          // Password compare (hashed password से)
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

          if (!isPasswordValid) {
            throw new Error("गलत password");
          }

          // Success: user object return करो (NextAuth session में यूज होगा)
          // id string होना चाहिए
          return {
            id: user.id.toString(),  // prisma में id number हो सकता है → string में convert
            email: user.email,
            name: user.name || null,  // अगर name field है तो
            // role: user.role अगर role है तो add कर सकते हो
          };
        } catch (error) {
          console.error("Authorize error:", error);
          return null;  // error पर null return → login fail
        }
      },
    }),
  ],

  // Session strategy (JWT default अच्छा है Credentials के लिए)
  session: {
    strategy: "jwt",  // या "database" अगर Prisma adapter यूज कर रहे हो
  },

  // Pages customize (optional)
  pages: {
    signIn: "/auth/signin",  // अपना custom signin page अगर है
    error: "/auth/error",
  },

  // Secret जरूरी (Vercel env में AUTH_SECRET set करो)
  secret: process.env.AUTH_SECRET,

  // Callbacks अगर जरूरी (optional – session में extra data add करने के लिए)
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // token.role = user.role; अगर role है
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        // session.user.role = token.role;
      }
      return session;
    },
  },
};

// Next.js App Router के लिए handler export
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
