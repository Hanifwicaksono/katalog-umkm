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

**Prompt: Baca docs/rancangan-teknis.md bagian "Pesan WhatsApp (US-03)".

Ubah components/TombolWhatsApp.jsx menjadi tautan yang membuka https://wa.me/ ke nomor di lib/toko.js, dengan pesan otomatis berisi nama dan harga produk dalam format rupiah. Pesan di-encode dengan encodeURIComponent dan dibuka di tab baru. Pertahankan tampilan tombolnya. Hapus CatatanBelumAktif yang menyebut US-03 di halaman detail produk.**

**Hasil: Pekerjaan untuk US-03: Pesan via WhatsApp telah selesai.

File yang Diubah
components/TombolWhatsApp.jsx:
Mengubah elemen <button> menjadi tautan <a> dengan tampilan tombol yang tetap sama.
Membuka URL WhatsApp https://wa.me/<nomor>?text=<pesan> ke nomor toko di lib/toko.js.
Pesan otomatis memuat nama dan harga produk dalam format rupiah menggunakan formatRupiah, yang di-encode dengan encodeURIComponent.
Tautan dibuka di tab baru dengan atribut target="_blank" dan rel="noopener noreferrer".
app/produk/[id]/page.jsx:
Memastikan komponen dan impor CatatanBelumAktif yang menyebut US-03 sudah dihapus dari halaman detail produk.**

**Perbaikan:**

## US-04 Login admin

**Prompt: Baca AGENTS.md bagian aturan keamanan dan docs/user-stories.md bagian US-04.

Buat login admin memakai Supabase Auth (email dan password) dengan @supabase/ssr dan cookie, memakai SUPABASE_URL dan SUPABASE_PUBLISHABLE_KEY. Login diproses dengan Server Action di app/admin/actions.js dan disambungkan ke form di app/admin/login/page.jsx. Login berhasil diarahkan ke /admin; login gagal menampilkan pesan error yang jelas di halaman login. Buat juga tombol "Keluar" di components/NavAdmin.jsx berfungsi: mengakhiri sesi lalu kembali ke /admin/login. Jangan ubah tampilan. Hapus CatatanBelumAktif dari halaman login.**

**Hasil: Pekerjaan untuk US-04: Login admin telah selesai.

File yang Dibuat dan Diubah
lib/supabase/server.js (Diubah): Menambahkan fungsi buatClientSesi menggunakan @supabase/ssr (createServerClient) bersama cookies() dari next/headers serta environment variable SUPABASE_URL dan SUPABASE_PUBLISHABLE_KEY.
app/admin/actions.js (Baru):
Server Action login: memproses otentikasi email dan password melalui supabase.auth.signInWithPassword. Jika berhasil, mengarahkan ke /admin. Jika gagal, mengembalikan pesan error yang informatif.
Server Action logout: mengakhiri sesi admin melalui supabase.auth.signOut dan mengarahkan kembali ke /admin/login.
app/admin/login/page.jsx (Diubah):
Menghubungkan form ke Server Action login menggunakan useActionState.
Menampilkan pesan error di halaman jika login gagal.
Menghapus komponen CatatanBelumAktif tanpa mengubah tampilan form.
components/NavAdmin.jsx (Diubah):
Menghubungkan tombol "Keluar" ke Server Action logout agar menghapus sesi cookie dan berpindah ke /admin/login tanpa mengubah posisi maupun tampilan tombol.**

**Perbaikan:**

## US-05 Ganti password

**Prompt: Baca docs/user-stories.md bagian US-05.

Buat Server Action ganti password di app/admin/actions.js untuk admin yang sedang login, memakai Supabase Auth. Validasi di server: password baru minimal 8 karakter dan harus sama dengan konfirmasi. Tampilkan pesan berhasil atau pesan error yang jelas di halaman. Sambungkan ke form di app/admin/password/page.jsx tanpa mengubah tampilannya. Hapus CatatanBelumAktif dari halaman ini.**

**Hasil: Pekerjaan untuk US-05: Ganti password telah selesai.

File yang Diubah
app/admin/actions.js:
Menambahkan Server Action gantiPassword untuk admin yang sedang login.
Melakukan validasi di sisi server: memastikan admin terotentikasi via supabase.auth.getUser(), panjang password baru minimal 8 karakter, dan konfirmasi password cocok.
Mengubah password menggunakan supabase.auth.updateUser({ password }).
Mengembalikan pesan sukses atau pesan error yang jelas.
app/admin/password/page.jsx:
Menghubungkan form ke Server Action gantiPassword menggunakan useActionState.
Menampilkan notifikasi error (state.error) atau notifikasi berhasil (state.success).
Menghapus komponen CatatanBelumAktif dan mempertahankan seluruh tampilan form yang sudah ada.**

**Perbaikan:**

## US-06 Proteksi halaman admin

**Prompt: Baca AGENTS.md aturan keamanan nomor 3 dan 4, dan docs/user-stories.md bagian US-06.

Buat file proxy.js di root proyek (Next.js 16). Semua rute /admin kecuali /admin/login wajib login dengan Supabase Auth; kalau belum login, alihkan ke /admin/login. Pastikan juga setiap Server Action yang mengubah data memeriksa login di server. Hapus CatatanBelumAktif dari halaman /admin.**

