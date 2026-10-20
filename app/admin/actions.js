"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { buatClientSesi } from "@/lib/supabase/server";

export async function login(prevStateOrFormData, maybeFormData) {
  const formData =
    maybeFormData instanceof FormData ? maybeFormData : prevStateOrFormData;

  const email = formData?.get ? formData.get("email") : null;
  const password = formData?.get ? formData.get("password") : null;

  if (!email || !password) {
    return { error: "Email dan password wajib diisi." };
  }

  let supabase;
  try {
    supabase = await buatClientSesi();
  } catch (err) {
    return { error: err.message || "Konfigurasi Supabase tidak valid." };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: String(email).trim(),
    password: String(password),
  });

  if (error) {
    if (error.message === "Invalid login credentials") {
      return { error: "Email atau password salah." };
    }
    return { error: error.message || "Gagal masuk." };
  }

  redirect("/admin");
}

export async function logout() {
  const supabase = await buatClientSesi();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function gantiPassword(prevStateOrFormData, maybeFormData) {
  const formData =
    maybeFormData instanceof FormData ? maybeFormData : prevStateOrFormData;

  const passwordBaru = formData?.get ? formData.get("password_baru") : null;
  const konfirmasiPassword = formData?.get
    ? formData.get("konfirmasi_password")
    : null;

  if (!passwordBaru || String(passwordBaru).length < 8) {
    return { error: "Password baru minimal 8 karakter." };
  }

  if (passwordBaru !== konfirmasiPassword) {
    return { error: "Konfirmasi password tidak sama." };
  }

  let supabase;
  try {
    supabase = await buatClientSesi();
  } catch (err) {
    return { error: err.message || "Konfigurasi Supabase tidak valid." };
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Anda harus login terlebih dahulu." };
  }

  const { error } = await supabase.auth.updateUser({
    password: String(passwordBaru),
  });

  if (error) {
    return { error: error.message || "Gagal memperbarui password." };
  }

  return { success: "Password berhasil diperbarui." };
}

export async function tambahProduk(formData) {
  const supabase = await buatClientSesi();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/admin/login");
  }

  const nama = String(formData.get("nama") || "").trim();
  const hargaInput = formData.get("harga");
  const harga = Number(hargaInput);

  if (!nama) {
    redirect("/admin/produk/baru?error=Nama%20produk%20wajib%20diisi.");
  }

  if (hargaInput === null || String(hargaInput).trim() === "" || !Number.isInteger(harga) || harga < 0) {
    redirect("/admin/produk/baru?error=Harga%20harus%20berupa%20angka%20bulat%20dan%20tidak%20negatif.");
  }

  const { error } = await supabase.from("produk").insert({
    nama,
    harga,
    kategori: String(formData.get("kategori") || "").trim(),
    foto_url: String(formData.get("foto_url") || "").trim(),
    deskripsi: String(formData.get("deskripsi") || "").trim(),
  });

  if (error) {
    redirect("/admin/produk/baru?error=Produk%20gagal%20disimpan.%20Silakan%20coba%20lagi.");
  }

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function ubahProduk(id, formData) {
  const supabase = await buatClientSesi();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/admin/login");
  }

  const idProduk = String(id);
  if (!/^\d+$/.test(idProduk)) {
    redirect("/admin");
  }

  const nama = String(formData.get("nama") || "").trim();
  const hargaInput = formData.get("harga");
  const harga = Number(hargaInput);
  const halamanUbah = `/admin/produk/${idProduk}/ubah`;

  if (!nama) {
    redirect(`${halamanUbah}?error=Nama%20produk%20wajib%20diisi.`);
  }

  if (hargaInput === null || String(hargaInput).trim() === "" || !Number.isInteger(harga) || harga < 0) {
    redirect(`${halamanUbah}?error=Harga%20harus%20berupa%20angka%20bulat%20dan%20tidak%20negatif.`);
  }

  const { data, error } = await supabase
    .from("produk")
    .update({
      nama,
      harga,
      kategori: String(formData.get("kategori") || "").trim(),
      foto_url: String(formData.get("foto_url") || "").trim(),
      deskripsi: String(formData.get("deskripsi") || "").trim(),
    })
    .eq("id", idProduk)
    .select("id")
    .maybeSingle();

  if (error || !data) {
    redirect(`${halamanUbah}?error=Perubahan%20gagal%20disimpan.%20Silakan%20coba%20lagi.`);
  }

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath(`/produk/${idProduk}`);
  redirect("/admin");
}
