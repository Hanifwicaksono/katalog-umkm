const KUNCI_FAVORIT = "katalog-umkm-favorit";

export function bacaFavorit() {
  if (typeof window === "undefined") return [];

  try {
    const data = JSON.parse(window.localStorage.getItem(KUNCI_FAVORIT));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function simpanFavorit(items) {
  window.localStorage.setItem(KUNCI_FAVORIT, JSON.stringify(items));
}

export function ubahFavorit(items, produk) {
  const tersimpan = items.some((item) => String(item.id) === String(produk.id));

  if (tersimpan) {
    return items.filter((item) => String(item.id) !== String(produk.id));
  }

  // shortcut: data favorit berupa snapshot, ambil ulang dari server jika perlu selalu mutakhir.
  return [
    ...items,
    {
      id: produk.id,
      nama: produk.nama,
      harga: produk.harga,
      harga_diskon: produk.harga_diskon,
      foto_url: produk.foto_url,
      kategori: produk.kategori,
      label: produk.label,
      tersedia: produk.tersedia,
    },
  ];
}
