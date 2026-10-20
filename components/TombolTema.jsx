"use client";

import { useEffect, useState } from "react";
import { temaBerikutnya } from "@/lib/tema.mjs";

const KUNCI_TEMA = "katalog-umkm-tema";

export default function TombolTema() {
  const [tema, setTema] = useState("terang");

  useEffect(() => {
    const tersimpan = window.localStorage.getItem(KUNCI_TEMA) === "gelap" ? "gelap" : "terang";
    document.documentElement.dataset.tema = tersimpan;
    setTema(tersimpan);
  }, []);

  function gantiTema() {
    const berikutnya = temaBerikutnya(tema);
    document.documentElement.dataset.tema = berikutnya;
    window.localStorage.setItem(KUNCI_TEMA, berikutnya);
    setTema(berikutnya);
  }

  return (
    <button
      type="button"
      className="rounded-lg border border-garis bg-latar px-3 py-2 text-sm font-semibold hover:border-utama hover:text-utama"
      aria-label={`Aktifkan mode ${tema === "gelap" ? "terang" : "gelap"}`}
      onClick={gantiTema}
    >
      {tema === "gelap" ? "Mode terang" : "Mode gelap"}
    </button>
  );
}
