import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { formatDate } from "../utils/formatDate";
import { Search } from "lucide-react";
import { API_BASE_URL } from "../config/api";

export default function News() {
  const [news, setNews] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/news`)
      .then((res) => res.json())
      .then((data) => setNews(data));
  }, []);

  const filteredNews = news.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.content.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="pt-30 bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="max-w-6xl mx-auto px-6 mb-12"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-green-50 rounded-2xl shadow-lg px-8 py-12 md:flex md:items-center md:justify-between relative overflow-hidden">
          <div>
            <p className="text-green-700 font-semibold tracking-wide uppercase mb-2">
              Sorotan Kegiatan
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight mb-4 relative inline-block">
              Warta & Informasi HISPPI PNF
              <span className="absolute -bottom-2 left-0 w-20 h-1 bg-green-600 rounded"></span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl">
              Dokumentasi berita, pengumuman, serta kegiatan terbaru dari HISPPI
              PNF. Ikuti perkembangan terbaru seputar pendidikan non formal di
              Indonesia.
            </p>
          </div>

          {/* Search */}
          <div className="mt-8 md:mt-0 relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <motion.input
              type="text"
              placeholder="Cari berita atau isu..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full md:w-96 pl-10 pr-5 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none shadow-sm"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            />
          </div>

          {/* Background Dekorasi */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-200 rounded-full opacity-40 blur-2xl"></div>
          <div className="absolute -bottom-12 -left-12 w-52 h-52 bg-green-100 rounded-full opacity-30 blur-3xl"></div>
        </div>
      </motion.section>

      {/* Daftar Berita */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredNews.map((item, index) => (
              <motion.div
                key={item.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden transition group flex flex-col"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Gambar */}
                {item.image && (
                  <div className="relative overflow-hidden">
                    <img
                      src={`${API_BASE_URL}/uploads/${item.image}`}
                      alt={item.title}
                      className="h-52 w-full object-cover transform group-hover:scale-105 transition duration-500"
                    />
                    {item.category && (
                      <span className="absolute top-3 left-3 bg-green-700 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                        {item.category}
                      </span>
                    )}
                  </div>
                )}

                {/* Isi */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-bold text-xl text-green-700 mb-2 line-clamp-2 group-hover:text-green-900 transition uppercase">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 text-sm flex-grow line-clamp-3 leading-relaxed">
                    {item.content}
                  </p>

                  {/* Metadata */}
                  <div className="mt-4 text-xs text-gray-500 flex items-center gap-2">
                    <span>{formatDate(item.created_at)}</span>
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    <span>{item.author_name || "Admin"}</span>
                  </div>

                  {/* Button */}
                  <a
                    href={`/news/${item.id}`}
                    className="mt-5 inline-block text-green-700 font-semibold hover:text-green-900 transition"
                  >
                    Baca Selengkapnya →
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">
            Tidak ada berita yang ditemukan.
          </p>
        )}
      </div>
    </div>
  );
}
