import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ storage: multer.memoryStorage() });

import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import pool from "./db";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Login endpoint
  app.post("/api/login", (req, res) => {
    const { password } = req.body;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return res.status(500).json({ error: "Server belum dikonfigurasi" });
    }

    if (password === adminPassword) {
      res.json({ success: true });
    } else {
      res.status(401).json({ error: "Password salah" });
    }
  });

  // Upload gambar ke Cloudinary
  app.post("/api/upload", upload.single("image"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "Tidak ada file yang diupload" });
      }

      // Convert buffer ke base64
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;

      // Upload ke Cloudinary
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "anaya-products",
      });

      res.json({ url: result.secure_url });
    } catch (error) {
      res.status(500).json({ error: "Gagal upload gambar" });
    }
  });

  // GET semua produk
  app.get("/api/products", async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM products ORDER BY id");
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: "Gagal mengambil produk" });
    }
  });

  // GET satu produk by id
  app.get("/api/products/:id", async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM products WHERE id = $1", [
        req.params.id,
      ]);
      if (result.rows.length > 0) {
        res.json(result.rows[0]);
      } else {
        res.status(404).json({ error: "Produk tidak ditemukan" });
      }
    } catch (error) {
      res.status(500).json({ error: "Gagal mengambil produk" });
    }
  });

  // POST tambah produk baru
  app.post("/api/products", async (req, res) => {
    try {
      const { name, price, description, size, material, image, category } =
        req.body;
      const id = Date.now().toString();

      const result = await pool.query(
        `INSERT INTO products (id, name, price, description, size, material, image, category)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING *`,
        [id, name, price, description, size, material, image, category],
      );

      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Gagal menambah produk" });
    }
  });

  // PUT update produk
  app.put("/api/products/:id", async (req, res) => {
    try {
      const { name, price, description, size, material, image, category } =
        req.body;

      const result = await pool.query(
        `UPDATE products 
         SET name=$1, price=$2, description=$3, size=$4, material=$5, image=$6, category=$7
         WHERE id=$8
         RETURNING *`,
        [
          name,
          price,
          description,
          size,
          material,
          image,
          category,
          req.params.id,
        ],
      );

      if (result.rows.length > 0) {
        res.json(result.rows[0]);
      } else {
        res.status(404).json({ error: "Produk tidak ditemukan" });
      }
    } catch (error) {
      res.status(500).json({ error: "Gagal mengupdate produk" });
    }
  });

  // DELETE produk
  app.delete("/api/products/:id", async (req, res) => {
    try {
      await pool.query("DELETE FROM products WHERE id = $1", [req.params.id]);
      res.json({ message: "Produk berhasil dihapus" });
    } catch (error) {
      res.status(500).json({ error: "Gagal menghapus produk" });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    const assetPath = path.join(__dirname, "asset"); //
    app.use("/asset", express.static(assetPath)); //
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
