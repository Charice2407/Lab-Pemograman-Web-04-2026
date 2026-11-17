"use client";

import { useState } from "react";

const daftarKategori = ["Teknologi", "Fiksi", "Pengembangan Diri"];

export default function UsulanPage() {
  const [nama, setNama] = useState("");
  const [judulBuku, setJudulBuku] = useState("");
  const [kategori, setKategori] = useState("Teknologi");
  const [alasan, setAlasan] = useState("");
  const [pesanError, setPesanError] = useState("");
  const [daftarUsulan, setDaftarUsulan] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    // Validasi: trim() dulu, cek apakah ada yang kosong
    const namaTrim = nama.trim();
    const judulTrim = judulBuku.trim();
    const alasanTrim = alasan.trim();

    if (!namaTrim || !judulTrim || !alasanTrim) {
      setPesanError("Semua kolom wajib diisi sebelum dikirim.");
      return;
    }

    const usulanBaru = {
      nama: namaTrim,
      judul: judulTrim,
      kategori,
      alasan: alasanTrim,
    };

    setDaftarUsulan([usulanBaru, ...daftarUsulan]);
    setPesanError("");
    setNama("");
    setJudulBuku("");
    setKategori("Teknologi");
    setAlasan("");
  }

  return (
    <section className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Usulkan Buku</h1>
        <p className="text-slate-400 mt-1">
          Punya judul yang ingin dibaca di Pustaka Senja? Sampaikan usulanmu di sini.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4"
      >
        <div>
          <label className="block text-sm text-slate-300 mb-1">
            Nama Pengusul
          </label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Contoh: Nabila"
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-sm text-slate-300 mb-1">
            Judul Buku yang Diusulkan
          </label>
          <input
            type="text"
            value={judulBuku}
            onChange={(e) => setJudulBuku(e.target.value)}
            placeholder="Contoh: The Pragmatic Programmer"
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-sm text-slate-300 mb-1">Kategori</label>
          <select
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500"
          >
            {daftarKategori.map((kat) => (
              <option key={kat} value={kat}>
                {kat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-slate-300 mb-1">
            Alasan Usulan
          </label>
          <textarea
            rows={4}
            value={alasan}
            onChange={(e) => setAlasan(e.target.value)}
            placeholder="Ceritakan kenapa buku ini penting untuk ditambahkan..."
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        {pesanError && (
          <p className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg text-center">
            {pesanError}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-amber-600 hover:bg-amber-500 text-white font-medium py-2.5 rounded-lg transition"
        >
          Kirim Usulan
        </button>
      </form>

      {daftarUsulan.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">
            Usulan yang Baru Dikirim
          </h2>
          <ul className="space-y-3">
            {daftarUsulan.map((u, idx) => (
              <li
                key={idx}
                className="border border-slate-800 rounded-lg p-4 bg-slate-950"
              >
                <p className="font-semibold text-amber-400">{u.judul}</p>
                <p className="text-sm text-slate-400">
                  oleh {u.nama} • Kategori: {u.kategori}
                </p>
                <p className="text-sm text-slate-300 mt-1">"{u.alasan}"</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}