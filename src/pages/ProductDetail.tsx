import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  MessageCircle,
  ArrowLeft,
  ShieldCheck,
  Heart,
  Sparkles,
} from "lucide-react";
import { Product } from "../types";
import { formatPrice, cn } from "../lib/utils";
import { WHATSAPP_NUMBER } from "../constants";
import ProductCard from "../components/ProductCard";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    // Fetch current product
    fetch(`/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        // Fetch related (all but current)
        return fetch("/api/products");
      })
      .then((res) => res.json())
      .then((all) => {
        setRelated(all.filter((p: Product) => p.id !== id).slice(0, 3));
        setLoading(false);
      })
      .catch(() => {
        navigate("/products");
      });
  }, [id, navigate]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-brand-cream">
        <div className="w-8 h-8 border-2 border-brand-brown/20 border-t-brand-brown rounded-full animate-spin" />
      </div>
    );

  if (!product) return null;

  const waMessage = `Halo Anaya! Saya tertarik untuk memesan buket "${product.name}" yang tercantum di website. Apakah masih bisa dipesan?`;
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="pt-24 pb-24 px-6 bg-brand-cream">
      <div className="max-w-7xl mx-auto">
        {/* Back button */}
        <Link
          to="/products"
          className="inline-flex items-center space-x-2 text-brand-brown/40 hover:text-brand-brown transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs uppercase tracking-widest font-medium">
            Kembali ke Koleksi
          </span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-32">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-[4/5] bg-brand-pink/10 overflow-hidden relative"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {product.category && (
              <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <span className="text-[10px] uppercase tracking-widest text-brand-brown font-semibold">
                  {product.category}
                </span>
              </div>
            )}
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <h1 className="text-5xl md:text-6xl font-serif text-brand-brown mb-4 leading-tight">
              {product.name}
            </h1>
            <p className="text-3xl font-serif text-brand-sage mb-8">
              {formatPrice(product.price)}
            </p>

            <div className="space-y-8 mb-12">
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-brand-brown/40 mb-3">
                  Deskripsi
                </h4>
                <p className="text-brand-brown/70 leading-relaxed font-light">
                  {product.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 py-8 border-y border-brand-brown/5">
                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-brand-brown/40 mb-3">
                    Ukuran
                  </h4>
                  <p className="text-brand-brown text-sm font-medium">
                    {product.size}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-brand-brown/40 mb-3">
                    Material
                  </h4>
                  <p className="text-brand-brown text-sm font-medium">
                    {product.material}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-brand-brown/60">
                  <ShieldCheck className="w-4 h-4 text-brand-sage" />
                  <span className="text-sm">
                    100% Handmade with high premium yarn
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-brand-brown/60">
                  <Heart className="w-4 h-4 text-brand-sage" />
                  <span className="text-sm">
                    Made to order (Pre-order process available)
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-brand-brown/60">
                  <Sparkles className="w-4 h-4 text-brand-sage" />
                  <span className="text-sm">Keepsake that lasts forever</span>
                </div>
              </div>
            </div>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-3 bg-brand-brown text-white py-6 px-10 rounded-full text-sm uppercase tracking-widest hover:bg-brand-sage transition-all duration-500 shadow-xl shadow-brand-brown/10 group"
            >
              <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Order With WhatsApp</span>
            </a>

            <p className="mt-6 text-center text-xs text-brand-brown/40 italic font-serif">
              *Tanyakan ketersediaan stok atau kustomisasi warna lewat WA
            </p>
          </motion.div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="pt-32 border-t border-brand-brown/5">
            <div className="flex justify-between items-end mb-16">
              <h2 className="text-3xl font-serif text-brand-brown">
                Produk Serupa
              </h2>
              <Link
                to="/products"
                className="text-sm uppercase tracking-widest text-brand-brown/40 hover:text-brand-brown transition-colors"
              >
                Lihat Semua
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {related.map((p, index) => (
                <ProductCard key={p.id} product={p} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
