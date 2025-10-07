import { motion } from "framer-motion";
import { MessageCircle, Phone, Mail } from "lucide-react";

export default function HubungiKami() {
  const kontak = [
    {
      id: 1,
      title: "Chat dengan Admin",
      desc: "Konsultasi gratis 24/7",
      icon: <MessageCircle size={28} />,
      color: "bg-green-100 text-green-700",
    },
    {
      id: 2,
      title: "Hubungi Kami",
      desc: "Tersedia setiap saat",
      icon: <Phone size={28} />,
      color: "bg-green-100 text-green-700",
    },
    {
      id: 3,
      title: "Email Support",
      desc: "Respon dalam 24 jam",
      icon: <Mail size={28} />,
      color: "bg-green-100 text-green-700",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-green-100">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Judul */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-green-600 font-semibold uppercase tracking-wide mb-2">
            Kontak
          </p>
          <h2 className="text-4xl font-extrabold text-gray-800 mb-3">
            Hubungi Kami
          </h2>
          <div className="w-20 h-1 bg-green-600 mx-auto rounded"></div>
          <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
            Tim <span className="font-semibold text-green-700">HISPPI PNF</span>{" "}
            siap membantu Anda untuk informasi, kerja sama, maupun dukungan
            lainnya.
          </p>
        </motion.div>

        {/* Card Kontak */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {kontak.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center hover:shadow-xl hover:-translate-y-2 transition duration-500"
            >
              <div
                className={`w-14 h-14 flex items-center justify-center rounded-full mb-4 ${item.color}`}
              >
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-green-700 mb-2 uppercase">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Tombol Aksi */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <a
            href="https://wa.me/62811722035"
            target="_blank"
            rel="noreferrer"
            className="bg-green-700 text-white px-10 py-4 rounded-lg shadow-lg hover:bg-green-800 font-semibold transition"
          >
            Chat via WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
