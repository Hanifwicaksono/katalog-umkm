"use client";

import { useActionState } from "react";
import Input from "@/components/Input";
import Tombol from "@/components/Tombol";
import { buatDeskripsiProduk } from "@/app/admin/actions";

// Dipakai untuk tambah produk (US-08) dan ubah produk (US-09). Keduanya bonus di jalur offline.
// Nama field sama dengan kolom tabel "produk".
export default function FormProduk({ produk = {}, labelTombol, action }) {
  const [state, buatDeskripsiAction, isPending] = useActionState(buatDeskripsiProduk, null);

  return (
    <form action={action} className="flex max-w-xl flex-col gap-4">
      <Input label="Nama produk" name="nama" defaultValue={produk.nama} required />
      <Input
        label="Harga (Rp)"
        name="harga"
        type="number"
        min="0"
        defaultValue={produk.harga}
        required
      />
      <Input
        label="Harga diskon (Rp, opsional)"
        name="harga_diskon"
        type="number"
        min="0"
        defaultValue={produk.harga_diskon ?? ""}
      />
      <Input label="Kategori" name="kategori" defaultValue={produk.kategori} />
      <label className="flex flex-col gap-1.5 text-sm font-semibold">
        Label produk
        <select
          name="label"
          defaultValue={produk.label || ""}
          className="rounded-lg border border-garis bg-latar px-3 py-2.5 text-base text-teks focus:border-utama focus:outline-none"
        >
          <option value="">Tanpa label</option>
          <option value="Baru">Baru</option>
          <option value="Terlaris">Terlaris</option>
        </select>
      </label>
      <label className="flex items-center gap-2 text-sm font-semibold">
        <input
          type="checkbox"
          name="tersedia"
          defaultChecked={produk.tersedia !== false}
          className="h-4 w-4 accent-utama"
        />
        Produk tersedia
      </label>
      <Input
        label="Link foto"
        name="foto_url"
        placeholder="https://... atau /produk/nama-file.svg"
        defaultValue={produk.foto_url}
      />
      <Input
        label="Link foto tambahan (satu per baris)"
        name="foto_urls"
        textarea
        defaultValue={Array.isArray(produk.foto_urls) ? produk.foto_urls.join("\n") : ""}
      />
      {state?.error && (
        <p role="alert" className="rounded-xl border border-garis bg-permukaan p-3 text-sm text-bahaya">
          {state.error}
        </p>
      )}
      <Tombol
        type="submit"
        formAction={buatDeskripsiAction}
        formNoValidate
        varian="garis"
        className="self-start"
        disabled={isPending}
      >
        {isPending ? "Membuat deskripsi..." : "Buat deskripsi dengan AI"}
      </Tombol>
      <Input
        key={state?.deskripsi}
        label="Deskripsi"
        name="deskripsi"
        textarea
        defaultValue={state?.deskripsi ?? produk.deskripsi}
      />
      <div className="flex gap-3">
        <Tombol type="submit">{labelTombol}</Tombol>
        <Tombol href="/admin" varian="garis">
          Batal
        </Tombol>
      </div>
    </form>
  );
}
