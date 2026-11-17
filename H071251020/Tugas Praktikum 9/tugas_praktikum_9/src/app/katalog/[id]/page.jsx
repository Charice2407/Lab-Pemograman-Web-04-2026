
import pool from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import TombolHapusBuku from "@/components/TombolHapusBuku";

export default async function DetailBukuPage({ params }) {
  // Mengambil ID dari URL
  const { id } = await params;

  // Memastikan ID berupa angka yang valid
  const bukuId = Number(id);

  if (!Number.isInteger(bukuId) || bukuId <= 0) {
    notFound();
  }

  // Mengambil satu buku berdasarkan ID
  const result = await pool.query(
    "SELECT * FROM buku WHERE id = $1",
    [bukuId]
  );

  // Jika buku tidak ditemukan
  if (result.rows.length === 0) {
    notFound();
  }

  const buku = result.rows[0];

  return (
    <section className="max-w-3xl mx-auto">
      <Link
        href="/katalog"
        className="inline-block text-amber-400 hover:text-amber-300 mb-6 transition"
      >
        ← Kembali ke Katalog
      </Link>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span className="bg-amber-600/20 text-amber-400 px-3 py-1 rounded-full text-sm">
            {buku.kategori}
          </span>

          <span
            className={
              buku.tersedia
                ? "bg-emerald-600/20 text-emerald-400 px-3 py-1 rounded-full text-sm"
                : "bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-sm"
            }
          >
            {buku.tersedia ? "Tersedia" : "Sedang Dipinjam"}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          {buku.judul}
        </h1>

        <p className="text-slate-400 text-lg">
          Oleh {buku.penulis}
        </p>

        <div className="border-t border-slate-800 my-6" />

        <div className="mb-6">
          <p className="text-sm text-slate-400 mb-1">
            Tahun Terbit
          </p>
          <p className="text-white font-medium">
            {buku.tahun}
          </p>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold text-amber-400 mb-3">
            Sinopsis Buku
          </h2>

          <p className="text-slate-300 leading-relaxed">
            {buku.sinopsis}
          </p>
        </div>

        <div className="border-t border-slate-800 mt-6 pt-6 flex flex-wrap gap-3">
          <Link
            href={`/katalog/${buku.id}/edit`}
            className="inline-block bg-amber-600 hover:bg-amber-500 text-white font-medium px-5 py-2.5 rounded-lg transition"
          >
            Edit Buku
          </Link>

          <TombolHapusBuku id={buku.id} />
        </div>

      </div>
    </section>
  );
}
