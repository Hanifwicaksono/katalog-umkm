# Jurnal Prompt

Catat prompt penting selama membangun aplikasi: apa yang kamu minta, hasilnya, dan perbaikan yang dilakukan. Beri tanda **[SENDIRI]** untuk prompt yang kamu tulis sendiri (bukan dari lembar kerja).

## US-01 Katalog dari database

**Prompt: Baca AGENTS.md dan docs/user-stories.md bagian US-01.

Ubah app/page.jsx supaya daftar produk diambil dari tabel "produk" di Supabase, di sisi server, memakai SUPABASE_URL dan SUPABASE_SECRET_KEY dari environment variable. Buat koneksi Supabase untuk server di folder lib/supabase.

Tampilkan produk dengan komponen KartuProduk yang sudah ada, tanpa mengubah tampilannya. Kalau gagal mengambil data, tampilkan pesan error yang jelas di halaman. Kalau tabel kosong, tampilkan tulisan "Belum ada produk". Hapus CatatanBelumAktif dari halaman ini.**

**Hasil:File yang Dibuat dan Diubah
lib/supabase/server.js (Baru): Membuat fungsi buatClientServer untuk menginisialisasi client Supabase di sisi server menggunakan SUPABASE_URL dan SUPABASE_SECRET_KEY dari environment variable.
lib/supabase/index.js (Baru): Re-export helper koneksi server agar mudah diimpor dari @/lib/supabase.
app/page.jsx (Diubah):
Mengubah komponen menjadi Server Component async.
Mengambil seluruh produk dari tabel produk di Supabase.
Menghapus komponen dan import CatatanBelumAktif.
Menampilkan daftar produk menggunakan KartuProduk.
Menampilkan tulisan "Belum ada produk" jika data kosong.
Menampilkan pesan error jika query gagal atau terjadi kendala koneksi.**

**Perbaikan:**

## US-02 Detail produk

**Prompt:Baca docs/user-stories.md bagian US-02.

Ubah app/produk/[id]/page.jsx supaya mengambil satu produk dari tabel "produk" di Supabase berdasarkan id di URL, di sisi server, memakai koneksi Supabase yang sudah dibuat di lib/supabase. Kalau produk tidak ditemukan, panggil notFound(). Jangan ubah tampilannya. Hapus CatatanBelumAktif dari halaman ini, tapi biarkan tombol WhatsApp.**

**Hasil: Pekerjaan untuk US-02: Detail produk telah selesai.

File yang Diubah
app/produk/[id]/page.jsx:
Mengambil data produk spesifik dari tabel produk di Supabase berdasarkan id URL di sisi server menggunakan buatClientServer.
Memanggil notFound() jika produk tidak ditemukan di database atau jika terjadi error pada query.
Menghapus komponen dan impor CatatanBelumAktif serta cariProdukContoh.
Mempertahankan tampilan detail produk beserta tombol WhatsApp (TombolWhatsApp).**

**Perbaikan:**

## US-03 Pesan via WhatsApp

**Prompt:**

**Hasil:**

**Perbaikan:**

## US-04 Login admin

**Prompt:**

**Hasil:**

**Perbaikan:**

## US-05 Ganti password

**Prompt:**

**Hasil:**

**Perbaikan:**

## US-06 Proteksi halaman admin

**Prompt:**

**Hasil:**

**Perbaikan:**

## Debugging dan fitur bonus

Tambahkan bagian baru untuk setiap error yang kamu perbaiki atau fitur bonus yang kamu kerjakan.
