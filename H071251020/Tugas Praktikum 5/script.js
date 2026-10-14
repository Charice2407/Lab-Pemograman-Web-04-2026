/* =====================================================
   PAPAN TUGAS TIM - Praktikum Pemrograman Web Bab 5
   ===================================================== */

// ---------- 1. Alamat API ----------
const URL_USERS = "https://jsonplaceholder.typicode.com/users";
const URL_TODOS = "https://jsonplaceholder.typicode.com/todos?userId=";

// ---------- 2. Mengambil elemen dari HTML (DOM) ----------
const elStatusAnggota = document.getElementById("status-anggota");
const elDaftarAnggota = document.getElementById("daftar-anggota");
const elJudulTugas = document.getElementById("judul-tugas");
const elRingkasan = document.getElementById("ringkasan");
const elBarProgres = document.getElementById("bar-progres");
const elInputCari = document.getElementById("input-cari");
const elFormTugas = document.getElementById("form-tugas");
const elInputJudul = document.getElementById("input-judul");
const elTombolSimpan = document.getElementById("tombol-simpan");
const elPesanErrorForm = document.getElementById("pesan-error-form");
const elStatusTugas = document.getElementById("status-tugas");
const elDaftarTugas = document.getElementById("daftar-tugas");
const elPesanKosong = document.getElementById("pesan-kosong");
const elNotifikasi = document.getElementById("notifikasi");

// ---------- 3. Variabel penyimpan kondisi (state) ----------
let daftarAnggotaUI = []; // [{ data, tombol, badge }, ...]
let anggotaAktif = null; // data anggota yang sedang dipilih
let daftarTugas = []; // [{ title, completed, elemen, ... }, ...]
let nomorPermintaan = 0; // penanda permintaan tugas terbaru
let tugasSiap = false; // true jika tugas anggota sudah berhasil dimuat
let sedangMenyimpan = false; // true selama proses simpan berlangsung
let timerNotifikasi = null; // penyimpan id timer notifikasi

/* =====================================================
   BAGIAN A - FUNGSI BANTU
   ===================================================== */

// Menampilkan pesan error beserta tombol "Coba lagi"
function tampilkanError(elemen, pesan, fungsiUlang) {
  elemen.textContent = pesan; // sekaligus mengosongkan isi lama
  const tombolUlang = document.createElement("button");
  tombolUlang.type = "button";
  tombolUlang.textContent = "Coba lagi";
  tombolUlang.className =
    "ml-2 rounded border border-slate-300 px-2 py-1 text-xs text-slate-600 hover:bg-slate-50";
  tombolUlang.addEventListener("click", fungsiUlang);
  elemen.appendChild(tombolUlang);
}

// Mengubah objek error menjadi kalimat yang mudah dipahami
function pesanDariError(error) {
  // fetch() melempar TypeError jika koneksi putus
  if (error.name === "TypeError") {
    return "Koneksi ke server terputus.";
  }
  return error.message;
}

// Memperbarui teks "X dari Y tugas selesai" dan bilah progres
function perbaruiRingkasan() {
  const total = daftarTugas.length;
  const selesai = daftarTugas.filter((tugas) => tugas.completed).length;
  elRingkasan.textContent = selesai + " dari " + total + " tugas selesai";

  let persen = 0;
  if (total > 0) {
    persen = (selesai / total) * 100;
  }
  elBarProgres.style.width = persen + "%";
}

// Menampilkan notifikasi lalu menyembunyikannya setelah 3 detik
function tampilkanNotifikasi(teks) {
  clearTimeout(timerNotifikasi); // batalkan timer lama, jika ada
  elNotifikasi.textContent = teks;
  elNotifikasi.classList.remove("hidden");
  timerNotifikasi = setTimeout(() => {
    elNotifikasi.classList.add("hidden");
  }, 3000);
}

/* =====================================================
   BAGIAN B - ANGGOTA (F1)
   ===================================================== */

// Mengatur tanda "sedang dipilih" pada satu tombol anggota
function aturPenanda(item, aktif) {
  if (aktif) {
    item.tombol.classList.add("bg-indigo-50", "text-indigo-700", "font-semibold");
    item.badge.classList.remove("bg-slate-100", "text-slate-500");
    item.badge.classList.add("bg-indigo-600", "text-white");
  } else {
    item.tombol.classList.remove("bg-indigo-50", "text-indigo-700", "font-semibold");
    item.badge.classList.remove("bg-indigo-600", "text-white");
    item.badge.classList.add("bg-slate-100", "text-slate-500");
  }
}

