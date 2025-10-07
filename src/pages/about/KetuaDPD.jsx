import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE_URL } from "../../config/api";

export default function KetuaDPD() {
  const [dpdList, setDpdList] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/dpd`)
      .then((res) => res.json())
      .then((data) => setDpdList(data))
      .catch(() => setDpdList([]));
  }, []);

  return (
    <section className="pt-28 pb-20 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Judul Section */}
        <motion.div
          className="bg-green-50 border border-green-100 rounded-2xl px-8 py-10 text-left shadow-sm mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-green-700 font-semibold uppercase tracking-wide mb-2">
            Struktur Wilayah
          </p>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            Ketua DPD HISPPI PNF
          </h2>

          <div className="w-24 h-1 bg-green-600 rounded mb-6"></div>

          <p className="text-gray-700 text-lg max-w-3xl leading-relaxed">
            Mengenal para Ketua Dewan Pengurus Daerah{" "}
            <span className="text-green-700 font-semibold">HISPPI PNF</span>{" "}
            yang berperan penting dalam memperkuat jaringan pendidikan non
            formal di seluruh provinsi Indonesia.
          </p>
        </motion.div>

        {/* Grid Ketua DPD */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 place-items-center md:place-items-stretch">
          {dpdList.map((item, i) => (
            <motion.div
              key={i}
              onClick={() => setSelected(item)}
              className="cursor-pointer bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full w-full max-w-[280px] sm:max-w-none"
              whileHover={{ scale: 1.02 }}
            >
              {/* Foto */}
              <div className="h-72 sm:h-80 bg-gray-50 overflow-hidden flex items-center justify-center">
                <img
                  src={`${API_BASE_URL}/uploads/${item.foto}`}
                  alt={item.nama}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Informasi */}
              <div className="flex-1 flex flex-col justify-between bg-white p-5 text-center">
                <div>
                  {/* 🏷️ Provinsi Langsung di Bawah Jabatan */}
                  <div className="mb-3">
                    <span className="inline-block bg-green-700 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                      {item.provinsi}
                    </span>
                  </div>

                  {/* 👤 Nama Ketua */}
                  <h3 className="font-bold text-lg text-gray-800 leading-snug uppercase">
                    {item.nama}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal Detail */}
        <AnimatePresence>
          {selected && (
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-2xl shadow-xl max-w-2xl w-full overflow-hidden relative border border-gray-100"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {/* Tombol Tutup */}
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-5 text-gray-500 hover:text-green-700 text-2xl font-semibold"
                >
                  ×
                </button>

                {/* Isi Modal */}
                <div className="flex flex-col md:flex-row items-center gap-8 p-8">
                  {/* Foto Ketua */}
                  <div className="flex-shrink-0 w-full md:w-1/3 flex justify-center">
                    <div className="w-full max-w-[250px] rounded-xl overflow-hidden bg-gray-50 border border-gray-200 shadow-sm">
                      <img
                        src={`${API_BASE_URL}/uploads/${selected.foto}`}
                        alt={selected.nama}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>

                  {/* Detail Info */}
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-gray-800 uppercase mb-3">
                      {selected.nama}
                    </h3>

                    <div className="space-y-2 text-gray-700 text-sm leading-relaxed">
                      <p>
                        <span className="font-semibold text-gray-800">
                          Provinsi:
                        </span>{" "}
                        {selected.provinsi || "-"}
                      </p>
                      <p>
                        <span className="font-semibold text-gray-800">
                          Alamat Sekretariat:
                        </span>{" "}
                        {selected.alamat_sekretariat || "-"}
                      </p>
                      <p>
                        <span className="font-semibold text-gray-800">
                          Nomor Kontak:
                        </span>{" "}
                        {selected.nomor || "-"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-100 px-8 py-4 flex justify-end">
                  <button
                    onClick={() => setSelected(null)}
                    className="text-green-700 font-medium hover:underline text-sm"
                  >
                    Tutup
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
