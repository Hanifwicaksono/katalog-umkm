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
      <Input label="Kategori" name="kategori" defaultValue={produk.kategori} />
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
