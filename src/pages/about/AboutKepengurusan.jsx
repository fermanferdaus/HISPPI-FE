import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../../config/api";

export default function AboutKepengurusan() {
  const [pengurus, setPengurus] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/kepengurusan`)
      .then((res) => res.json())
      .then((data) => setPengurus(data))
      .catch(() => setPengurus([]));
  }, []);

  // ✅ helper untuk pecah menjadi list jika ada lebih dari satu sekretaris
  const renderSekjen = (sekjen) => {
    if (!sekjen) return "-";

    // cek apakah ada pola angka 1. 2. 3. dst
    const items = sekjen
      .split(/(?=\d+\.\s)/)
      .map((s) => s.trim())
      .filter(Boolean);

    if (items.length > 1) {
      return (
        <ol className="list-decimal list-inside space-y-1">
          {items.map((item, idx) => (
            <li
              key={idx}
              className="text-gray-900 leading-relaxed" // ✅ konsisten warna & style
            >
              {item.replace(/^\d+\.\s*/, "")}
            </li>
          ))}
        </ol>
      );
    }

    return <span className="text-gray-900 leading-relaxed">{sekjen}</span>;
  };

  return (
    <section className="pt-28 pb-20 bg-gradient-to-b from-white to-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
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
            Sejarah Kepengurusan
          </h2>
          <div className="w-20 h-1 bg-green-600 rounded mb-4"></div>
          <p className="text-gray-600 text-lg max-w-3xl">
            Perjalanan kepengurusan{" "}
            <span className="font-semibold text-green-700">HISPPI PNF</span>{" "}
            dari masa ke masa.
          </p>
        </motion.div>

        {/* ✅ Tabel Kepengurusan */}
        <motion.div
          className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-green-700 text-white">
                <tr>
                  <th className="px-4 py-3 text-left w-12">No</th>
                  <th className="px-4 py-3 text-left">Periode</th>
                  <th className="px-4 py-3 text-left">Ketua Umum</th>
                  <th className="px-4 py-3 text-left">Sekretaris Jenderal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pengurus.length > 0 ? (
                  pengurus.map((row, index) => (
                    <tr key={row.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3 font-semibold text-gray-700">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3">{row.periode}</td>
                      <td className="px-4 py-3">{row.ketua_umum}</td>
                      <td className="px-4 py-3">{renderSekjen(row.sekjen)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-4 py-6 text-center text-gray-500"
                    >
                      Belum ada data kepengurusan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
