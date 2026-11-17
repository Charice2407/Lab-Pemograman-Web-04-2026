"use client";

import { useState } from "react";
import Link from "next/link";

function BukuCard({ id, judul, penulis, kategori, tahun, tersedia }) {
  const [favorit, setFavorit] = useState(false);

  return (
    <article className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md flex flex-col justify-between hover:border-amber-500/50 transition">
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className="text-xs bg-amber-500/10 text-amber-400 px-2 py-1 rounded-full font-medium">
            {kategori}
          </span>
          <span
            className={
              tersedia
                ? "text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full"
                : "text-xs bg-red-500/10 text-red-400 px-2 py-1 rounded-full"
            }
          >
            {tersedia ? "Tersedia" : "Sedang Dipinjam"}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-white mb-1">{judul}</h3>
        <p className="text-sm text-slate-400 mb-1">oleh {penulis}</p>
        <p className="text-xs text-slate-500">Terbit: {tahun}</p>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-3">
        <button
          onClick={() => setFavorit(!favorit)}
          className={
            favorit
              ? "bg-pink-600 hover:bg-pink-500 text-white text-sm px-3 py-1.5 rounded-lg transition"
              : "bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm px-3 py-1.5 rounded-lg transition"
          }
        >
          {favorit ? "♥ Favorit" : "♡ Simpan"}
        </button>
        <Link
          href={`/katalog/${id}`}
          className="text-sm text-amber-400 hover:underline"
        >
          Lihat Detail →
        </Link>
      </div>
    </article>
  );
}

export default BukuCard;