import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import { API_BASE_URL } from "../config/api";

export default function Berita() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/news`)
      .then((res) => res.json())
      .then((data) => setNews(data.slice(0, 6)))
      .catch(() => setNews([]));
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Judul */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-green-600 font-semibold uppercase tracking-wide mb-2">
            Sorotan Terbaru
          </p>
          <h2 className="text-4xl font-extrabold text-gray-800 mb-3">
            Warta & Informasi
          </h2>
          <div className="w-20 h-1 bg-green-600 mx-auto rounded"></div>
          <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
            Ikuti berita terbaru, kegiatan, serta pengumuman penting dari{" "}
            <span className="font-semibold text-green-700">HISPPI PNF</span>.
          </p>
        </motion.div>

        {/* List Berita */}
        {news.length > 0 ? (
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop={news.length > 3}
          >
            {news.map((item, index) => (
              <SwiperSlide key={item.id}>
                <motion.div
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition duration-500 h-full flex flex-col group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                >
                  {/* Gambar */}
                  {item.image && (
                    <div className="relative overflow-hidden">
                      <img
                        src={`${API_BASE_URL}/uploads/${item.image}`}
                        alt={item.title}
                        className="h-52 w-full object-cover transform group-hover:scale-110 transition duration-500"
                      />
                      {item.category && (
                        <span className="absolute top-3 left-3 bg-green-700 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                          {item.category}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Isi Berita */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-bold text-xl text-green-700 mb-2 line-clamp-2 uppercase group-hover:text-green-900 transition">
                      {item.title}
                    </h3>

                    <p className="text-gray-600 text-sm flex-grow line-clamp-3 leading-relaxed">
                      {item.content}
                    </p>

                    {/* Metadata */}
                    <div className="mt-4 text-xs text-gray-500 flex justify-between">
                      <span>
                        {new Date(item.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                      <span>{item.author_name || "Admin"}</span>
                    </div>

                    {/* Lihat Selengkapnya */}
                    <a
                      href={`/news/${item.id}`}
                      className="mt-4 inline-block text-green-700 font-semibold hover:text-green-900 transition text-sm"
                    >
                      Lihat Selengkapnya →
                    </a>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center text-gray-500 text-lg">
            Belum ada berita yang tersedia.
          </p>
        )}

        {/* Button Lihat Semua */}
        {news.length > 0 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <a
              href="/news"
              className="bg-green-700 text-white px-10 py-4 rounded-lg shadow-lg hover:bg-green-800 font-semibold transition"
            >
              Lihat Semua Berita
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
