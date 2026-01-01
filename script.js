// --- MENGAMBIL ELEMEN DARI HTML ---
const email = document.getElementById("email");
const comment = document.getElementById("text");
const btn = document.getElementById("btn");
const subtitleElement = document.querySelector(".home__subtitle"); // Elemen subjudul di halaman Home

// --- EFEK MENGETIK (TYPING EFFECT) ---
// Daftar kata yang akan diketik otomatis
const items = ["GAME DEVELOPER", "PYTHON PROGRAMMER", "ROBOTIC ENGINEER"];
let itemIndex = 0; // Mulai dari kata pertama
let charIndex = 0; // Mulai dari huruf pertama
let isDeleting = false; // Apakah sedang menghapus huruf?
let typeSpeed = 100; // Kecepatan mengetik awal

function typeEffect() {
  const currentItem = items[itemIndex];

  // Jika sedang menghapus huruf
  if (isDeleting) {
    subtitleElement.textContent = currentItem.substring(0, charIndex - 1);
    charIndex--;
    typeSpeed = 50; // Lebih cepat saat menghapus
  } else {
    // Jika sedang mengetik huruf
    subtitleElement.textContent = currentItem.substring(0, charIndex + 1);
    charIndex++;
    typeSpeed = 100; // Normal saat mengetik
  }

  // Cek jika kata sudah selesai diketik
  if (!isDeleting && charIndex === currentItem.length) {
    isDeleting = true; // Mulai menghapus
    typeSpeed = 2000; // Tunggu 2 detik sebelum menghapus
  } else if (isDeleting && charIndex === 0) {
    // Jika sudah terhapus semua, ganti ke kata berikutnya
    isDeleting = false;
    itemIndex = (itemIndex + 1) % items.length; // Loop kembali ke awal jika sudah habis
    typeSpeed = 500; // Jeda sebentar sebelum mengetik kata baru
  }

  // Ulangi fungsi ini terus menerus sesuai kecepatan
  setTimeout(typeEffect, typeSpeed);
}

// Jalankan efek mengetik hanya jika elemennya ada (untuk menghindari error di halaman lain)
if (subtitleElement) {
  typeEffect();
}

// --- ANIMASI SAAT DI-SCROLL (GULIR) ---
const observerOptions = {
  threshold: 0.2 // Animasi jalan saat 20% elemen terlihat
};

// Fungsi pengamat (Observer)
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show"); // Tambahkan class 'show' agar elemen muncul
    }
  });
}, observerOptions);

// Pasang pengamat ke semua elemen dengan class 'animate-on-scroll'
document.querySelectorAll(".animate-on-scroll").forEach((el) => {
  observer.observe(el);
});

// --- VALIDASI FORMULIR ---
if (btn) {
  btn.addEventListener("click", function () {
    // 1. Cek apakah email kosong atau tidak valid (tidak ada @)
    if (!email.value || !email.value.includes("@")) {
      alert("Mohon masukkan alamat email yang valid!");
      email.style.border = "1px solid red"; // Beri garis merah
      setTimeout(() => (email.style.border = "1px solid #333"), 2000); // Kembalikan warna setelah 2 detik
      return;
    }

    // 2. Cek apakah komentar kosong
    if (!comment.value) {
      alert("Mohon isi komentar Anda!");
      comment.style.border = "1px solid red";
      setTimeout(() => (comment.style.border = "1px solid #333"), 2000);
      return;
    }

    // Jika valid, kosongkan form
    email.value = "";
    comment.value = "";

    // --- TAMPILKAN PESAN SUKSES DENGAN ANIMASI ---
    var successMessage = document.createElement("div"); // Buat elemen baru
    successMessage.innerText = "Terima kasih atas masukan Anda!";

    // Styling pesan sukses via Javascript
    successMessage.style.position = "fixed";
    successMessage.style.bottom = "30px";
    successMessage.style.right = "30px";
    successMessage.style.padding = "15px 25px";
    successMessage.style.background = "linear-gradient(to right, #D90429, #8D99AE)"; // Gradasi Merah
    successMessage.style.color = "white";
    successMessage.style.borderRadius = "8px";
    successMessage.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.3)";
    successMessage.style.fontFamily = "'Outfit', sans-serif";
    successMessage.style.fontWeight = "bold";
    successMessage.style.zIndex = "2000";
    successMessage.style.opacity = "0"; // Awalnya transparan
    successMessage.style.transform = "translateY(20px)"; // Sedikit di bawah
    successMessage.style.transition = "all 0.5s ease";

    document.body.appendChild(successMessage); // Masukkan ke halaman

    // Animasi Muncul
    setTimeout(() => {
      successMessage.style.opacity = "1";
      successMessage.style.transform = "translateY(0)";
    }, 100);

    // Animasi Hilang setelah 3 detik
    setTimeout(() => {
      successMessage.style.opacity = "0";
      successMessage.style.transform = "translateY(20px)";
      setTimeout(() => successMessage.remove(), 500); // Hapus elemen dari memori
    }, 3000);
  });
}
