import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_FILE = path.join(__dirname, "database.json");

// Ensure database file exists
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({ products: [] }, null, 2));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.get("/api/products", (req, res) => {
    try {
      const data = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
      res.json(data.products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", (req, res) => {
    try {
      const data = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
      const product = data.products.find((p: any) => p.id === req.params.id);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  app.post("/api/products", (req, res) => {
    try {
      const data = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
      const newProduct = {
        ...req.body,
        id: Date.now().toString(),
      };
      data.products.push(newProduct);
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: "Failed to add product" });
    }
  });

  app.put("/api/products/:id", (req, res) => {
    try {
      const data = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
      const index = data.products.findIndex((p: any) => p.id === req.params.id);
      if (index !== -1) {
        data.products[index] = { ...data.products[index], ...req.body };
        fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
        res.json(data.products[index]);
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to update product" });
    }
  });

  app.delete("/api/products/:id", (req, res) => {
    try {
      const data = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
      data.products = data.products.filter((p: any) => p.id !== req.params.id);
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
      res.json({ message: "Product deleted" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
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
    app.use("/asset", express.static(path.join(__dirname, "asset")));
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
