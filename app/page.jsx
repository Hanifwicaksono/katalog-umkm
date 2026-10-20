import { redirect } from "next/navigation";
import KartuProduk from "@/components/KartuProduk";
import Input from "@/components/Input";
import Tombol from "@/components/Tombol";
import { toko } from "@/lib/toko";
import { buatClientServer } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
const PRODUK_PER_HALAMAN = 12;

export default async function HalamanKatalog({ searchParams }) {
  const { cari, urut, halaman } = await searchParams;
  const kataKunci = typeof cari === "string" ? cari.trim().slice(0, 100) : "";
  const urutan = ["termurah", "termahal", "terbaru"].includes(urut) ? urut : "terbaru";
  const nomorHalaman = Number.parseInt(halaman, 10);
  const halamanAktif = Number.isSafeInteger(nomorHalaman) && nomorHalaman > 0 ? nomorHalaman : 1;
  let daftarProduk = [];
  let jumlahProduk = 0;
  let pesanError = null;

  try {
    const supabase = buatClientServer();
    let query = supabase
      .from("produk")
      .select("*", { count: "exact" });

    if (kataKunci) {
      query = query.ilike("nama", `%${kataKunci}%`);
    }

    if (urutan === "termurah") {
      query = query.order("harga", { ascending: true }).order("id", { ascending: true });
    } else if (urutan === "termahal") {
      query = query.order("harga", { ascending: false }).order("id", { ascending: true });
    } else {
      query = query.order("created_at", { ascending: false }).order("id", { ascending: false });
    }

    const mulai = (halamanAktif - 1) * PRODUK_PER_HALAMAN;
    const { data, error, count } = await query.range(
      mulai,
      mulai + PRODUK_PER_HALAMAN - 1
    );

    if (error) {
      pesanError = error.message;
    } else {
      daftarProduk = data || [];
      jumlahProduk = count || 0;
    }
  } catch (err) {
    pesanError = err.message || "Gagal mengambil data produk dari database.";
  }

  const jumlahHalaman = Math.max(1, Math.ceil(jumlahProduk / PRODUK_PER_HALAMAN));
  const buatUrlHalaman = (tujuan) => {
    const query = new URLSearchParams();
    if (kataKunci) query.set("cari", kataKunci);
    query.set("urut", urutan);
    if (tujuan > 1) query.set("halaman", String(tujuan));
    return `/?${query.toString()}`;
  };

  if (!pesanError && halamanAktif > jumlahHalaman) {
    redirect(buatUrlHalaman(jumlahHalaman));
  }

  return (
    <>
      <section className="py-10 sm:py-14">
        <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          {toko.nama}
        </h1>
        <p className="mt-3 max-w-xl text-lg text-teks-lembut">{toko.tagline}</p>
        <p className="mt-4 text-sm text-teks-lembut">{toko.jamBuka}</p>
      </section>

      <section aria-labelledby="judul-produk" className="flex flex-col gap-5">
        <h2 id="judul-produk" className="text-xl font-bold">
          Produk kami
        </h2>

        <form method="get" className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <Input
              label="Cari produk"
              name="cari"
              defaultValue={kataKunci}
              placeholder="Contoh: kopi"
            />
          </div>
          <label className="flex flex-col gap-1.5 text-sm font-semibold">
            Urutkan
            <select
              name="urut"
              defaultValue={urutan}
              className="rounded-lg border border-garis bg-latar px-3 py-2.5 text-base text-teks focus:border-utama focus:outline-none"
            >
              <option value="termurah">Termurah</option>
              <option value="termahal">Termahal</option>
              <option value="terbaru">Terbaru</option>
            </select>
          </label>
          <Tombol type="submit">Terapkan</Tombol>
          {kataKunci && (
            <Tombol href={`/?urut=${urutan}`} varian="garis">
              Hapus pencarian
            </Tombol>
          )}
        </form>

        {pesanError ? (
          <div className="rounded-xl border border-garis bg-permukaan p-4 text-bahaya">
            <p className="font-semibold">Gagal memuat produk</p>
            <p className="mt-1 text-sm">{pesanError}</p>
          </div>
        ) : daftarProduk.length === 0 ? (
          <p className="py-8 text-center text-teks-lembut">
            {kataKunci ? "Produk tidak ditemukan" : "Belum ada produk"}
          </p>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {daftarProduk.map((produk) => (
                <KartuProduk key={produk.id} produk={produk} />
              ))}
            </div>
            {jumlahHalaman > 1 && (
              <nav aria-label="Navigasi halaman produk" className="flex items-center justify-between gap-3">
                {halamanAktif > 1 ? (
                  <Tombol href={buatUrlHalaman(halamanAktif - 1)} varian="garis">
                    Sebelumnya
                  </Tombol>
                ) : (
                  <span />
                )}
                <p className="text-sm text-teks-lembut">
                  Halaman {halamanAktif} dari {jumlahHalaman}
                </p>
                {halamanAktif < jumlahHalaman ? (
                  <Tombol href={buatUrlHalaman(halamanAktif + 1)} varian="garis">
                    Berikutnya
                  </Tombol>
                ) : (
                  <span />
                )}
              </nav>
            )}
          </>
        )}
      </section>
    </>
  );
}
