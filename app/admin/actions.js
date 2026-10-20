"use server";

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

