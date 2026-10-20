"use client";

import { useState } from "react";
import Tombol from "@/components/Tombol";

export default function BagikanProduk({ nama }) {
  const [pesan, setPesan] = useState("");

  async function bagikan() {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({ title: nama, text: `Lihat ${nama}`, url });
        setPesan("Produk berhasil dibagikan.");
        return;
      }

      await navigator.clipboard.writeText(url);
      setPesan("Link tersalin.");
    } catch (error) {
      if (error?.name === "AbortError") return;
      window.prompt("Salin link produk:", url);
      setPesan("Link siap disalin.");
    }
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <Tombol type="button" varian="garis" onClick={bagikan}>
        Bagikan produk
      </Tombol>
      <p aria-live="polite" className="text-sm text-utama">
        {pesan}
      </p>
    </div>
  );
}
