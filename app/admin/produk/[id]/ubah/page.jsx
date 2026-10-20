import { notFound } from "next/navigation";
import NavAdmin from "@/components/NavAdmin";
import FormProduk from "@/components/FormProduk";
import { ubahProduk } from "@/app/admin/actions";
import { buatClientSesi } from "@/lib/supabase/server";

export default async function HalamanUbahProduk({ params, searchParams }) {
  const { id } = await params;
  const { error: pesanError } = await searchParams;
  const supabase = await buatClientSesi();
  const { data: produk, error } = await supabase
    .from("produk")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !produk) {
    notFound();
  }

  const simpanPerubahan = ubahProduk.bind(null, id);

  return (
    <div className="flex flex-col gap-6 py-8">
      <NavAdmin />
      <h1 className="text-2xl font-extrabold">Ubah produk</h1>
      {pesanError && (
        <p role="alert" className="rounded-xl border border-garis bg-permukaan p-3 text-sm text-bahaya">
          {pesanError}
        </p>
      )}
      <FormProduk produk={produk} action={simpanPerubahan} labelTombol="Simpan perubahan" />
    </div>
  );
}
