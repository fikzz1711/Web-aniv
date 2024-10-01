
  // Set tanggal anniversary
const countdownDate = new Date("nov 17, 2024 12:10:00").getTime();
let countdownInterval; // Untuk menyimpan interval countdown
let pesanIndex = 0; // Index pesan
let typingTimeout; // Untuk kontrol kecepatan mengetik

function mulaiCountdown() {
    const nama = document.getElementById('nama').value;

    if (nama === "") {
        alert("Mohon masukkan nama!");
        return;
    }

    // Sembunyikan form input nama dan tampilkan countdown
    document.getElementById('input-nama-section').classList.add('hidden');
    document.getElementById('countdown-section').classList.remove('hidden');

    // Simpan nama ke local storage
    localStorage.setItem("nama", nama);

    // Mulai countdown
    startCountdown();
}

function startCountdown() {
    const countdownElement = document.getElementById("countdown");
    countdownInterval = setInterval(function() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        // Hitung hari, jam, menit, dan detik
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        if (distance < 0) {
            clearInterval(countdownInterval);
            countdownElement.innerHTML = "EXPIRED";

            // Tampilkan pesan setelah countdown selesai
            tampilkanPesanSambutan();
        }
    }, 1000);
}

function tampilkanPesanSambutan() {
    const nama = localStorage.getItem("nama");
    document.getElementById('countdown-section').classList.add('hidden');
    const pesanSection = document.getElementById('pesan-section');
    pesanSection.classList.remove('hidden');
    pesanSection.classList.add('show'); // Menambahkan efek skala saat tampil
    document.getElementById('pesan-sambutan').innerHTML = `Selamat Anniversary, ${nama}!`;

    // Tampilkan navbar setelah pesan selesai
    const navbar = document.querySelector('.navbar');
    navbar.classList.remove('hidden');
    navbar.classList.add('fade-in'); // Menambahkan efek fade-in
    startPesan();
}

const pesanSetelahCountdown = [
    "Happy Anniversary!",
    "Setiap detik bersamamu adalah berkah yang tak ternilai.",
    "Ingatkah kamu saat pertama kali kita bertemu?",
    "Semua itu terasa seperti kemarin.",
    "Aku bersyukur memilikimu.",
    "Semoga cinta kita terus tumbuh seiring berjalannya waktu.",
    "Aku mencintaimu lebih dari yang bisa kuungkapkan.",
    "Mari kita ciptakan lebih banyak kenangan indah bersama.",
    "Setiap hari bersamamu adalah hadiah.",
    "Cinta kita seperti bintang di langit.",
    "Tak terlihat, tapi selalu ada.",
    "Terima kasih telah menjadi orang yang spesial dalam hidupku.",
    "Ingatlah, kita sudah melalui banyak hal bersama.",
    "Cinta kita adalah yang terkuat."
];

function startPesan() {
    if (pesanIndex < pesanSetelahCountdown.length) {
        tampilkanPesan(pesanSetelahCountdown[pesanIndex]);
        pesanIndex++;
    } else {
        document.getElementById('skip-button').style.display = 'none'; // Sembunyikan tombol skip saat pesan habis
    }
}

function tampilkanPesan(pesan) {
    const pesanElement = document.getElementById('pesan-sambutan');
    pesanElement.innerHTML = ''; // Reset pesan
    let index = 0;

    typingTimeout = setInterval(() => {
        if (index < pesan.length) {
            pesanElement.innerHTML += pesan.charAt(index);
            index++;
        } else {
            clearInterval(typingTimeout);
            setTimeout(() => {
                hapusPesan(() => {
                    setTimeout(startPesan, 1000); // Tunggu 1 detik sebelum melanjutkan ke pesan berikutnya
                });
            }, 1000); // Tunggu 1 detik setelah menampilkan pesan
        }
    }, 100); // Kecepatan mengetik
}

function hapusPesan(callback) {
    const pesanElement = document.getElementById('pesan-sambutan');
    const pesan = pesanElement.innerHTML;
    let index = pesan.length;

    const erasingTimeout = setInterval(() => {
        if (index > 0) {
            pesanElement.innerHTML = pesan.slice(0, index - 1);
            index--;
        } else {
            clearInterval(erasingTimeout);
            callback(); // Panggil callback setelah selesai menghapus
        }
    }, 50); // Kecepatan penghapusan (50ms per karakter)
}

function skipPesan() {
    clearInterval(typingTimeout); // Hentikan animasi mengetik
    if (pesanIndex < pesanSetelahCountdown.length) {
        pesanIndex = pesanSetelahCountdown.length; // Lewati semua pesan
        document.getElementById('pesan-sambutan').innerHTML = ""; // Kosongkan pesan
        document.getElementById('pesan-section').classList.add('hidden'); // Sembunyikan pesan
        document.querySelector('.navbar').style.opacity = 1; // Pastikan navbar muncul setelah skip
    }
}

// Fungsi untuk beralih halaman
function gantiHalaman(halaman) {
    // Hapus semua konten halaman yang ada
    const konten = document.querySelectorAll('.page-content');
    konten.forEach(item => item.classList.add('hidden'));
    
    // Tampilkan halaman yang dipilih
    document.getElementById(halaman).classList.remove('hidden');

    // Tambahkan efek pergeseran pada navbar
    const navbar = document.querySelector('.navbar');
    navbar.classList.add('slide-in');
    
    // Hapus kelas slide-in setelah beberapa detik agar bisa digunakan kembali
    setTimeout(() => {
        navbar.classList.remove('slide-in');
    }, 300);
}