// Membuat satu tombol anggota
function buatTombolAnggota(orang) {
  const tombol = document.createElement("button");
  tombol.type = "button";
  tombol.className =
    "flex shrink-0 items-center gap-3 rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-50";

  // Nomor urut dua digit: 1 -> "01"
  let nomor = "" + orang.id;
  if (orang.id < 10) {
    nomor = "0" + orang.id;
  }
  const badge = document.createElement("span");
  badge.className =
    "flex h-6 w-6 shrink-0 items-center justify-center rounded bg-slate-100 text-xs text-slate-500";
  badge.textContent = nomor;

  const nama = document.createElement("span");
  nama.className = "whitespace-nowrap md:whitespace-normal";
  nama.textContent = orang.name;

  tombol.appendChild(badge);
  tombol.appendChild(nama);

  const item = { data: orang, tombol: tombol, badge: badge };

  tombol.addEventListener("click", () => {
    pilihAnggota(item);
  });
  return item;
}

// Mengambil daftar anggota dari server
async function muatAnggota() {
  elStatusAnggota.textContent = "Memuat anggota...";
  elDaftarAnggota.innerHTML = ""; // satu-satunya pemakaian innerHTML: mengosongkan
  daftarAnggotaUI = [];

  try {
    const respons = await fetch(URL_USERS);
    if (!respons.ok) {
      throw new Error("Server mengembalikan status " + respons.status + ".");
    }
    const anggota = await respons.json();

    elStatusAnggota.textContent = ""; // hapus teks "Memuat anggota..."
    for (const orang of anggota) {
      const item = buatTombolAnggota(orang);
      daftarAnggotaUI.push(item);
      elDaftarAnggota.appendChild(item.tombol);
    }

    // Langsung pilih anggota pertama agar halaman tidak kosong
    pilihAnggota(daftarAnggotaUI[0]);
  } catch (error) {
    tampilkanError(
      elStatusAnggota,
      "Gagal memuat anggota. " + pesanDariError(error),
      muatAnggota
    );
  }
}

/* =====================================================
   BAGIAN C - TUGAS ANGGOTA (F2, F5)
   ===================================================== */

// Memilih anggota: beri penanda lalu muat tugasnya
function pilihAnggota(item) {
  if (sedangMenyimpan) {
    return; // jangan ganti anggota saat tugas baru sedang disimpan
  }
  for (const lain of daftarAnggotaUI) {
    aturPenanda(lain, false); // hapus penanda dari semua anggota
  }
  aturPenanda(item, true); // beri penanda hanya pada yang dipilih
  anggotaAktif = item.data;
  muatTugas(item.data);
}

// Mengubah tampilan sebuah tugas menjadi "selesai"
function tampilkanSelesai(tugas) {
  tugas.judulEl.classList.add("line-through", "text-gray-400");
  tugas.indikator.classList.remove("border-slate-300");
  tugas.indikator.classList.add("border-emerald-500", "bg-emerald-500", "text-white");
  tugas.indikator.textContent = "✓";
  if (tugas.tombolSelesai) {
    tugas.tombolSelesai.remove(); // tombol "Tandai selesai" dihapus
  }
}

// Membuat elemen <li> untuk satu tugas
function buatElemenTugas(tugas) {
  const li = document.createElement("li");
  li.className = "group flex items-center gap-3 border-b border-slate-100 py-3";

  const indikator = document.createElement("span");
  indikator.className =
    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-slate-300 text-xs";

  const judulEl = document.createElement("span");
  judulEl.className = "min-w-0 flex-1 break-words text-sm";
  judulEl.textContent = tugas.title; // data dari server -> textContent

  const aksi = document.createElement("div");
  aksi.className =
    "flex gap-2 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100";

  let tombolSelesai = null;
  if (!tugas.completed) {
    tombolSelesai = document.createElement("button");
    tombolSelesai.type = "button";
    tombolSelesai.textContent = "Tandai selesai";
    tombolSelesai.className =
      "rounded border border-emerald-300 px-2 py-1 text-xs text-emerald-700 hover:bg-emerald-50";
    aksi.appendChild(tombolSelesai);
  }

  const tombolHapus = document.createElement("button");
  tombolHapus.type = "button";
  tombolHapus.textContent = "Hapus";
  tombolHapus.className =
    "rounded border border-red-200 px-2 py-1 text-xs text-red-600 hover:bg-red-50";
  aksi.appendChild(tombolHapus);

  li.appendChild(indikator);
  li.appendChild(judulEl);
  li.appendChild(aksi);

  // Simpan referensi elemen di objek tugas
  tugas.elemen = li;
  tugas.judulEl = judulEl;
  tugas.indikator = indikator;
  tugas.tombolSelesai = tombolSelesai;

  if (tugas.completed) {
    tampilkanSelesai(tugas);
  }

  // Event: Tandai selesai
  if (tombolSelesai) {
    tombolSelesai.addEventListener("click", () => {
      tugas.completed = true;
      tampilkanSelesai(tugas);
      perbaruiRingkasan();
    });
  }

  // Event: Hapus
  tombolHapus.addEventListener("click", () => {
    li.remove(); // hapus dari halaman
    daftarTugas = daftarTugas.filter((t) => t !== tugas); // hapus dari array
    perbaruiRingkasan();
    terapkanPencarian();
  });

  return li;
}

