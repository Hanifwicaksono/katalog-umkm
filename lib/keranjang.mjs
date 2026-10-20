const KUNCI_KERANJANG = "katalog-umkm-keranjang";

export function bacaKeranjang() {
  if (typeof window === "undefined") return [];

  try {
    const data = JSON.parse(window.localStorage.getItem(KUNCI_KERANJANG));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function simpanKeranjang(items) {
  window.localStorage.setItem(KUNCI_KERANJANG, JSON.stringify(items));
}

export function gabungKeranjang(items, produk, jumlah) {
  const indeks = items.findIndex((item) => String(item.id) === String(produk.id));
  const harga =
    Number.isInteger(produk.harga_diskon) && produk.harga_diskon < produk.harga
      ? produk.harga_diskon
      : produk.harga;

  // shortcut: harga disimpan sebagai snapshot, ambil ulang dari server jika checkout menjadi transaksional.
  const itemBaru = {
    id: produk.id,
    nama: produk.nama,
    harga,
    foto_url: produk.foto_url,
    kategori: produk.kategori,
    jumlah,
  };

  return indeks === -1
    ? [...items, itemBaru]
    : items.map((item, posisi) =>
        posisi === indeks ? { ...item, jumlah: item.jumlah + jumlah } : item,
      );
}

export function tambahKeKeranjang(produk, jumlah) {
  const hasil = gabungKeranjang(bacaKeranjang(), produk, jumlah);

  simpanKeranjang(hasil);
  return hasil;
}
