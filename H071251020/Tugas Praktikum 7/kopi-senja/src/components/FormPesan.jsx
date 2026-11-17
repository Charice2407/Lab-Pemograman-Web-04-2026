function FormPesan({ nama, meja, onNamaChange, onMejaChange, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();   // cegah reload halaman (SPA)
    onSubmit();           // delegasi validasi & submit ke App
  };

  return (
    <section className="mx-8 my-6 bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Data Pemesanan</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">Nama</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => onNamaChange(e.target.value)}
            placeholder="Masukkan nama Anda"
            className="w-full border border-amber-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Nomor Meja</label>
          <input
            type="text"
            value={meja}
            onChange={(e) => onMejaChange(e.target.value)}
            placeholder="Contoh: 5"
            className="w-full border border-amber-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <button
          type="submit"
          className="bg-amber-700 text-white py-2 rounded font-semibold hover:bg-amber-800 transition"
        >
          Kirim Pesanan
        </button>
      </form>
    </section>
  );
}

export default FormPesan;