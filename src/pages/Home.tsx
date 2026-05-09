import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { BRAND_NAME, BRAND_TAGLINE, BRAND_SUBTEXT } from "../constants";
import ProductCard from "../components/ProductCard";
import { Product } from "../types";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.1]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.slice(0, 3)));
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-brand-brown">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 z-0"
        >
          <img
            src="asset/foto0.jpeg"
            alt="Anaya Hero"
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 cinematic-overlay" />
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-7xl md:text-9xl font-serif text-white mb-6 tracking-tighter"
          >
            {BRAND_NAME}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            className="text-xl md:text-2xl text-brand-pink font-serif italic mb-4"
          >
            {BRAND_TAGLINE}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 1.5, delay: 0.6 }}
            className="text-white/70 tracking-[0.2em] uppercase text-xs md:text-sm mb-12"
          >
            {BRAND_SUBTEXT}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <Link
              to="/products"
              className="inline-flex items-center space-x-3 bg-white text-brand-brown px-10 py-5 rounded-full text-sm uppercase tracking-widest hover:bg-brand-pink transition-all duration-500 group"
            >
              <span>Lihat Koleksi</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        >
          <div className="w-[1px] h-12 bg-white/30 mx-auto" />
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 space-y-6 md:space-y-0">
            <div className="max-w-xl">
              <h4 className="text-xs uppercase tracking-[0.3em] font-medium text-brand-brown/40 mb-4 font-sans">
                Curated Selection
              </h4>
              <h2 className="text-4xl md:text-5xl font-serif text-brand-brown leading-tight">
                Dibuat dengan hati, untuk mereka yang berarti.
              </h2>
            </div>
            <Link
              to="/products"
              className="text-brand-brown hover:text-brand-sage transition-colors border-b border-brand-brown/20 pb-1 text-sm uppercase tracking-widest"
            >
              Semua Produk
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Story section */}
      <section className="bg-brand-brown py-32 px-6 relative overflow-hidden">
        {/* Decorative element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-pink/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h3 className="text-brand-pink text-xs uppercase tracking-[0.4em] mb-10 font-sans font-medium">
              Bukan Sekedar Bunga
            </h3>
            <p className="text-3xl md:text-5xl font-serif text-white leading-relaxed mb-12">
              Bunga akan layu, tapi yang dirajut dengan niat dan rasa akan
              tinggal lebih lama.
              <span className="text-brand-pink block mt-6">Itulah Anaya.</span>
            </p>
            <Link
              to="/about"
              className="inline-block border border-white/20 hover:border-white text-white px-10 py-5 rounded-full text-xs uppercase tracking-[0.2em] transition-all duration-500"
            >
              Kenali Kami Lebih Dekat
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 text-center bg-brand-cream">
        <div className="max-w-3xl mx-auto border border-brand-brown/10 p-16 md:p-24 rounded-[3rem]">
          <h2 className="text-4xl md:text-5xl font-serif text-brand-brown mb-8 leading-tight">
            Ingin membuat momen mereka lebih berkesan?
          </h2>
          <p className="text-brand-brown/60 mb-12 font-light leading-relaxed max-w-lg mx-auto">
            Kami siap membantu Anda memilih rangkaian bunga yang paling mewakili
            rasa Anda.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-brand-brown text-white px-12 py-5 rounded-full text-sm uppercase tracking-widest hover:bg-brand-sage transition-all duration-500 shadow-xl shadow-brand-brown/10"
          >
            Tanya Lewat WhatsApp
          </Link>
        </div>
      </section>
    </div>
  );
}
