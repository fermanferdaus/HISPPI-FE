import { motion } from "framer-motion";

export default function AboutLagu() {
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
            Lagu HISPPI PNF
          </h2>
          <div className="w-20 h-1 bg-green-600 rounded mb-4"></div>
          <p className="text-gray-600 text-lg max-w-3xl">
            Hymne dan Mars{" "}
            <span className="text-green-700 font-semibold">HISPPI PNF</span>{" "}
            yang mencerminkan semangat perjuangan dan pengabdian para pendidik
            non formal Indonesia.
          </p>
        </motion.div>

        {/* ✅ Hymne */}
        <motion.div
          className="bg-white shadow-md rounded-xl p-8 hover:shadow-xl transition mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-green-700 mb-6 relative">
            HYMNE “INSAN MULIA”
            <span className="absolute -bottom-1 left-0 w-24 h-1 bg-green-500 rounded"></span>
          </h3>

          {/* ✅ Teks Hymne */}
          <p className="text-gray-700 text-lg mb-6 leading-relaxed italic">
            Syair lagu Hymne Insan Mulia ditampilkan di sini (atau ambil dari
            database kalau tersedia).
          </p>

          {/* ✅ Gambar Hymne */}
          <img
            src="/hymne.png"
            alt="Hymne Insan Mulia"
            className="rounded-lg shadow-md w-full md:w-2/3 mx-auto"
          />
        </motion.div>

        {/* ✅ Mars */}
        <motion.div
          className="bg-white shadow-md rounded-xl p-8 hover:shadow-xl transition"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-green-700 mb-6 relative">
            MARS “PENDIDIK CAHAYA BANGSA”
            <span className="absolute -bottom-1 left-0 w-32 h-1 bg-green-500 rounded"></span>
          </h3>

          {/* ✅ Teks Mars */}
          <p className="text-gray-700 text-lg mb-6 leading-relaxed italic">
            Syair lagu Mars Pendidik Cahaya Bangsa ditampilkan di sini (atau
            ambil dari database kalau tersedia).
          </p>

          {/* ✅ Gambar Mars */}
          <img
            src="/mars.png"
            alt="Mars Pendidik Cahaya Bangsa"
            className="rounded-lg shadow-md w-full md:w-2/3 mx-auto"
          />
        </motion.div>
      </div>
    </section>
  );
}
