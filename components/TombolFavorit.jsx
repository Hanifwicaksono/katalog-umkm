"use client";

import { useEffect, useState } from "react";
import Tombol from "@/components/Tombol";
import { bacaFavorit, simpanFavorit, ubahFavorit } from "@/lib/favorit.mjs";

export default function TombolFavorit({ produk }) {
  const [favorit, setFavorit] = useState(false);

  useEffect(() => {
    setFavorit(bacaFavorit().some((item) => String(item.id) === String(produk.id)));
  }, [produk.id]);

  function toggleFavorit() {
    const hasil = ubahFavorit(bacaFavorit(), produk);
    simpanFavorit(hasil);
    setFavorit(hasil.some((item) => String(item.id) === String(produk.id)));
  }

  return (
    <Tombol type="button" varian="garis" aria-pressed={favorit} onClick={toggleFavorit}>
      {favorit ? "Hapus dari favorit" : "Tambah ke favorit"}
    </Tombol>
  );
}
