import assert from "node:assert/strict";
import test from "node:test";
import { gabungKeranjang } from "./keranjang.mjs";

test("menggabungkan jumlah produk dan memakai harga diskon", () => {
  const produk = {
    id: 1,
    nama: "Tas",
    harga: 100000,
    harga_diskon: 80000,
    foto_url: "/tas.jpg",
    kategori: "Aksesori",
  };

  const awal = gabungKeranjang([], produk, 2);
  const hasil = gabungKeranjang(awal, produk, 1);

  assert.equal(hasil.length, 1);
  assert.equal(hasil[0].jumlah, 3);
  assert.equal(hasil[0].harga, 80000);
});
