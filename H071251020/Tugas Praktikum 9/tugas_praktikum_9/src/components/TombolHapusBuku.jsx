"use client";

import { hapusBuku } from "@/app/katalog/actions";

export default function TombolHapusBuku({ id }) {
  function konfirmasiHapus(event) {
    const yakin = window.confirm(
      "Apakah Anda yakin ingin menghapus buku ini?"
    );

    if (!yakin) {
      event.preventDefault();
    }
  }

  return (
    <form action={hapusBuku} onSubmit={konfirmasiHapus}>
      <input type="hidden" name="id" value={id} />

      <button
        type="submit"
        className="bg-red-600 hover:bg-red-500 text-white font-medium px-5 py-2.5 rounded-lg transition"
      >
        Hapus Buku
      </button>
    </form>
  );
}