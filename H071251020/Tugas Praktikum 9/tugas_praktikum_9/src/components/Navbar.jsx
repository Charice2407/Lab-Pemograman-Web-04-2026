"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const daftarMenu = [
  { nama: "Beranda", path: "/" },
  { nama: "Katalog", path: "/katalog" },
  { nama: "Usulan Buku", path: "/usulan" },
];

function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-slate-900/90 backdrop-blur border-b border-slate-800 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-amber-400">
          📖 Pustaka Senja
        </Link>
        <ul className="flex items-center gap-6">
          {daftarMenu.map((item) => {
            // Menu "/" harus exact match, menu lain cukup startsWith
            // agar /katalog/1 tetap menandai "Katalog" sebagai aktif.
            const isActive =
              item.path === "/"
                ? pathname === "/"
                : pathname.startsWith(item.path);

            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={
                    isActive
                      ? "text-white font-semibold border-b-2 border-amber-400 pb-1"
                      : "text-slate-400 hover:text-slate-200 transition"
                  }
                >
                  {item.nama}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;