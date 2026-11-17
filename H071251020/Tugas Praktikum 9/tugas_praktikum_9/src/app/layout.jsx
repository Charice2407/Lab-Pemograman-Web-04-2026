import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Pustaka Senja | Ruang Baca Komunitas",
  description:
    "Katalog buku dan ruang baca komunitas Pustaka Senja dekat kampus.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col bg-slate-950 text-white">
        <Navbar />
        <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}