function RingkasanPesanan({ jumlahItem, totalHarga }) {
  return (
    <div className="bg-amber-800 text-amber-50 mx-8 mt-4 p-4 rounded-lg flex justify-between items-center shadow">
      <div>
        <p className="text-sm opacity-80">Pesanan Anda</p>
        <p className="text-xl font-bold">{jumlahItem} item</p>
      </div>
      <div className="text-right">
        <p className="text-sm opacity-80">Total</p>
        <p className="text-xl font-bold">
          Rp {totalHarga.toLocaleString("id-ID")}
        </p>
      </div>
    </div>
  );
}

export default RingkasanPesanan;