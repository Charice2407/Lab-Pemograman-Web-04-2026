
import Link from "next/link";
import { tambahBuku } from "@/app/katalog/actions";

export default async function TambahBukuPage({ searchParams }) {
  const params = await searchParams;
  const adaError = params?.error === "invalid";

  return (
    <section className="max-w-2xl mx-auto">
      <Link
        href="/katalog"
        className="inline-block text-amber-400 hover:text-amber-300 mb-6"
      >
        ← Kembali ke Katalog
      </Link>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <h1 className="text-3xl font-bold mb-2">
          Tambah Buku
        </h1>

        <p className="text-slate-400 mb-6">
          Masukkan informasi buku yang ingin ditambahkan ke koleksi.
        </p>

        {adaError && (
          <p className="bg-red-900/30 border border-red-700 text-red-300 rounded-lg p-3 mb-5">
            Data belum lengkap atau format tahun tidak valid. Silakan periksa kembali.
          </p>
        )}

        <form action={tambahBuku} className="space-y-5">
          <div>
            <label htmlFor="judul" className="block text-sm mb-2">
              Judul Buku
            </label>
            <input
              id="judul"
              name="judul"
              type="text"
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white"
              placeholder="Masukkan judul buku"
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
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white"
              placeholder="Masukkan nama penulis"
            />
          </div>

          <div>
            <label htmlFor="kategori" className="block text-sm mb-2">
              Kategori
            </label>
            <select
              id="kategori"
              name="kategori"
              required
              defaultValue=""
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white"
            >
              <option value="" disabled>
                Pilih kategori
              </option>
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
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white"
              placeholder="Contoh: 2024"
            />
          </div>

          <div>
            <label htmlFor="tersedia" className="block text-sm mb-2">
              Status Buku
            </label>
            <select
              id="tersedia"
              name="tersedia"
              required
              defaultValue="true"
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
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white"
              placeholder="Masukkan sinopsis buku"
            />
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              className="bg-amber-600 hover:bg-amber-500 text-white font-medium px-5 py-2.5 rounded-lg transition"
            >
              Simpan Buku
            </button>

            <Link
              href="/katalog"
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
