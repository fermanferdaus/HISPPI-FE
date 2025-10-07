import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../../config/api";

export default function AboutSekretariat() {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/info`)
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
        className="mb-2 text-gray-700 leading-relaxed text-base md:text-lg text-justify"
      >
        {p}
      </p>
    ));
  };

  // 🗺️ Lokasi Sekretariat (Jakarta)
  const latitude = -6.15186431019244;
  const longitude = 106.83463889737168;

  // Google Maps dengan marker
  const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}&hl=id&z=16&output=embed`;

  return (
    <section className="pt-28 pb-20 bg-gradient-to-b from-white to-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        {/* 🟢 Header Section */}
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
            Informasi lengkap mengenai lokasi dan kontak sekretariat{" "}
            <span className="text-green-700 font-semibold">HISPPI PNF</span>.
          </p>
        </motion.div>

        {/* 🧩 Card Gabungan */}
        <motion.div
          className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 📸 Foto Sekretariat */}
          <div className="w-full">
            <img
              src="/sekretariat.png"
              alt="Sekretariat HISPPI PNF"
              className="w-full h-full object-cover border-b border-gray-200"
            />
          </div>

          {/* 🗺️ Maps dengan marker */}
          <div className="p-5 mt-10">
            <h3 className="text-2xl font-extrabold text-gray-800 mb-3">
              Google Maps
            </h3>
            <div className="w-20 h-1 bg-green-600 rounded mb-6"></div>
            <div className="w-full h-[350px] mb-6 rounded-xl overflow-hidden shadow-sm">
              <iframe
                title="Lokasi Sekretariat HISPPI PNF"
                src={mapUrl}
                width="100%"
                height="100%"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0"
              ></iframe>
            </div>

            {/* ☎️ Kontak Kami */}
            <div className="px-4 pb-8">
              <h3 className="text-2xl font-extrabold text-gray-800 mb-3">
                Kontak Kami
              </h3>
              <div className="w-20 h-1 bg-green-600 rounded mb-6"></div>

              {/* Grid 2 kolom */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Alamat */}
                <div>
                  <h4 className="text-green-700 font-semibold mb-1">
                    Alamat Sekretariat DPP
                  </h4>
                  <div className="text-gray-700 text-sm leading-relaxed">
                    {renderParagraphs(sekretariat)}
                  </div>
                </div>

                {/* Kontak */}
                <div>
                  <h4 className="text-green-700 font-semibold mb-1">Kontak</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    <span className="font-semibold">Telepon:</span> (021)
                    6299487
                    <br />
                    <span className="font-semibold">Email:</span>{" "}
                    info@hisppi.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
