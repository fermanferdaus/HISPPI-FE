import { motion } from "framer-motion";

export default function AboutLogo() {
  const keterangan = [
    {
      title: "Mata Pena",
      desc: "Berisi tegak dengan ujung mengarah ke atas terdiri dari arsiran, yang mempunyai arti bahwa HISPPI PNF terdiri dari berbagai jenis pendidikan.",
    },
    {
      title: "Gelang",
      desc: "Bertuliskan HISPPI PNF merupakan suatu pengikat jenis-jenis pendidikan dalam suatu wadah kesatuan yang tunggal.",
    },
    {
      title: "Sayap",
      desc: "Merupakan lambang sarana pendukung pendidikan menuju tujuan dan cita-citanya, serta mempunyai unsur Departemen Pendidikan yang bersifat Pembina dan membimbing himpunan ini, serta fungsi kerjasamanya dalam dunia pendidikan dan bersifat 'Tut Wuri Handayani'.",
    },
    {
      title: "Buku",
      desc: "Melambangkan seluruh pendidik yang selalu berusaha menimba ilmu dari buku-buku dan pengalaman.",
    },
    {
      title: "Setangkai Kipas",
      desc: "Sebelah kanan berbung 8 kuntum dan daunnya berjumlah 17 helai, melambangkan Proklamasi 17 Agustus.",
    },
    {
      title: "Setangkai Padi",
      desc: "Sebelah kiri berbuah 45 butir melambangkan kesejahteraan yang adil dan merata yang dijiwai semangat proklamasi empat lima.",
    },
    {
      title: "Bingkai Segi Lima",
      desc: "Berarti pendidikan selalu dijiwai oleh sila-sila dalam Pancasila.",
    },
    {
      title: "Warna Lambang",
      desc: "Pari Enom (hijau padi muda) yang berarti kesuburan kemakmuran, kebahagiaan, keteguhan, kerukunan, dan keagungan.",
    },
    {
      title: "Pelita",
      desc: "Melambangkan cahaya terang bagi HISPPI PNF dalam Pendidikan Non Formal.",
    },
  ];

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
            Logo HISPPI PNF
          </h2>
          <div className="w-20 h-1 bg-green-600 rounded mb-4"></div>
          <p className="text-gray-600 text-lg max-w-3xl">
            Logo{" "}
            <span className="text-green-700 font-semibold">HISPPI PNF</span>{" "}
            memiliki filosofi dan makna yang mendalam dalam mencerminkan visi,
            misi, serta semangat organisasi.
          </p>
        </motion.div>

        {/* ✅ Logo di Tengah */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="/logo.png"
            alt="Logo HISPPI PNF"
            className="w-72 h-72 object-contain drop-shadow-lg"
          />
        </motion.div>

        {/* ✅ Keterangan Logo */}
        <motion.div
          className="bg-white shadow-md rounded-xl p-8 hover:shadow-xl transition"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-green-700 mb-6 relative">
            Makna Logo
            <span className="absolute -bottom-1 left-0 w-20 h-1 bg-green-500 rounded"></span>
          </h3>
          <div className="space-y-6">
            {keterangan.map((item, idx) => (
              <div key={idx}>
                <p className="font-semibold text-green-700">{item.title}</p>
                <p className="text-gray-700 text-justify leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
