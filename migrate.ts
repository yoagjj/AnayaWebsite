import pool from "./db";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function migrate() {
  const client = await pool.connect();

  try {
    console.log("Membuat tabel products...");

    // Buat tabel kalau belum ada
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        price INTEGER NOT NULL,
        description TEXT,
        size TEXT,
        material TEXT,
        image TEXT,
        category TEXT
      )
    `);

    console.log("Tabel berhasil dibuat!");

    // Baca database.json
    const dbFile = path.join(__dirname, "database.json");
    const data = JSON.parse(fs.readFileSync(dbFile, "utf-8"));

    console.log(`Migrasi ${data.products.length} produk...`);

    // Insert semua produk dari database.json
    for (const product of data.products) {
      await client.query(
        `INSERT INTO products (id, name, price, description, size, material, image, category)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (id) DO NOTHING`,
        [
          product.id,
          product.name,
          product.price,
          product.description,
          product.size,
          product.material,
          product.image,
          product.category,
        ],
      );
    }

    console.log("Migrasi selesai!");
  } catch (err) {
    console.error("Error migrasi:", err);
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();
