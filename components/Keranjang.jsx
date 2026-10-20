"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Input from "@/components/Input";
import Tombol from "@/components/Tombol";
import { formatRupiah } from "@/lib/format";
import { bacaKeranjang, simpanKeranjang } from "@/lib/keranjang.mjs";
import { toko } from "@/lib/toko";

export default function Keranjang() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(bacaKeranjang());
  }, []);

  function ubahItems(hasil) {
    setItems(hasil);
    simpanKeranjang(hasil);
  }

  function ubahJumlah(id, jumlah) {
    ubahItems(
      items.map((item) =>
        String(item.id) === String(id) ? { ...item, jumlah: Math.max(1, jumlah || 1) } : item,
      ),
    );
  }

  const total = items.reduce((nilai, item) => nilai + item.harga * item.jumlah, 0);
  const pesan = [
    "Halo, saya ingin memesan:",
    ...items.map(
      (item) => `- ${item.jumlah} x ${item.nama} (${formatRupiah(item.harga * item.jumlah)})`,
    ),
    `Total: ${formatRupiah(total)}`,
  ].join("\n");
  const nomor = toko.nomorWhatsApp?.replace(/[^0-9]/g, "") || "";

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-garis bg-latar p-6 text-center">
        <p className="mb-4 text-teks-lembut">Keranjang masih kosong.</p>
        <Tombol href="/">Lihat katalog</Tombol>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="grid gap-4 rounded-2xl border border-garis bg-latar p-4 sm:grid-cols-[5rem_1fr_auto] sm:items-center"
          >
            <img
              src={item.foto_url}
              alt=""
              className="aspect-square w-20 rounded-lg bg-permukaan object-cover"
            />
            <div>
              <Link href={`/produk/${item.id}`} className="font-bold hover:text-utama">
                {item.nama}
              </Link>
              <p className="mt-1 text-sm text-teks-lembut">{formatRupiah(item.harga)}</p>
            </div>
            <div className="flex items-end gap-3">
              <div className="w-24">
                <Input
                  label="Jumlah"
                  name={`jumlah-${item.id}`}
                  type="number"
                  min="1"
                  inputMode="numeric"
                  value={item.jumlah}
                  onChange={(event) => ubahJumlah(item.id, Number(event.target.value))}
                />
              </div>
              <button
                type="button"
                className="mb-2.5 text-sm font-semibold text-bahaya underline underline-offset-4"
                onClick={() => ubahItems(items.filter((produk) => produk.id !== item.id))}
              >
                Hapus
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex flex-col items-start gap-4 rounded-2xl bg-permukaan p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-lg font-bold">Total: {formatRupiah(total)}</p>
        <a
          href={`https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-lg bg-utama px-5 py-3 font-semibold text-white hover:bg-utama-gelap"
        >
          Pesan semua via WhatsApp
        </a>
      </div>
    </div>
  );
}
