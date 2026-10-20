"use client";

import { useState } from "react";

export default function GaleriProduk({ nama, fotoUtama, fotoTambahan = [] }) {
  const daftarFoto = [...new Set([fotoUtama, ...fotoTambahan].filter(Boolean))];
  const [fotoAktif, setFotoAktif] = useState(daftarFoto[0] || "");

  if (!fotoAktif) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-2xl border border-garis bg-permukaan text-teks-lembut">
        Foto belum tersedia
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <img
        src={fotoAktif}
        alt={nama}
        className="aspect-square w-full rounded-2xl border border-garis bg-permukaan object-cover"
      />
      {daftarFoto.length > 1 && (
        <div className="flex gap-2 overflow-x-auto" aria-label={`Galeri foto ${nama}`}>
          {daftarFoto.map((foto, index) => (
            <button
              key={foto}
              type="button"
              onClick={() => setFotoAktif(foto)}
              aria-label={`Tampilkan foto ${index + 1}`}
              className={`shrink-0 rounded-lg border p-0.5 ${fotoAktif === foto ? "border-utama" : "border-garis"}`}
            >
              <img src={foto} alt="" className="h-16 w-16 rounded-md object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
