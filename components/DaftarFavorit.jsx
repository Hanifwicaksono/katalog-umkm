"use client";

import { useEffect, useState } from "react";
import KartuProduk from "@/components/KartuProduk";
import Tombol from "@/components/Tombol";
import { bacaFavorit } from "@/lib/favorit.mjs";

export default function DaftarFavorit() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(bacaFavorit());
  }, []);

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-garis bg-latar p-6 text-center">
        <p className="mb-4 text-teks-lembut">Belum ada produk favorit.</p>
        <Tombol href="/">Lihat katalog</Tombol>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {items.map((produk) => (
        <KartuProduk key={produk.id} produk={produk} />
      ))}
    </div>
  );
}
