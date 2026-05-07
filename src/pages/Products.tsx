import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Product } from "../types";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 max-w-2xl mx-auto">
          <motion.h4
            initial={{ opacity: 1, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-[0.4em] text-brand-brown/40 mb-6 font-medium"
          >
            Koleksi Anaya
          </motion.h4>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-serif text-brand-brown mb-8 leading-tight"
          >
            Dirangkai perlahan, untuk arti yang tak tergesa.
          </motion.h1>
          <motion.p
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-brand-brown/60 font-light leading-relaxed"
          >
            Setiap buket dirajut secara eksklusif dengan tangan, memastikan
            tidak ada dua rangkaian yang benar-benar sama. Persis seperti momen
            spesial Anda.
          </motion.p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="w-8 h-8 border-2 border-brand-brown/20 border-t-brand-brown rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-32">
            <p className="text-brand-brown/40 font-serif italic text-xl">
              Belum ada koleksi saat ini.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
