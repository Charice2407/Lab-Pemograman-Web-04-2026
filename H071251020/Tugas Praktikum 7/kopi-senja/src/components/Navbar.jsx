function Navbar({ kategoriAktif, onKategoriClick }) {
  const kategori = ["Semua", "Kopi", "Non-Kopi", "Makanan"];

  return (
    <nav className="bg-amber-100 px-8 py-3 flex gap-2 flex-wrap">
      {kategori.map((k) => (
        <button
          key={k}
          onClick={() => onKategoriClick(k)}
          className={
            "px-4 py-2 rounded-full font-medium transition " +
            (k === kategoriAktif
              ? "bg-amber-800 text-amber-50"
              : "bg-white text-amber-900 hover:bg-amber-200")
          }
        >
          {k}
        </button>
      ))}
    </nav>
  );
}

export default Navbar;