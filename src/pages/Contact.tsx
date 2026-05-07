import { motion } from "motion/react";
import { MessageCircle, Instagram, Mail, MapPin } from "lucide-react";
import { WHATSAPP_NUMBER } from "../constants";

export default function Contact() {
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=Halo Anaya! Saya ingin bertanya tentang produk Anda.`;

  return (
    <div className="pt-40 pb-24 px-6 bg-brand-cream">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <motion.h4
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs uppercase tracking-[0.4em] text-brand-brown/30 mb-8 font-medium"
            >
              Hubungi Kami
            </motion.h4>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-serif text-brand-brown leading-tight mb-12"
            >
              Katakan dengan <br />
              <span className="italic text-brand-sage">Simpul Kasih.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-brand-brown/60 font-light leading-relaxed mb-16 max-w-md"
            >
              Ada yang ingin Anda tanyakan? Atau ingin memesan buket impian
              dengan warna favorit? Kami dengan senang hati mendengarkan.
            </motion.p>

            <div className="space-y-12">
              <div className="flex items-start space-x-6">
                <div className="p-4 bg-brand-pink/30 rounded-full text-brand-brown">
                  <Instagram className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-semibold text-brand-brown mb-1">
                    Instagram
                  </h4>
                  <p className="text-brand-brown/60 text-sm font-light">
                    @anaya.crochet
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="p-4 bg-brand-sage/20 rounded-full text-brand-brown">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-semibold text-brand-brown mb-1">
                    Email
                  </h4>
                  <p className="text-brand-brown/60 text-sm font-light">
                    hello@anayamoments.com
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="p-4 bg-brand-brown/5 rounded-full text-brand-brown">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-semibold text-brand-brown mb-1">
                    Workshop
                  </h4>
                  <p className="text-brand-brown/60 text-sm font-light">
                    Lampung, Indonesia
                  </p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-12 md:p-16 rounded-[3rem] shadow-2xl shadow-brand-brown/5"
          >
            <h3 className="text-3xl font-serif text-brand-brown mb-12">
              Pesan Cepat
            </h3>
            <div className="space-y-8">
              <p className="text-brand-brown/60 leading-relaxed font-light text-sm">
                Kami sangat menyarankan menghubungi kami langsung melalui
                WhatsApp untuk respon yang lebih cepat mengenai ketersediaan
                stok dan kustomisasi pesanan.
              </p>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-4 bg-brand-brown text-white py-6 px-10 rounded-full text-sm uppercase tracking-widest hover:bg-brand-sage transition-all duration-500 w-full group"
              >
                <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>Chat di WhatsApp</span>
              </a>

              <div className="relative flex items-center py-6">
                <div className="flex-grow border-t border-brand-brown/10"></div>
                <span className="flex-shrink mx-4 text-xs uppercase tracking-widest text-brand-brown/20 font-medium">
                  Atau Isi Formulir
                </span>
                <div className="flex-grow border-t border-brand-brown/10"></div>
              </div>

              <div className="space-y-6">
                <input
                  type="text"
                  placeholder="Nama Lengkap"
                  className="w-full bg-brand-cream/50 border-none rounded-2xl p-5 text-sm outline-none focus:ring-1 focus:ring-brand-sage text-brand-brown"
                />
                <textarea
                  rows={4}
                  placeholder="Pesan Anda..."
                  className="w-full bg-brand-cream/50 border-none rounded-2xl p-5 text-sm outline-none focus:ring-1 focus:ring-brand-sage text-brand-brown"
                ></textarea>
                <button className="w-full py-5 rounded-full border border-brand-brown/10 text-brand-brown text-xs uppercase tracking-widest hover:bg-brand-brown hover:text-white transition-all duration-500">
                  Kirim Pesan
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
