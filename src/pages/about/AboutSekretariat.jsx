import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AboutSekretariat() {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/info")
      .then((res) => res.json())
      .then((data) => setInfo(data))
      .catch(() => setInfo([]));
  }, []);

  const sekretariat =
    info.find((i) => i.section === "sekretariat")?.content || "-";

  const renderParagraphs = (text) => {
    if (!text || text === "-") return <p>-</p>;
    return text.split(/\r?\n/).map((p, idx) => (
      <p
        key={idx}
        className="mb-2 text-gray-700 leading-relaxed text-lg text-justify"
      >
        {p}
      </p>
    ));
  };

  return (
    <section className="pt-28 pb-20 bg-gradient-to-b from-white to-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        {/* ✅ Judul ala card hijau muda */}
        <motion.div
          className="bg-green-50 rounded-2xl shadow px-8 py-12 mb-12 relative overflow-hidden text-left"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-green-600 font-semibold uppercase tracking-wide mb-2">
            Profil Organisasi
          </p>
          <h2 className="text-4xl font-extrabold text-gray-800 mb-3">
            Sekretariat HISPPI PNF
          </h2>
          <div className="w-20 h-1 bg-green-600 rounded mb-4"></div>
          <p className="text-gray-600 text-lg max-w-3xl">
            Informasi lengkap mengenai alamat dan lokasi sekretariat{" "}
            <span className="text-green-700 font-semibold">HISPPI PNF</span>.
          </p>
        </motion.div>

        {/* ✅ Alamat Sekretariat */}
        <motion.div
          className="bg-white shadow-md rounded-xl p-8 mb-10 hover:shadow-xl transition"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {renderParagraphs(sekretariat)}
        </motion.div>

        {/* ✅ Foto Sekretariat */}
        <motion.div
          className="bg-white shadow-md rounded-xl p-6 flex justify-center hover:shadow-xl transition"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img
            src="/sekretariat.png"
            alt="Sekretariat HISPPI PNF"
            className="rounded-lg shadow max-h-[400px] object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
}
