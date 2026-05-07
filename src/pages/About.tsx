import { motion } from "motion/react";
import { BRAND_NAME } from "../constants";

export default function About() {
  return (
    <div className="pt-40 pb-24 px-6 bg-brand-cream overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-32"
        >
          <h4 className="text-xs uppercase tracking-[0.5em] text-brand-brown/30 mb-8 font-medium">
            Filosofi Kami
          </h4>
          <h1 className="text-6xl md:text-7xl font-serif text-brand-brown leading-tight mb-12">
            Kasih yang Terajut, <br />
            <span className="italic text-brand-sage">Abadi Dalam Simpul.</span>
          </h1>
          <div className="w-px h-24 bg-brand-brown/10 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center mb-40">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h3 className="text-2xl font-serif text-brand-brown mb-6">
              Sebuah Hadiah Kecil, Makna Besar.
            </h3>
            <p className="text-brand-brown/70 leading-relaxed font-light mb-6">
              {BRAND_NAME} lahir dari sebuah keyakinan sederhana: bahwa hadiah
              terbaik bukan diukur dari harganya, melainkan dari waktu dan rasa
              yang dituangkan ke dalamnya.
            </p>
            <p className="text-brand-brown/70 leading-relaxed font-light">
              Setiap bunga crochet kami adalah hasil dari jam-jam penuh
              kesabaran. Kami mengambil helai benang katun terbaik, merajutnya
              dengan doa, untuk menciptakan sesuatu yang tidak akan pernah
              layu—seperti kasih sayang Anda kepada mereka yang Anda cintai.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="aspect-[4/5] bg-brand-pink/10 overflow-hidden rounded-full p-4"
          >
            <img
              src="asset/foto2.jpeg"
              alt="Crochet Crafting"
              className="w-full h-full object-cover rounded-full"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="bg-brand-brown p-16 md:p-24 rounded-[4rem] text-center text-white"
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-8 max-w-2xl mx-auto">
            Kami tidak sekedar menjual buket bunga.
          </h2>
          <p className="text-brand-pink/80 font-serif italic text-2xl mb-12">
            Kami menjual janji akan kehadiran yang abadi.
          </p>
          <p className="text-white/60 font-light leading-relaxed max-w-xl mx-auto text-sm uppercase tracking-widest">
            Karena setiap momen spesial layak mendapatkan kenangan yang tak
            terhapus oleh waktu.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
