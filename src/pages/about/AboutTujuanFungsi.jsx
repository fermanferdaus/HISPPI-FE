import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AboutTujuanFungsi() {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/info")
      .then((res) => res.json())
      .then((data) => setInfo(data))
      .catch(() => setInfo([]));
  }, []);

  const tujuan = info.find((i) => i.section === "tujuan")?.content || "-";
  const fungsi = info.find((i) => i.section === "fungsi")?.content || "-";

  const renderList = (text) => {
    if (!text || text === "-") return <p>-</p>;
    const items = text.split(/\r?\n|;/).filter((i) => i.trim() !== "");
    return (
      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-lg leading-relaxed text-justify">
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
          className="bg-green-50 rounded-2xl shadow px-8 py-12 mb-12 relative overflow-hidden text-left"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-green-600 font-semibold uppercase tracking-wide mb-2">
            Profil Organisasi
          </p>
          <h2 className="text-4xl font-extrabold text-gray-800 mb-3">
            Tujuan & Fungsi
          </h2>
          <div className="w-20 h-1 bg-green-600 rounded mb-4"></div>
          <p className="text-gray-600 text-lg max-w-3xl">
            Memahami peran dan arah organisasi{" "}
            <span className="text-green-700 font-semibold">HISPPI PNF</span>{" "}
            melalui tujuan dan fungsi yang menjadi dasar gerakannya.
          </p>
        </motion.div>

        {/* ✅ Konten Tujuan & Fungsi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Tujuan */}
          <motion.div
            className="bg-white shadow-md rounded-xl p-8 hover:shadow-xl transition"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-green-700 mb-6 relative">
              Tujuan
              <span className="absolute -bottom-1 left-0 w-14 h-1 bg-green-500 rounded"></span>
            </h3>
            {renderList(tujuan)}
          </motion.div>

          {/* Fungsi */}
          <motion.div
            className="bg-white shadow-md rounded-xl p-8 hover:shadow-xl transition"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-green-700 mb-6 relative">
              Fungsi
              <span className="absolute -bottom-1 left-0 w-14 h-1 bg-green-500 rounded"></span>
            </h3>
            {renderList(fungsi)}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
