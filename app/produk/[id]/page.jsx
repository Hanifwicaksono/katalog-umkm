import Link from "next/link";
import { notFound } from "next/navigation";
import BagikanProduk from "@/components/BagikanProduk";
import GaleriProduk from "@/components/GaleriProduk";
import KartuProduk from "@/components/KartuProduk";
import TombolFavorit from "@/components/TombolFavorit";
import TombolWhatsApp from "@/components/TombolWhatsApp";
import { formatRupiah } from "@/lib/format";
import { buatClientServer } from "@/lib/supabase/server";

export default async function HalamanDetailProduk({ params }) {
  const { id } = await params;
  const supabase = buatClientServer();

  const { data: produk, error } = await supabase
    .from("produk")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !produk) {
    notFound();
  }

  const adaDiskon = Number.isInteger(produk.harga_diskon) && produk.harga_diskon < produk.harga;

  let produkTerkait = [];
  if (produk.kategori) {
    const { data } = await supabase
      .from("produk")
      .select("*")
      .eq("kategori", produk.kategori)
      .neq("id", id)
      .order("created_at", { ascending: false })
      .limit(3);
    produkTerkait = data || [];
  }

  return (
    <>
      <article className="grid gap-8 py-8 md:grid-cols-2 md:py-12">
        <GaleriProduk
          nama={produk.nama}
          fotoUtama={produk.foto_url}
          fotoTambahan={produk.foto_urls}
        />
        <div className="flex flex-col gap-4">
          <Link href="/" className="text-sm text-teks-lembut underline underline-offset-4 hover:text-utama">
            Kembali ke katalog
          </Link>
          <p className="text-sm text-teks-lembut">{produk.kategori}</p>
          {produk.label && (
            <span className="self-start rounded-md bg-utama px-2 py-1 text-sm font-bold text-white">
              {produk.label}
            </span>
          )}
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight">{produk.nama}</h1>
          <div className="flex flex-col items-start gap-1">
            {adaDiskon && (
              <span className="text-sm text-teks-lembut line-through">
                {formatRupiah(produk.harga)}
              </span>
            )}
            <p className="rounded-md bg-harga-latar px-3 py-1 text-xl font-bold text-harga">
              {formatRupiah(adaDiskon ? produk.harga_diskon : produk.harga)}
            </p>
          </div>
          <p className="max-w-prose leading-relaxed text-teks-lembut">{produk.deskripsi}</p>
          {produk.tersedia === false ? (
            <p className="self-start rounded-md bg-permukaan px-3 py-1 font-bold text-bahaya">
              Habis
            </p>
          ) : (
            <TombolWhatsApp produk={produk} />
          )}
          <TombolFavorit produk={produk} />
          <BagikanProduk nama={produk.nama} />
        </div>
      </article>

      {produkTerkait.length > 0 && (
        <section aria-labelledby="judul-produk-terkait" className="flex flex-col gap-5 pb-8">
          <h2 id="judul-produk-terkait" className="text-xl font-bold">
            Produk terkait
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {produkTerkait.map((item) => (
              <KartuProduk key={item.id} produk={item} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
