import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-black text-white p-4 flex justify-between">
      <Link href="/" className="text-2xl font-bold">
        NR
      </Link>
      <nav className="space-x-4">
        <Link href="/category/politics">Politics</Link>
        <Link href="/category/business">Business</Link>
        <Link href="/category/world">World</Link>
      </nav>
    </header>
  );
}