// Memasukkan satu tugas ke array dan ke halaman
function tambahkanTugas(tugas) {
  daftarTugas.push(tugas);
  elDaftarTugas.appendChild(buatElemenTugas(tugas));
}

// Mengambil tugas satu anggota dari server
async function muatTugas(anggota) {
  nomorPermintaan++;
  const nomorSaya = nomorPermintaan;

  // Siapkan tampilan: judul baru, daftar lama dikosongkan, status loading
  elJudulTugas.textContent = "Tugas " + anggota.name;
  elInputCari.value = "";
  elPesanErrorForm.textContent = "";
  elDaftarTugas.innerHTML = ""; // mengosongkan daftar lama
  elPesanKosong.classList.add("hidden");
  daftarTugas = [];
  tugasSiap = false;
  perbaruiRingkasan();
  elStatusTugas.textContent = "Memuat tugas...";

  try {
    const respons = await fetch(URL_TODOS + anggota.id);
    if (!respons.ok) {
      throw new Error("Server mengembalikan status " + respons.status + ".");
    }
    const data = await respons.json();

    // Abaikan jika pengguna sudah mengklik anggota lain
    if (nomorSaya !== nomorPermintaan) {
      return;
    }

    elStatusTugas.textContent = ""; // hapus teks loading
    for (const todo of data) {
      tambahkanTugas({ title: todo.title, completed: todo.completed });
    }
    tugasSiap = true;
    perbaruiRingkasan();
    terapkanPencarian();
  } catch (error) {
    if (nomorSaya !== nomorPermintaan) {
      return;
    }
    tampilkanError(
      elStatusTugas,
      "Gagal memuat tugas " + anggota.name + ". " + pesanDariError(error),
      () => {
        muatTugas(anggota);
      }
    );
  }
}

/* =====================================================
   BAGIAN D - PENCARIAN (F3)
   ===================================================== */

function terapkanPencarian() {
  const kataKunci = elInputCari.value.trim().toLowerCase();
  let jumlahTampil = 0;

  for (const tugas of daftarTugas) {
    if (tugas.title.toLowerCase().includes(kataKunci)) {
      tugas.elemen.classList.remove("hidden");
      jumlahTampil++;
    } else {
      tugas.elemen.classList.add("hidden"); // disembunyikan, tidak dihapus
    }
  }

  if (daftarTugas.length === 0) {
    elPesanKosong.textContent = "Belum ada tugas.";
    elPesanKosong.classList.remove("hidden");
  } else if (jumlahTampil === 0) {
    elPesanKosong.textContent = "Tidak ada tugas yang cocok.";
    elPesanKosong.classList.remove("hidden");
  } else {
    elPesanKosong.classList.add("hidden");
  }
}

elInputCari.addEventListener("input", terapkanPencarian);

/* =====================================================
   BAGIAN E - TAMBAH TUGAS (F4)
   ===================================================== */

// Simulasi menyimpan ke server (butuh 1 detik)
function simpanTugas(judul) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const kembar = daftarTugas.find(
        (tugas) => tugas.title.trim().toLowerCase() === judul.toLowerCase()
      );
      if (kembar) {
        reject(new Error('Tugas "' + judul + '" sudah ada di daftar.'));
      } else {
        resolve({ title: judul, completed: false });
      }
    }, 1000);
  });
}

elFormTugas.addEventListener("submit", async (event) => {
  event.preventDefault(); // cegah halaman dimuat ulang

  const judul = elInputJudul.value.trim();
  elPesanErrorForm.textContent = "";

  // Validasi
  if (!tugasSiap) {
    elPesanErrorForm.textContent = "Tugas anggota belum selesai dimuat.";
    return;
  }
  if (judul.length === 0) {
    elPesanErrorForm.textContent = "Judul tugas belum diisi.";
    return;
  }
  if (judul.length < 5) {
    elPesanErrorForm.textContent = "Judul terlalu pendek, minimal 5 karakter.";
    return;
  }

  // Proses simpan
  sedangMenyimpan = true;
  elTombolSimpan.disabled = true;
  elTombolSimpan.textContent = "Menyimpan...";

  try {
    const tugasBaru = await simpanTugas(judul);
    tambahkanTugas(tugasBaru);
    perbaruiRingkasan();
    terapkanPencarian();
    elInputJudul.value = "";
    tampilkanNotifikasi("Tugas berhasil ditambahkan.");
  } catch (error) {
    elPesanErrorForm.textContent = error.message;
  } finally {
    sedangMenyimpan = false;
    elTombolSimpan.disabled = false;
    elTombolSimpan.textContent = "Simpan";
  }
});

/* =====================================================
   BAGIAN F - MULAI PROGRAM
   ===================================================== */
muatAnggota();
