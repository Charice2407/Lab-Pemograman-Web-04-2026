
import pool from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import { editBuku } from "@/app/katalog/actions";

export default async function EditBukuPage({ params }) {
  // Mengambil ID dari URL
  const { id } = await params;
  const bukuId = Number(id);

  // Memeriksa ID
  if (!Number.isInteger(bukuId) || bukuId <= 0) {
    notFound();
  }

  // Mengambil data buku berdasarkan ID
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
    <section className="max-w-2xl mx-auto">
      <Link
        href={`/katalog/${buku.id}`}
        className="inline-block text-amber-400 hover:text-amber-300 mb-6"
      >
        ← Kembali ke Detail Buku
      </Link>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <h1 className="text-3xl font-bold mb-2">
          Edit Buku
        </h1>

        <p className="text-slate-400 mb-6">
          Ubah informasi buku yang sudah tersimpan.
        </p>

        <form action={editBuku} className="space-y-5">
          <input type="hidden" name="id" value={buku.id} />

          <div>
            <label htmlFor="judul" className="block text-sm mb-2">
              Judul Buku
            </label>
            <input
              id="judul"
              name="judul"
              type="text"
              defaultValue={buku.judul}
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white"
            />
          </div>

          <div>
            <label htmlFor="penulis" className="block text-sm mb-2">
              Nama Penulis
            </label>
            <input
              id="penulis"
              name="penulis"
              type="text"
              defaultValue={buku.penulis}
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white"
            />
          </div>

          <div>
            <label htmlFor="kategori" className="block text-sm mb-2">
              Kategori
            </label>
            <select
              id="kategori"
              name="kategori"
              defaultValue={buku.kategori}
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white"
            >
              <option value="Teknologi">Teknologi</option>
              <option value="Fiksi">Fiksi</option>
              <option value="Pengembangan Diri">Pengembangan Diri</option>
            </select>
          </div>

          <div>
            <label htmlFor="tahun" className="block text-sm mb-2">
              Tahun Terbit
            </label>
            <input
              id="tahun"
              name="tahun"
              type="number"
              min="1"
              step="1"
              defaultValue={buku.tahun}
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white"
            />
          </div>

          <div>
            <label htmlFor="tersedia" className="block text-sm mb-2">
              Status Buku
            </label>
            <select
              id="tersedia"
              name="tersedia"
              defaultValue={String(buku.tersedia)}
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white"
            >
              <option value="true">Tersedia</option>
              <option value="false">Sedang Dipinjam</option>
            </select>
          </div>

          <div>
            <label htmlFor="sinopsis" className="block text-sm mb-2">
              Sinopsis
            </label>
            <textarea
              id="sinopsis"
              name="sinopsis"
              rows={4}
              defaultValue={buku.sinopsis}
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white"
            />
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              className="bg-amber-600 hover:bg-amber-500 text-white font-medium px-5 py-2.5 rounded-lg transition"
            >
              Simpan Perubahan
            </button>

            <Link
              href={`/katalog/${buku.id}`}
              className="border border-slate-700 hover:bg-slate-800 text-slate-200 px-5 py-2.5 rounded-lg transition"
            >
              Batal
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
