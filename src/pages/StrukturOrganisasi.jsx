import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../config/api";

export default function PengurusDPP() {
  const [pengurus, setPengurus] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/struktur`)
      .then((res) => res.json())
      .then((data) => {
        // Simpan semua data
        setPengurus(data);
      })
      .catch(() => setPengurus([]));
  }, []);

  // 🔹 Kelompokkan berdasarkan jabatan
  const ketua = pengurus.filter((p) => /ketua/i.test(p.jabatan) && !/wakil/i.test(p.jabatan));
  const wakil = pengurus.filter((p) => /wakil ketua/i.test(p.jabatan));
  const sekretaris = pengurus.filter((p) => /sekretaris/i.test(p.jabatan));
  const bendahara = pengurus.filter((p) => /bendahara/i.test(p.jabatan));
  const bidang = pengurus.filter(
    (p) =>
      !/ketua/i.test(p.jabatan) &&
      !/sekretaris/i.test(p.jabatan) &&
      !/bendahara/i.test(p.jabatan)
  );

  // 🔸 Komponen kartu
  const Card = ({ data }) => (
    <motion.div
      className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col items-center text-center border border-green-100 w-full max-w-[260px]"
      whileHover={{ scale: 1.03 }}
    >
      <div className="w-full h-64 bg-gray-50 overflow-hidden flex justify-center items-center">
        <img
          src={`${API_BASE_URL}/uploads/${data.foto}`}
          alt={data.nama}
          className="w-full h-full object-cover object-top"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-800 text-lg uppercase">{data.nama}</h3>
        <p className="text-green-700 font-medium text-sm">{data.jabatan}</p>
        {data.periode && (
          <p className="text-gray-600 text-xs mt-1">Periode {data.periode}</p>
        )}
      </div>
    </motion.div>
  );

  return (
    <section className="pt-28 pb-20 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="bg-green-50 border border-green-100 rounded-2xl px-8 py-10 text-left shadow-sm mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-green-700 font-semibold uppercase tracking-wide mb-2">
            Struktur Pusat
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            Pengurus DPP HISPPI PNF
          </h2>
          <div className="w-24 h-1 bg-green-600 rounded mb-6"></div>
          <p className="text-gray-700 text-lg max-w-3xl leading-relaxed">
            Susunan kepengurusan{" "}
            <span className="text-green-700 font-semibold">
              Dewan Pengurus Pusat HISPPI PNF
            </span>{" "}
            yang berperan penting dalam membangun dan mengembangkan organisasi
            di tingkat nasional.
          </p>
        </motion.div>

        {/* 🔹 Ketua & Wakil Ketua */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {[...ketua, ...wakil].map((p, i) => (
            <Card key={i} data={p} />
          ))}
        </div>

        {/* 🔹 Sekretaris & Bendahara */}
        {(sekretaris.length > 0 || bendahara.length > 0) && (
          <>
            <div className="h-8 w-1 bg-green-500 mx-auto mb-10"></div>
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              {[...sekretaris, ...bendahara].map((p, i) => (
                <Card key={i} data={p} />
              ))}
            </div>
          </>
        )}

        {/* 🔹 Garis pemisah */}
        <div className="h-8 w-1 bg-green-500 mx-auto mb-10"></div>

        {/* 🔹 Bidang-bidang */}
        {bidang.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center">
            {bidang.map((p, i) => (
              <Card key={i} data={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
