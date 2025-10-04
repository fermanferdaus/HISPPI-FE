import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../../config/api";

export default function AboutVisiMisi() {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/info`)
      .then((res) => res.json())
      .then((data) => setInfo(data))
      .catch(() => setInfo([]));
  }, []);

  const visi = info.find((i) => i.section === "visi")?.content || "-";
  const misi = info.find((i) => i.section === "misi")?.content || "-";

  // helper paragraf
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

  // helper list
  const renderList = (text) => {
    if (!text || text === "-") return <p>-</p>;
    const items = text.split(/\r?\n|;/).filter((i) => i.trim() !== "");
    return (
      <ul className="list-disc pl-6 space-y-3 text-gray-700 text-lg text-justify">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    );
  };

  return (
    <section className="pt-28 pb-20 bg-gradient-to-b from-white to-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        {/* ✅ Judul ala card hijau muda */}
        <motion.div
          className="bg-green-50 rounded-2xl shadow px-8 py-12 mb-12 relative overflow-hidden"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-green-600 font-semibold uppercase tracking-wide mb-2">
            Profil Organisasi
          </p>
          <h2 className="text-4xl font-extrabold text-gray-800 mb-3">
            Visi & Misi HISPPI PNF
          </h2>
          <div className="w-20 h-1 bg-green-600 rounded mb-4"></div>
          <p className="text-gray-600 text-lg max-w-3xl">
            Mengetahui arah tujuan dan landasan kerja{" "}
            <span className="text-green-700 font-semibold">HISPPI PNF</span>
            dalam mendukung pendidikan non formal di Indonesia.
          </p>
        </motion.div>

        {/* ✅ Isi: Visi */}
        <motion.div
          className="bg-white shadow-md rounded-xl p-8 hover:shadow-xl transition mb-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-green-700 mb-6 relative">
            Visi
            <span className="absolute -bottom-1 left-0 w-12 h-1 bg-green-500 rounded"></span>
          </h3>
          {renderParagraphs(visi)}
        </motion.div>

        {/* ✅ Isi: Misi */}
        <motion.div
          className="bg-white shadow-md rounded-xl p-8 hover:shadow-xl transition"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-green-700 mb-6 relative">
            Misi
            <span className="absolute -bottom-1 left-0 w-12 h-1 bg-green-500 rounded"></span>
          </h3>
          {renderList(misi)}
        </motion.div>
      </div>
    </section>
  );
}
