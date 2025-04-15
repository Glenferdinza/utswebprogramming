# Website Restoran Interaktif

Halo! Ini adalah proyek tengah semester saya untuk mata kuliah Pengembangan Web. Saya telah membuat sebuah website restoran dengan animasi keren dan elemen interaktif.

## Yang Saya Buat

Saya membangun website ini dari awal menggunakan HTML, CSS, dan JavaScript. Fitur-fiturnya antara lain:

- Navbar yang berubah ketika di-scroll (cobalah!)
- Animasi yang muncul saat halaman di-scroll ke bawah
- Sistem filter menu sehingga bisa melihat kategori makanan berbeda
- Bagian profil dengan informasi tentang chef
- Desain responsif yang berfungsi juga di perangkat mobile

## Akses Cepat

Untuk melihat website tanpa perlu mengunduh, silakan klik link ini: [https://gsya.my.id/utswebprogramming/]

## Cara Menggunakan

Jika ingin menjalankannya di komputer lokal:

1. Unduh semua file
2. Buka index.html di browser Anda
3. Selesai!

## File Proyek

- `index.html` - Dokumen HTML utama
- `styles.css` - Semua styling dan animasi
- `script.js` - JavaScript untuk bagian interaktif
- `/images` - Semua gambar yang digunakan dalam proyek

## Cara Kerja Fitur

### Efek Navbar
Navbar dimulai dengan transparan dan kemudian mendapatkan background ketika di-scroll ke bawah. Ini dibuat dengan JavaScript yang menambahkan class ketika pengguna scroll melewati titik tertentu.

### Animasi
Elemen-elemen muncul dengan efek slide dan fade in saat halaman di-scroll. Saya menggunakan Intersection Observer API untuk ini, bukan metode event scroll lama.

### Filter Menu
Klik tombol kategori untuk memfilter item menu. Setiap item memiliki atribut data yang sesuai dengan kategorinya.
