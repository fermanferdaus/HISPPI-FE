import { useEffect, useState } from "react";
import { Pencil, CheckCircle2, AlertTriangle, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE_URL } from "../../config/api";

export default function InfoAdmin() {
  const [info, setInfo] = useState({});
  const [editing, setEditing] = useState(null);
  const [content, setContent] = useState("");
  const [alert, setAlert] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  // 🔹 Fetch data info
  const fetchInfo = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/info`);
      const data = await res.json();
      const mapped = {};
      data.forEach((i) => (mapped[i.section] = i.content));
      setInfo(mapped);
    } catch (err) {
      console.error("Gagal memuat data info:", err);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  // 🔹 Simpan perubahan
  const handleSave = async (section) => {
    try {
      const res = await fetch(`${API_BASE_URL}/info/${section}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });

      if (res.ok) {
        showAlert("success", `Bagian "${section}" berhasil diperbarui.`);
        fetchInfo();
        setEditing(null);
      } else {
        showAlert("error", "Gagal memperbarui informasi.");
      }
    } catch {
      showAlert("error", "Terjadi kesalahan server.");
    }
  };

  // 🔹 Notifikasi alert
  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 3000);
  };

  // 🔹 Mode edit
  const startEdit = (section, currentContent) => {
    setEditing(section);
    setContent(currentContent);
  };

  const cancelEdit = () => {
    setEditing(null);
    setContent("");
  };

  // 🔹 Komponen kartu info
  const renderCard = (section, title) => (
    <motion.div
      key={section}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
    >
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-3 border-b border-gray-200 bg-gray-50 rounded-t-xl">
        <h2 className="text-lg font-semibold text-gray-800 capitalize">
          {title}
        </h2>

        {editing === section ? (
          <div className="flex gap-2">
            <button
              onClick={() => handleSave(section)}
              className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-all"
            >
              Simpan
            </button>
            <button
              onClick={cancelEdit}
              className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1.5 rounded-md text-xs font-medium transition-all"
            >
              Batal
            </button>
          </div>
        ) : (
          <button
            onClick={() => startEdit(section, info[section] || "")}
            className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-all"
          >
            <Pencil size={14} /> Edit
          </button>
        )}
      </div>

      {/* Konten */}
      <div className="p-5">
        {editing === section ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-200 rounded-lg p-3 h-56 resize-none focus:ring-2 focus:ring-green-500 focus:outline-none text-gray-700 bg-gray-50 shadow-inner transition"
            placeholder={`Tulis ${title.toLowerCase()} di sini...`}
          />
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-gray-700 leading-relaxed min-h-[140px] whitespace-pre-line">
            {info[section] || `Belum ada data ${title.toLowerCase()}.`}
          </div>
        )}
      </div>
    </motion.div>
  );

  // 🔹 Filter pencarian
  const sections = [
    { key: "sejarah", title: "Sejarah" },
    { key: "visi", title: "Visi" },
    { key: "misi", title: "Misi" },
    { key: "tujuan", title: "Tujuan" },
    { key: "fungsi", title: "Fungsi" },
    { key: "proker_pendek", title: "Program Kerja Jangka Pendek" },
    { key: "proker_panjang", title: "Program Kerja Jangka Panjang" },
  ];

  const filteredSections = sections.filter((s) =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-3">
        <div>
          <h1 className="text-3xl font-bold text-green-700">
            Informasi Institusi
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Kelola sejarah, visi, misi, tujuan, fungsi, dan program kerja
            organisasi.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative w-full md:w-64">
          <Search size={16} className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Cari bagian..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none text-sm"
          />
        </div>
      </div>

      {/* Alert */}
      <AnimatePresence>
        {alert && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className={`mb-6 flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium shadow-sm border transition-all duration-300 ${
              alert.type === "success"
                ? "bg-green-50 border-green-400 text-green-700"
                : "bg-red-50 border-red-400 text-red-700"
            }`}
          >
            {alert.type === "success" ? (
              <CheckCircle2 size={18} />
            ) : (
              <AlertTriangle size={18} />
            )}
            <span>{alert.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid Layout */}
      {filteredSections.length === 0 ? (
        <p className="text-gray-500 text-center italic py-8">
          Tidak ada hasil untuk "{searchTerm}"
        </p>
      ) : (
        <div className="space-y-8">
          {filteredSections.map((s) => {
            if (["visi", "misi"].includes(s.key))
              return (
                <div key={s.key} className="grid md:grid-cols-2 gap-8">
                  {renderCard("visi", "Visi")}
                  {renderCard("misi", "Misi")}
                </div>
              );
            if (["tujuan", "fungsi"].includes(s.key))
              return (
                <div key={s.key} className="grid md:grid-cols-2 gap-8">
                  {renderCard("tujuan", "Tujuan")}
                  {renderCard("fungsi", "Fungsi")}
                </div>
              );
            if (["proker_pendek", "proker_panjang"].includes(s.key))
              return (
                <div key={s.key} className="grid md:grid-cols-2 gap-8">
                  {renderCard("proker_pendek", "Program Kerja Jangka Pendek")}
                  {renderCard("proker_panjang", "Program Kerja Jangka Panjang")}
                </div>
              );
            return renderCard(s.key, s.title);
          })}
        </div>
      )}
    </div>
  );
}
