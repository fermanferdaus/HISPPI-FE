import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AboutSejarah() {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/info")
      .then((res) => res.json())
      .then((data) => setInfo(data))
      .catch(() => setInfo([]));
  }, []);

  const sejarah = info.find((i) => i.section === "sejarah")?.content || "-";

  const renderParagraphs = (text) => {
    if (!text || text === "-") return <p>-</p>;
    return text
      .split(/\r?\n/)
      .filter((p) => p.trim() !== "")
      .map((p, idx) => (
        <p
          key={idx}
          className="mb-4 text-gray-700 leading-relaxed text-justify text-lg"
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
            Sejarah HISPPI PNF
          </h2>
          {/* garis hijau rata kiri */}
          <div className="w-20 h-1 bg-green-600 rounded mb-4"></div>

          {/* paragraf rata kiri juga */}
          <p className="text-gray-600 text-lg max-w-3xl">
            Mengetahui lebih dekat perjalanan dan sejarah berdirinya{" "}
            <span className="text-green-700 font-semibold"> HISPPI PNF </span>
            dalam mendukung pendidikan non formal di Indonesia.
          </p>
        </motion.div>

        {/* ✅ Logo Besar di Tengah */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="/logo.png"
            alt="Logo HISPPI PNF"
            className="h-56 md:h-64 object-contain drop-shadow-lg"
          />
        </motion.div>

        {/* ✅ Isi Sejarah */}
        <motion.div
          className="bg-white shadow-md rounded-xl p-8 hover:shadow-xl transition"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {renderParagraphs(sejarah)}
        </motion.div>
      </div>
    </section>
  );
}
