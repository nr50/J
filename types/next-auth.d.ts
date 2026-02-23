// next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Session में custom user fields add करो
   */
  interface Session {
    user: {
      id: string;  // ← ये add किया (string क्योंकि prisma id string में convert किया)
      // अगर role या अन्य fields हैं तो add करो, जैसे:
      // role?: string;
    } & DefaultSession["user"];  // default name, email, image को merge करो
  }

  /**
   * JWT token में custom fields add करो (callbacks.jwt से यूज होगा)
   */
  interface JWT {
    id: string;
    // role?: string;
  }

  /**
   * authorize से return user में custom fields
   */
  interface User {
    id: string;
    // role?: string;
  }
}
