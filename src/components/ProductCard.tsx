import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Product } from "../types";
import { formatPrice } from "../lib/utils";

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group"
    >
      <Link to={`/products/${product.id}`} className="block">
        {/* Gambar */}
        <div className="relative aspect-[3/4] overflow-hidden bg-brand-pink/20 mb-4 rounded-sm">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-brown/0 group-hover:bg-brand-brown/5 transition-colors duration-500" />

          {/* Badge kategori */}
          {product.category && (
            <span className="absolute top-3 left-3 bg-brand-brown text-white text-[9px] uppercase tracking-[0.15em] px-2 py-1">
              {product.category}
            </span>
          )}
        </div>

        {/* Info produk */}
        {/* Info produk */}
        <div className="mt-3 space-y-[3px]">
          <p className="text-sm font-bold text-brand-brown font-sans">
            {formatPrice(product.price)}
          </p>
          <h3 className="text-sm font-normal text-brand-brown leading-snug group-hover:text-brand-sage transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-xs text-brand-brown/40 font-light">
            {product.category || "Handmade Crochet"}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
