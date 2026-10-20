import assert from "node:assert/strict";
import test from "node:test";
import { ubahFavorit } from "./favorit.mjs";

test("menambah lalu menghapus produk favorit", () => {
  const produk = { id: 1, nama: "Tas", harga: 100000 };
  const ditambah = ubahFavorit([], produk);
  const dihapus = ubahFavorit(ditambah, produk);

  assert.equal(ditambah.length, 1);
  assert.deepEqual(dihapus, []);
});
