import { ReactNode } from 'react';              // ← ये import add करो (children के type के लिए)
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

// children को type define कर दिया
export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  // return में proper JSX – सिर्फ children render कर रहा है (protected wrapper)
  // अगर admin dashboard में sidebar/header जोड़ना हो तो यहीं add कर सकते हो
  return (
    <>
      {children}
    </>
  );
}
