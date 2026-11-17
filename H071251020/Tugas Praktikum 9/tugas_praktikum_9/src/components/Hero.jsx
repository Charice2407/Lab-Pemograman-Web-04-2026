import Link from "next/link";

function Hero({ nama, slogan, lokasi }) {
  return (
    <section className="py-16 text-center bg-gradient-to-br from-amber-900/40 to-slate-900 rounded-2xl border border-amber-700/30 px-6 shadow-lg">
      <span className="inline-block bg-amber-500/10 text-amber-400 text-xs font-semibold px-3 py-1 rounded-full mb-4">
        Ruang Baca Komunitas
      </span>
      <h1 className="text-4xl font-bold mb-3">
        Selamat Datang di <span className="text-amber-400">{nama}</span>
      </h1>
      <p className="text-lg text-slate-300 font-medium mb-2">{slogan}</p>
      <p className="text-slate-400 max-w-xl mx-auto mb-8">{lokasi}</p>
      <div className="flex justify-center gap-4 flex-wrap">
        <Link
          href="/katalog"
          className="bg-amber-600 hover:bg-amber-500 text-white font-medium px-5 py-2.5 rounded-lg transition"
        >
          Lihat Katalog Buku
        </Link>
        <Link
          href="/usulan"
          className="border border-slate-700 hover:bg-slate-800 text-slate-200 font-medium px-5 py-2.5 rounded-lg transition"
        >
          Usulkan Buku
        </Link>
      </div>
    </section>
  );
}

export default Hero;