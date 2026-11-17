
"use server";

import pool from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function tambahBuku(formData) {
  // Mengambil data dari form
  const judul = formData.get("judul")?.trim();
  const penulis = formData.get("penulis")?.trim();
  const kategori = formData.get("kategori");
  const tahun = Number(formData.get("tahun"));
  const tersedia = formData.get("tersedia");
  const sinopsis = formData.get("sinopsis")?.trim();

  // Memeriksa kelengkapan data
  if (
    !judul ||
    !penulis ||
    !kategori ||
    !Number.isInteger(tahun) ||
    tahun <= 0 ||
    !["true", "false"].includes(tersedia) ||
    !sinopsis
  ) {
    redirect("/katalog/tambah?error=invalid");
  }

  // Menyimpan buku ke PostgreSQL
  await pool.query(
    `INSERT INTO buku
      (judul, penulis, kategori, tahun, tersedia, sinopsis)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [judul, penulis, kategori, tahun, tersedia === "true", sinopsis]
  );

  // Memperbarui halaman yang menampilkan data buku
  revalidatePath("/");
  revalidatePath("/katalog");

  // Kembali ke halaman katalog
  redirect("/katalog");
}


export async function editBuku(formData) {
  // Mengambil data dari form
  const id = Number(formData.get("id"));
  const judul = formData.get("judul")?.trim();
  const penulis = formData.get("penulis")?.trim();
  const kategori = formData.get("kategori");
  const tahun = Number(formData.get("tahun"));
  const tersedia = formData.get("tersedia");
  const sinopsis = formData.get("sinopsis")?.trim();

  console.log("Data edit diterima:", {
  id,
  judul,
  penulis,
  kategori,
  tahun,
  tersedia,
  sinopsis,
  });

  // Memeriksa kelengkapan dan validitas data
  if (
    !Number.isInteger(id) ||
    id <= 0 ||
    !judul ||
    !penulis ||
    !kategori ||
    !Number.isInteger(tahun) ||
    tahun <= 0 ||
    !["true", "false"].includes(tersedia) ||
    !sinopsis
  ) {
    redirect("/katalog");
  }

  // Memperbarui data buku di PostgreSQL
  console.log("Mulai menjalankan UPDATE...");
  const result = await pool.query(
    `UPDATE buku
     SET judul = $1,
         penulis = $2,
         kategori = $3,
         tahun = $4,
         tersedia = $5,
         sinopsis = $6
     WHERE id = $7
     RETURNING id`,
    [
      judul,
      penulis,
      kategori,
      tahun,
      tersedia === "true",
      sinopsis,
      id,
    ]
  );

  // Jika ID tidak ditemukan, kembali ke katalog
  if (result.rows.length === 0) {
    redirect("/katalog");
  }

  // Memperbarui halaman yang terdampak
  revalidatePath("/");
  revalidatePath("/katalog");
  revalidatePath(`/katalog/${id}`);
  revalidatePath(`/katalog/${id}/edit`);

  // Kembali ke halaman detail buku
  redirect(`/katalog/${id}`);
}

export async function hapusBuku(formData) {
  const id = Number(formData.get("id"));

  if (!Number.isInteger(id) || id <= 0) {
    redirect("/katalog");
  }

  await pool.query(
    "DELETE FROM buku WHERE id = $1",
    [id]
  );

  revalidatePath("/");
  revalidatePath("/katalog");

  redirect("/katalog");
}