import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../config/api";

export default function Kemitraan() {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/partners`)
      .then((res) => res.json())
      .then((data) => setPartners(data));
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Judul Section */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-green-600 font-semibold uppercase tracking-wide mb-2">
            Kolaborasi
          </p>
          <h3 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3 relative inline-block">
            Kemitraan
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-green-600 rounded"></span>
          </h3>
          <p className="text-gray-600 text-lg mt-6 max-w-2xl mx-auto">
            HISPPI PNF menjalin kerja sama dengan berbagai lembaga dan
            organisasi untuk memperkuat peran pendidikan non formal di
            Indonesia.
          </p>
        </motion.div>

        {/* Grid Logo Mitra */}
        <div className="flex flex-wrap justify-center gap-10 items-center">
          {partners.map((p, index) => (
            <motion.a
              key={p.id}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="transform hover:scale-110 transition duration-300"
            >
              <img
                src={`${API_BASE_URL}/uploads/${p.logo}`}
                alt={p.name}
                className="h-12 md:h-20 w-auto object-contain drop-shadow-sm"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