**Hasil: Pekerjaan untuk US-06: Proteksi halaman admin telah selesai.

File yang Dibuat dan Diubah
proxy.js (Baru):
Dibuat di root proyek sebagai pengganti middleware.js pada Next.js 16.
Menggunakan @supabase/ssr untuk memeriksa status sesi login pengguna (supabase.auth.getUser()).
Melindungi seluruh rute /admin (termasuk /admin/password, /admin/produk/baru, dll.) kecuali /admin/login.
Mengalihkan pengunjung yang belum terotentikasi langsung ke /admin/login.
app/admin/actions.js:
Memastikan Server Action yang mengubah data (seperti gantiPassword) memvalidasi sesi admin terlebih dahulu melalui server sebelum eksekusi.
app/admin/page.jsx (Diubah):
Menghapus komponen dan impor CatatanBelumAktif dari halaman /admin.**

**Perbaikan:**

## US-07 List produk

**Prompt: Baca docs/user-stories.md bagian US-07.

Ubah app/admin/page.jsx supaya daftar produk diambil dari tabel "produk" di Supabase memakai sesi admin, bukan dari lib/data-contoh.js. Tampilkan pesan yang jelas jika data gagal dimuat atau belum ada produk. Pertahankan tampilan dan komponen yang sudah ada.**

**Hasil: Pekerjaan untuk US-07: List produk telah selesai.

File yang Diubah
app/admin/page.jsx:
Mengambil daftar produk dari tabel produk di Supabase menggunakan koneksi sesi admin.
Menghapus penggunaan data contoh dari halaman admin.
Menampilkan pesan error jika query gagal dan pesan "Belum ada produk" jika tabel kosong.
Tetap menampilkan daftar dengan komponen TabelProduk yang sudah ada.**

**Perbaikan:**

## US-08 Tambah produk

**Prompt: Baca docs/user-stories.md bagian US-08.

Buat form di /admin/produk/baru menyimpan produk ke tabel "produk" di Supabase melalui Server Action. Validasi nama dan harga di server, periksa bahwa admin sudah login sebelum menyimpan, lalu arahkan kembali ke /admin. Tampilkan pesan yang jelas jika input atau penyimpanan gagal. Hapus CatatanBelumAktif dari halaman ini.**

**Hasil: Pekerjaan untuk US-08: Tambah produk telah selesai.

File yang Diubah
app/admin/actions.js:
Menambahkan Server Action tambahProduk yang memeriksa sesi admin, memvalidasi nama dan harga, menyimpan produk ke Supabase, memperbarui halaman katalog dan admin, lalu mengarahkan ke /admin.
app/admin/produk/baru/page.jsx:
Menghubungkan form ke Server Action tambahProduk, menampilkan pesan error, dan menghapus CatatanBelumAktif.
components/FormProduk.jsx:
Menambahkan prop action agar form yang sama dapat menjalankan Server Action tanpa mengubah tampilannya.**

**Perbaikan:**

## US-09 Ubah produk

**Prompt: Baca docs/user-stories.md bagian US-09.

Ubah app/admin/produk/[id]/ubah/page.jsx supaya mengambil produk dari Supabase dan mengisi FormProduk dengan data lama. Buat Server Action untuk menyimpan perubahan setelah memeriksa login dan memvalidasi nama serta harga di server. Setelah berhasil, arahkan kembali ke /admin. Hapus CatatanBelumAktif dan penggunaan data contoh dari halaman ini.**

**Hasil: Pekerjaan untuk US-09: Ubah produk telah selesai.

File yang Diubah
app/admin/actions.js:
Menambahkan Server Action ubahProduk yang memeriksa sesi admin, memvalidasi id, nama, dan harga, menyimpan perubahan ke Supabase, memperbarui halaman terkait, lalu mengarahkan ke /admin.
app/admin/produk/[id]/ubah/page.jsx:
Mengambil data lama produk dari Supabase memakai sesi admin, menghubungkan FormProduk ke Server Action ubahProduk, menampilkan pesan error, serta menghapus data contoh dan CatatanBelumAktif.**

**Perbaikan:**

## US-10 Hapus produk

**Prompt: Baca docs/user-stories.md bagian US-10.

Aktifkan tombol Hapus di daftar produk admin. Minta konfirmasi sebelum menghapus, lalu hapus produk dari Supabase melalui Server Action yang memeriksa login dan id produk di server. Setelah berhasil, kembali ke /admin dan perbarui katalog. Tampilkan pesan yang jelas jika penghapusan gagal.**

**Hasil: Pekerjaan untuk US-10: Hapus produk telah selesai.

File yang Diubah
app/admin/actions.js:
Menambahkan Server Action hapusProduk yang memeriksa sesi admin dan id, menghapus produk dari Supabase, memperbarui halaman terkait, lalu mengarahkan ke /admin.
components/TabelProduk.jsx:
Menghubungkan tombol Hapus ke Server Action serta meminta konfirmasi di browser sebelum form dikirim.
app/admin/page.jsx:
Menampilkan pesan error jika aksi penghapusan gagal.**

**Perbaikan:**

## Debugging dan fitur bonus

Tambahkan bagian baru untuk setiap error yang kamu perbaiki atau fitur bonus yang kamu kerjakan.
