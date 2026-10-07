// Data awal praktikan
const dataPraktikan = [
  { nama: "Budi", nilaiTugas: [80, 85, 90] },
  { nama: "Siti", nilaiTugas: [60, 60, 60] },
  { nama: "Andi", nilaiTugas: [90, 90, 90] },
  { nama: "Dewi", nilaiTugas: [75, 75, 75] },
  { nama: "Eko", nilaiTugas: [45, 45, 45] },
];

// Batas kelulusan
const BATAS_LULUS = 75;

/* ===================== LOGIKA ===================== */

// Menghitung rata-rata dari array angka
function hitungRataRata(daftarNilai) {
  const total = daftarNilai.reduce((jumlah, nilai) => jumlah + nilai, 0);
  const rataRata = total / daftarNilai.length;
  return Math.round(rataRata * 100) / 100; // dibulatkan 2 angka desimal
}

// Menentukan status berdasarkan rata-rata
function tentukanStatus(rataRata) {
  if (rataRata >= BATAS_LULUS) {
    return "Lulus";
  } else {
    return "Tidak Lulus";
  }
}

// Mengubah data mentah menjadi data hasil (array of objects baru)
function prosesData(daftar) {
  return daftar.map((praktikan) => {
    const rataRata = hitungRataRata(praktikan.nilaiTugas);
    return {
      nama: praktikan.nama,
      nilaiTugas: praktikan.nilaiTugas,
      rataRata: rataRata,
      status: tentukanStatus(rataRata),
    };
  });
}

/* ===================== TAMPILAN ===================== */

// CSS murni, ditulis sebagai string lalu dicetak dengan document.write()
function tulisCSS() {
  document.write(
    "<style>" +
      "*{box-sizing:border-box;margin:0;padding:0;}" +
      "body{font-family:Segoe UI,Arial,sans-serif;background:#f1f5f9;padding:24px 16px;color:#1e293b;}" +
      ".container{max-width:640px;margin:0 auto;background:#fff;border-radius:16px;padding:32px;box-shadow:0 10px 30px rgba(15,23,42,0.1);}" +
      ".container h1{font-size:28px;font-weight:800;}" +
      ".subtitle{color:#64748b;font-size:14px;margin-top:4px;padding-bottom:16px;border-bottom:1px solid #e2e8f0;margin-bottom:20px;}" +
      ".welcome{background:#eff6ff;border-left:4px solid #3b82f6;padding:14px 16px;border-radius:6px;margin-bottom:20px;}" +
      ".welcome h2{color:#1e40af;font-size:18px;}" +
      ".welcome p{color:#3b82f6;font-size:14px;margin-top:4px;}" +
      ".denied{background:#fef2f2;border-left:4px solid #dc2626;padding:14px 16px;border-radius:6px;}" +
      ".denied h2{color:#991b1b;font-size:18px;}" +
      ".denied p{color:#dc2626;font-size:14px;margin-top:4px;}" +
      ".summary{display:flex;gap:12px;margin-bottom:20px;}" +
      ".summary div{flex:1;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:10px;text-align:center;font-size:13px;color:#64748b;}" +
      ".summary b{display:block;font-size:22px;color:#1e293b;}" +
      ".card{display:flex;justify-content:space-between;align-items:center;border:1px solid #e2e8f0;border-radius:10px;padding:16px;margin-bottom:12px;transition:all .2s;}" +
      ".card:hover{box-shadow:0 4px 12px rgba(15,23,42,0.12);transform:translateY(-2px);}" +
      ".card h3{font-size:18px;}" +
      ".card p{color:#64748b;font-size:14px;margin-top:2px;}" +
      ".badge{padding:4px 14px;border-radius:999px;font-size:13px;font-weight:700;}" +
      ".lulus{background:#dcfce7;color:#166534;}" +
      ".gagal{background:#fee2e2;color:#991b1b;}" +
      "</style>"
  );
}

// Membuat HTML satu kartu praktikan (mengembalikan string)
function buatKartu(hasil) {
  let kelasBadge = "gagal";
  if (hasil.status === "Lulus") {
    kelasBadge = "lulus";
  }
  return (
    '<div class="card">' +
    "<div>" +
    "<h3>" + hasil.nama + "</h3>" +
    "<p>Rata-rata: " + hasil.rataRata + "</p>" +
    "</div>" +
    '<span class="badge ' + kelasBadge + '">' + hasil.status + "</span>" +
    "</div>"
  );
}

// Header halaman (judul) - selalu tampil
function tulisHeader() {
  document.write(
    '<div class="container">' +
      "<h1>Sistem Laporan Praktikum</h1>" +
      '<p class="subtitle">Evaluasi kelulusan berbasis JavaScript murni</p>'
  );
}

/* ===================== PROGRAM UTAMA ===================== */

tulisCSS();
tulisHeader();

// 1. Verifikasi kehadiran Asisten Lab
const namaAsisten = prompt("Masukkan nama Anda (Asisten Lab):");

// prompt() mengembalikan null jika klik Batal, "" jika kosong.
if (namaAsisten && namaAsisten.trim() !== "") {
  // 2. Proses data
  const hasilAkhir = prosesData(dataPraktikan);
  const jumlahLulus = hasilAkhir.filter((h) => h.status === "Lulus").length;
  const jumlahTidakLulus = hasilAkhir.length - jumlahLulus;

  // 3. Render ke layar dengan document.write()
  document.write(
    '<div class="welcome">' +
      "<h2>Selamat datang Asisten " + namaAsisten.trim() + "!</h2>" +
      "<p>Berikut adalah laporan hasil evaluasi praktikum.</p>" +
      "</div>"
  );

  document.write(
    '<div class="summary">' +
      "<div><b>" + hasilAkhir.length + "</b>Praktikan</div>" +
      "<div><b>" + jumlahLulus + "</b>Lulus</div>" +
      "<div><b>" + jumlahTidakLulus + "</b>Tidak Lulus</div>" +
      "</div>"
  );

  for (const hasil of hasilAkhir) {
    document.write(buatKartu(hasil));
  }

  // 4. Tampilkan data akhir di console
  console.log(hasilAkhir);
} else {
  document.write(
    '<div class="denied">' +
      "<h2>Akses Ditolak</h2>" +
      "<p>Anda tidak memasukkan identitas asisten.</p>" +
      "</div>"
  );
}

// Menutup div .container
document.write("</div>");