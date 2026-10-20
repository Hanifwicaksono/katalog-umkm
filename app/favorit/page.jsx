import DaftarFavorit from "@/components/DaftarFavorit";

export const metadata = {
  title: "Produk Favorit",
};

export default function HalamanFavorit() {
  return (
    <section className="flex flex-col gap-6 py-8 md:py-12">
      <div>
        <p className="text-sm font-semibold text-utama">Pilihan Anda</p>
        <h1 className="text-3xl font-extrabold tracking-tight">Produk favorit</h1>
      </div>
      <DaftarFavorit />
    </section>
  );
}
