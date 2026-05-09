import { Link } from "react-router-dom";
import { BRAND_NAME, BRAND_TAGLINE } from "../constants";
import { Instagram, MessageCircle, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-cream border-t border-brand-brown/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link
              to="/"
              className="text-3xl font-serif text-brand-brown mb-4 block"
            >
              {BRAND_NAME}
            </Link>
            <p className="text-brand-brown/60 max-w-sm mb-6 font-light leading-relaxed">
              {BRAND_TAGLINE}. Crafted with passion, delivered with love. Memory
              that never fades.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-brand-brown/40 hover:text-brand-sage transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-brand-brown/40 hover:text-brand-sage transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-brand-brown/40 hover:text-brand-sage transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-brand-brown mb-6">
              Quick Links
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/products"
                  className="text-sm text-brand-brown/60 hover:text-brand-brown transition-colors"
                >
                  Collection
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm text-brand-brown/60 hover:text-brand-brown transition-colors"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-brand-brown/60 hover:text-brand-brown transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-brand-brown mb-6">
              Support
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-sm text-brand-brown/60 hover:text-brand-brown transition-colors"
                >
                  Order Tracking
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-brand-brown/60 hover:text-brand-brown transition-colors"
                >
                  Shipping Info
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-brand-brown/60 hover:text-brand-brown transition-colors"
                >
                  FAQs
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-brand-brown/5 flex flex-col md:flex-row justify-between items-center text-xs text-brand-brown/40 uppercase tracking-widest">
          <p>
            © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
          </p>
          <p className="mt-4 md:mt-0">Handmade with Heart</p>
        </div>
      </div>
    </footer>
  );
}
