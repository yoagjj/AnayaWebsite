import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Product } from '../types';
import { formatPrice } from '../lib/utils';

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
        <div className="relative aspect-[3/4] overflow-hidden bg-brand-pink/20 mb-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-brown/0 group-hover:bg-brand-brown/5 transition-colors duration-500" />
        </div>
        <div className="space-y-1">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-serif text-brand-brown group-hover:text-brand-sage transition-colors duration-300">
              {product.name}
            </h3>
            <span className="text-sm font-medium text-brand-brown/80 font-sans">
              {formatPrice(product.price)}
            </span>
          </div>
          <p className="text-xs uppercase tracking-widest text-brand-brown/40">
            {product.category || 'Handmade Crochet'}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
