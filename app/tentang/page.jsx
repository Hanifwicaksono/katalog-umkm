import { toko } from "@/lib/toko";

export const metadata = {
  title: `Tentang ${toko.nama}`,
};

export default function HalamanTentang() {
  const nomor = toko.nomorWhatsApp?.replace(/[^0-9]/g, "") || "";

  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-8 py-8 md:py-12">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold text-utama">Tentang toko</p>
        <h1 className="text-3xl font-extrabold tracking-tight">{toko.nama}</h1>
        <p className="max-w-prose leading-relaxed text-teks-lembut">{toko.tagline}</p>
      </div>

      <dl className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-garis bg-latar p-5">
          <dt className="font-bold">Alamat</dt>
          <dd className="mt-2 text-teks-lembut">{toko.alamat}</dd>
        </div>
        <div className="rounded-2xl border border-garis bg-latar p-5">
          <dt className="font-bold">Jam buka</dt>
          <dd className="mt-2 text-teks-lembut">{toko.jamBuka}</dd>
        </div>
      </dl>

      <div className="rounded-2xl bg-permukaan p-5">
        <h2 className="text-lg font-bold">Hubungi kami</h2>
        <p className="mt-2 text-teks-lembut">Tanyakan produk atau pesanan langsung melalui WhatsApp.</p>
        <a
          href={`https://wa.me/${nomor}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex rounded-lg bg-utama px-5 py-3 font-semibold text-white hover:bg-utama-gelap"
        >
          Hubungi via WhatsApp
        </a>
      </div>
    </section>
  );
}
