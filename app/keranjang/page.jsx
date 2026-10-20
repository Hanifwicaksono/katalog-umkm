import Keranjang from "@/components/Keranjang";

export const metadata = {
  title: "Keranjang",
};

export default function HalamanKeranjang() {
  return (
    <section className="flex flex-col gap-6 py-8 md:py-12">
      <div>
        <p className="text-sm font-semibold text-utama">Pesanan Anda</p>
        <h1 className="text-3xl font-extrabold tracking-tight">Keranjang</h1>
      </div>
      <Keranjang />
    </section>
  );
}
