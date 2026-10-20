import Link from "next/link";
import TombolTema from "@/components/TombolTema";
import { toko } from "@/lib/toko";

export default function Header() {
  return (
    <header className="border-b border-garis bg-latar">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="text-lg font-extrabold tracking-tight text-utama">
          {toko.nama}
        </Link>
        <nav
          aria-label="Navigasi utama"
          className="flex flex-wrap items-center justify-end gap-4 text-sm font-semibold"
        >
          <Link href="/tentang" className="hover:text-utama">
            Tentang
          </Link>
          <Link href="/favorit" className="hover:text-utama">
            Favorit
          </Link>
          <Link href="/keranjang" className="hover:text-utama">
            Keranjang
          </Link>
          <TombolTema />
        </nav>
      </div>
    </header>
  );
}
