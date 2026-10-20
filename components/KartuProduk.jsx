import Link from "next/link";
import { formatRupiah } from "@/lib/format";

export default function KartuProduk({ produk }) {
  const adaDiskon = Number.isInteger(produk.harga_diskon) && produk.harga_diskon < produk.harga;

  return (
    <Link
      href={`/produk/${produk.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-garis bg-latar"
    >
      <img
        src={produk.foto_url}
        alt={produk.nama}
        className="aspect-square w-full bg-permukaan object-cover"
      />
      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-teks-lembut">{produk.kategori}</p>
          {produk.label && (
            <span className="rounded-md bg-utama px-2 py-0.5 text-xs font-bold text-white">
              {produk.label}
            </span>
          )}
        </div>
        {produk.tersedia === false && (
          <p className="self-start rounded-md bg-permukaan px-2 py-0.5 text-xs font-bold text-bahaya">
            Habis
          </p>
        )}
        <h3 className="font-semibold leading-snug group-hover:text-utama">{produk.nama}</h3>
        <div className="mt-auto flex flex-col items-start gap-1">
          {adaDiskon && (
            <span className="text-xs text-teks-lembut line-through">
              {formatRupiah(produk.harga)}
            </span>
          )}
          <p className="rounded-md bg-harga-latar px-2 py-0.5 text-sm font-bold text-harga">
            {formatRupiah(adaDiskon ? produk.harga_diskon : produk.harga)}
          </p>
        </div>
      </div>
    </Link>
  );
}
