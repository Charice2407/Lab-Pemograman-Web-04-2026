import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import MenuList from "./components/MenuList.jsx";
import RingkasanPesanan from "./components/RingkasanPesanan.jsx";
import FormPesan from "./components/FormPesan.jsx";
import Footer from "./components/Footer.jsx";

// 🔑 Data menu ditulis SATU KALI di sini (sesuai ketentuan no.7)
const dataMenu = [
  { id: 1, nama: "Kopi Susu", kategori: "Kopi", harga: 18000, tersedia: true,
    deskripsi: "Espresso dengan susu segar dan gula aren." },
  { id: 2, nama: "Americano", kategori: "Kopi", harga: 15000, tersedia: true,
    deskripsi: "Espresso dengan air panas, rasa kuat dan bersih." },
  { id: 3, nama: "Cappuccino", kategori: "Kopi", harga: 22000, tersedia: true,
    deskripsi: "Espresso, susu panas, dan busa susu tebal." },
  { id: 4, nama: "Matcha Latte", kategori: "Non-Kopi", harga: 24000, tersedia: true,
    deskripsi: "Teh hijau matcha dengan susu." },
  { id: 5, nama: "Teh Tarik", kategori: "Non-Kopi", harga: 14000, tersedia: false,
    deskripsi: "Teh susu yang ditarik hingga berbusa." },
  { id: 6, nama: "Cokelat Panas", kategori: "Non-Kopi", harga: 20000, tersedia: true,
    deskripsi: "Cokelat pekat dengan susu hangat." },
  { id: 7, nama: "Roti Bakar", kategori: "Makanan", harga: 16000, tersedia: true,
    deskripsi: "Roti tebal dengan selai cokelat dan keju." },
  { id: 8, nama: "Pisang Goreng", kategori: "Makanan", harga: 12000, tersedia: false,
    deskripsi: "Pisang goreng renyah dengan taburan keju." },
  { id: 9, nama: "Nasi Goreng", kategori: "Makanan", harga: 25000, tersedia: true,
    deskripsi: "Nasi goreng kampung dengan telur mata sapi." },
];

function App() {
  // 🧠 STATE-STATE UTAMA (Lifting State Up di sini)
  const [kategoriAktif, setKategoriAktif] = useState("Semua");
  const [pesanan, setPesanan] = useState([]);          // array of {id, qty}
  const [menuDetailId, setMenuDetailId] = useState(null); // id menu yang dibuka detailnya
  const [nama, setNama] = useState("");
  const [meja, setMeja] = useState("");
  const [terkirim, setTerkirim] = useState(false);
  const [pesanError, setPesanError] = useState("");

  // 📌 Filter menu berdasarkan kategori aktif
  const menuTampil =
    kategoriAktif === "Semua"
      ? dataMenu
      : dataMenu.filter((m) => m.kategori === kategoriAktif);

  // ➕ Tambah item ke pesanan
  const tambahPesanan = (id) => {
    const menu = dataMenu.find((m) => m.id === id);
    if (!menu || !menu.tersedia) return; // menu habis → tidak bisa dipesan

    setPesanan((prev) => {
      const sudahAda = prev.find((p) => p.id === id);
      if (sudahAda) {
        // kalau sudah ada, naikkan qty
        return prev.map((p) =>
          p.id === id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      // kalau belum, tambahkan item baru
      return [...prev, { id, qty: 1 }];
    });
  };

  // ➖ Kurangi qty (hapus kalau qty jadi 0)
  const kurangiPesanan = (id) => {
    setPesanan((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, qty: p.qty - 1 } : p))
        .filter((p) => p.qty > 0)
    );
  };

  // 💰 Hitung total harga
  const hitungTotal = () =>
    pesanan.reduce((total, p) => {
      const menu = dataMenu.find((m) => m.id === p.id);
      return total + menu.harga * p.qty;
    }, 0);

  // 📮 Submit pesanan
  const handleSubmit = () => {
    // Validasi (sesuai ketentuan: jangan diam-diam menerima)
    if (pesanan.length === 0) {
      setPesanError("Pesanan masih kosong. Silakan pilih menu dulu.");
      return;
    }
    if (nama.trim() === "") {
      setPesanError("Nama pelanggan harus diisi.");
      return;
    }
    if (meja.trim() === "") {
      setPesanError("Nomor meja harus diisi.");
      return;
    }

    // Sukses → tampilkan terima kasih & reset semua
    setPesanError("");
    setTerkirim(true);
    setPesanan([]);
    setNama("");
    setMeja("");
  };

  const menuDetail = menuDetailId
    ? dataMenu.find((m) => m.id === menuDetailId)
    : null;

  return (
    <div className="min-h-screen bg-amber-50 text-amber-950 font-sans">
      {/* Header */}
      <header className="bg-amber-900 text-amber-50 py-6 px-8 shadow-md">
        <h1 className="text-3xl font-bold">☕ Kedai Kopi Senja</h1>
        <p className="text-amber-200 text-sm">Pesan langsung dari meja Anda</p>
      </header>

      {/* Ringkasan di atas (sesuai soal: jumlah & total di atas) */}
      <RingkasanPesanan
        jumlahItem={pesanan.reduce((t, p) => t + p.qty, 0)}
        totalHarga={hitungTotal()}
      />

      {/* Pesan error / terima kasih */}
      {pesanError && (
        <div className="mx-8 mt-4 p-3 bg-red-100 text-red-800 rounded">
          {pesanError}
        </div>
      )}
      {terkirim && (
        <div className="mx-8 mt-4 p-4 bg-green-100 text-green-800 rounded">
          Terima kasih, {nama || "Pelanggan"}! Pesanan untuk meja {meja || "-"}{" "}
          sedang diproses. 🎉
        </div>
      )}

      {/* Navbar / Filter Kategori */}
      <Navbar
        kategoriAktif={kategoriAktif}
        onKategoriClick={setKategoriAktif}
      />

      {/* Daftar Menu */}
      <main className="px-8 py-4">
        <MenuList
          menuList={menuTampil}
          onTambah={tambahPesanan}
          onBukaDetail={setMenuDetailId}
        />
      </main>

      {/* Modal Detail Menu */}
      {menuDetail && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setMenuDetailId(null)}
        >
          <div
            className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-2">{menuDetail.nama}</h2>
            <p className="text-amber-700 font-semibold mb-2">
              Rp {menuDetail.harga.toLocaleString("id-ID")}
            </p>
            <p className="text-gray-700 mb-4">{menuDetail.deskripsi}</p>
            <p className="mb-4">
              Status:{" "}
              <span
                className={
                  menuDetail.tersedia
                    ? "text-green-700 font-semibold"
                    : "text-red-700 font-semibold"
                }
              >
                {menuDetail.tersedia ? "Tersedia" : "Habis"}
              </span>
            </p>
            <button
              onClick={() => setMenuDetailId(null)}
              className="bg-amber-800 text-white px-4 py-2 rounded hover:bg-amber-900"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Form Pesan */}
      <FormPesan
        nama={nama}
        meja={meja}
        onNamaChange={setNama}
        onMejaChange={setMeja}
        onSubmit={handleSubmit}
      />

      <Footer />
    </div>
  );
}

export default App;