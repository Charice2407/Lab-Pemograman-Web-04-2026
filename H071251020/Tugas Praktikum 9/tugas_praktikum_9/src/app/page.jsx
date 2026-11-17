
import Hero from "@/components/Hero";
import Link from "next/link";
import pool from "@/lib/db";

export default async function HomePage() {
  // Mengambil statistik buku dari database
  const result = await pool.query(`
    SELECT
      COUNT(*) AS total_koleksi,
      COUNT(*) FILTER (WHERE tersedia = TRUE) AS buku_tersedia,
      COUNT(*) FILTER (WHERE tersedia = FALSE) AS buku_dipinjam
    FROM buku
  `);

  // Mengubah hasil query menjadi angka
  const totalBuku = Number(result.rows[0].total_koleksi);
  const bukuTersedia = Number(result.rows[0].buku_tersedia);
  const bukuDipinjam = Number(result.rows[0].buku_dipinjam);

  return (
    <div className="space-y-10">
      <Hero
        nama="Pustaka Senja"
        slogan="Baca hari ini, inspirasi esok hari."
        lokasi="📍 Dekat Kampus • Buka setiap hari 10.00 – 21.00"
      />

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-center">
          <p className="text-sm text-slate-400">Total Koleksi Buku</p>
          <p className="text-3xl font-bold text-amber-400 mt-1">
            {totalBuku}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-center">
          <p className="text-sm text-slate-400">Buku Tersedia</p>
          <p className="text-3xl font-bold text-emerald-400 mt-1">
            {bukuTersedia}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-center">
          <p className="text-sm text-slate-400">Buku Dipinjam</p>
          <p className="text-3xl font-bold text-red-400 mt-1">
            {bukuDipinjam}
          </p>
        </div>
      </section>

      <div className="flex justify-center gap-4 flex-wrap">
        <Link
          href="/katalog"
          className="bg-amber-600 hover:bg-amber-500 text-white font-medium px-5 py-2.5 rounded-lg transition"
        >
          Jelajahi Katalog
        </Link>

        <Link
          href="/usulan"
          className="border border-slate-700 hover:bg-slate-800 text-slate-200 font-medium px-5 py-2.5 rounded-lg transition"
        >
          Usulkan Buku
        </Link>
      </div>
    </div>
  );
}
