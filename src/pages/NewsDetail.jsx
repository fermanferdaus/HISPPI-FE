import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { formatDate } from "../utils/formatDate";
import { API_BASE_URL } from "../config/api";

export default function NewsDetail() {
  const { id } = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/news/${id}`)
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch(() => setNews(null));
  }, [id]);

  if (!news) {
    return (
      <div className="pt-28 text-center text-gray-500">
        Berita tidak ditemukan.
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        {/* Kategori */}
        <motion.p
          className="text-green-700 font-semibold uppercase text-sm tracking-wide mb-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {news.category || "Berita"}
        </motion.p>

        {/* Judul */}
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-snug mb-4 uppercase"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {news.title}
        </motion.h1>

        {/* Metadata */}
        <motion.div
          className="flex items-center gap-4 text-sm text-gray-500 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span>{formatDate(news.created_at, true)}</span>
          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
          <span>{news.author_name || "Admin"}</span>
        </motion.div>

        {/* Gambar */}
        {news.image && (
          <motion.div
            className="mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={`${API_BASE_URL}/uploads/${news.image}`}
              alt={news.title}
              className="w-full max-h-[500px] object-cover rounded-lg shadow"
            />
          </motion.div>
        )}

        {/* Isi Berita */}
        <motion.div
          className="prose max-w-none text-gray-700 text-justify leading-relaxed text-lg md:text-l"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          dangerouslySetInnerHTML={{
            __html: news.content
              .split("\n")
              .map((p) => (p.trim() ? `<p class='mb-6'>${p}</p>` : ""))
              .join(""),
          }}
        ></motion.div>
      </div>
    </div>
  );
}
