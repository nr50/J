// app/page.tsx
import { ReactNode } from 'react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">Welcome to My App!</h1>
      <p className="mt-4 text-lg">This is the homepage. Everything is working now.</p>
      {/* अगर Header/Footer import कर सकते हो */}
      {/* <Header /> */}
      <main className="mt-8">
        {/* अपना content */}
      </main>
    </div>
  );
}
