import Link from "next/link";
import pool from "@/lib/db";
import FilterKatalog from "@/components/FilterKatalog";

export default async function KatalogPage() {
  // Mengambil seluruh data buku dari PostgreSQL
  const result = await pool.query(`
    SELECT
      id,
      judul,
      penulis,
      kategori,
      tahun,
      tersedia
    FROM buku
    ORDER BY id ASC
  `);

  // Menyimpan hasil query ke dalam variabel
  const dataBuku = result.rows;

  return (
    <section>
      <div className="mb-6 flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Katalog Buku</h1>
          <p className="text-slate-400 mt-1">
            Telusuri koleksi buku di Pustaka Senja.
          </p>
        </div>

        <Link
          href="/katalog/tambah"
          className="bg-amber-600 hover:bg-amber-500 text-white font-medium px-5 py-2.5 rounded-lg transition"
        >
          + Tambah Buku
        </Link>
      </div>


      <FilterKatalog dataBuku={dataBuku} />
    </section>
  );
}
