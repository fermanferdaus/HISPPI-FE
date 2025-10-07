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

  const renderSekjen = (sekjen) => {
    if (!sekjen) return "-";
    const items = sekjen
      .split(/(?=\d+\.\s)/)
      .map((s) => s.trim())
      .filter(Boolean);

    if (items.length > 1) {
      return (
        <ul className="space-y-1">
          {items.map((item, idx) => (
            <li key={idx} className="text-gray-700 leading-relaxed">
              {item.replace(/^\d+\.\s*/, "")}
            </li>
          ))}
        </ul>
      );
    }
    return <span className="text-gray-700 leading-relaxed">{sekjen}</span>;
  };

  return (
    <section className="pt-28 pb-20 bg-gradient-to-b from-white to-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        {/* ✅ Header */}
        <motion.div
          className="bg-green-50 rounded-2xl shadow px-8 py-12 mb-12 text-left"
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

        {/* ✅ Tabel Minimalist */}
        <motion.div
          className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100 hover:shadow-md transition"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left border-b border-gray-100 text-gray-600 text-sm uppercase tracking-wide">
                  <th className="py-3 px-4 w-12 font-semibold">No</th>
                  <th className="py-3 px-4 font-semibold">Periode</th>
                  <th className="py-3 px-4 font-semibold">Ketua Umum</th>
                  <th className="py-3 px-4 font-semibold">
                    Sekretaris Jenderal
                  </th>
                </tr>
              </thead>
              <tbody>
                {pengurus.length > 0 ? (
                  pengurus.map((row, index) => (
                    <tr
                      key={row.id}
                      className="hover:bg-green-50 transition cursor-default"
                    >
                      <td className="py-3 px-4 text-gray-700">{index + 1}</td>
                      <td className="py-3 px-4 text-gray-800 font-medium">
                        {row.periode}
                      </td>
                      <td className="py-3 px-4 text-gray-800">
                        {row.ketua_umum}
                      </td>
                      <td className="py-3 px-4">{renderSekjen(row.sekjen)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center py-6 text-gray-500 italic"
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
