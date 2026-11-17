function MenuCard({ menu, onTambah, onBukaDetail }) {
  const { id, nama, kategori, harga, tersedia } = menu;

  return (
    <div
      className={
        "bg-white rounded-xl shadow p-4 flex flex-col justify-between " +
        (!tersedia ? "opacity-60" : "")
      }
    >
      <div>
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg">{nama}</h3>
          <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">
            {kategori}
          </span>
        </div>
        <p className="text-amber-800 font-semibold mt-1">
          Rp {harga.toLocaleString("id-ID")}
        </p>
        <p className="text-sm text-gray-600 mt-2">
          {tersedia ? "✅ Tersedia" : "❌ Habis"}
        </p>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onBukaDetail(id)}
          className="flex-1 bg-gray-100 text-gray-800 py-2 rounded hover:bg-gray-200"
        >
          Detail
        </button>
        <button
          onClick={() => onTambah(id)}
          disabled={!tersedia}
          className={
            "flex-1 py-2 rounded font-semibold " +
            (tersedia
              ? "bg-amber-700 text-white hover:bg-amber-800"
              : "bg-gray-300 text-gray-500 cursor-not-allowed")
          }
        >
          Tambah
        </button>
      </div>
    </div>
  );
}

export default MenuCard;