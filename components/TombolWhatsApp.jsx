"use client";

import { useState } from "react";
import Input from "@/components/Input";
import { toko } from "@/lib/toko";
import { formatRupiah } from "@/lib/format";

export default function TombolWhatsApp({ produk }) {
  const [jumlah, setJumlah] = useState(1);

  if (!produk || produk.tersedia === false) return null;

  const nomor = toko.nomorWhatsApp?.replace(/[^0-9]/g, "") || "";
  const pesan = `Halo, saya ingin memesan ${jumlah} x ${produk.nama} seharga ${formatRupiah(produk.harga)} per produk.`;
  const urlWhatsApp = `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`;

  return (
    <div className="flex flex-col items-start gap-3">
      <div className="w-24">
        <Input
          label="Jumlah"
          name="jumlah"
          type="number"
          min="1"
          inputMode="numeric"
          value={jumlah}
          onChange={(event) => setJumlah(Math.max(1, Number(event.target.value) || 1))}
        />
      </div>
      <a
        href={urlWhatsApp}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-full items-center justify-center rounded-lg bg-utama px-5 py-3 font-semibold text-white hover:bg-utama-gelap sm:w-auto"
      >
        Pesan via WhatsApp
      </a>
    </div>
  );
}
