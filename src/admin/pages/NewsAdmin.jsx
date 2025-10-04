import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  PlusCircle,
  Pencil,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Search,
} from "lucide-react";
import { API_BASE_URL } from "../../config/api";

export default function NewsAdmin() {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // 🔹 Ambil data berita dari backend
  const fetchNews = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/news`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user"))?.token
          }`,
        },
      });
      const data = await res.json();
      setNews(data);
      setFilteredNews(data);
    } catch (err) {
      console.error("Gagal mengambil data berita:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // 🔹 Tampilkan alert setelah tambah/edit/hapus
  useEffect(() => {
    if (location.state?.alert) {
      setAlert(location.state.alert);
      window.history.replaceState({}, document.title);
      const timer = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  // 🔹 Search (filter berita)
  useEffect(() => {
    const filtered = news.filter(
      (n) =>
        n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.author_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (n.category || "").toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNews(filtered);
  }, [searchTerm, news]);

  // 🔹 Fungsi hapus berita
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const { id, title } = deleteTarget;

    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      const res = await fetch(`${API_BASE_URL}/news/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (res.ok) {
        setAlert({
          type: "success",
          message: `Berita "${title}" berhasil dihapus.`,
        });
        setNews((prev) => prev.filter((item) => item.id !== id));
      } else {
        setAlert({
          type: "error",
          message: data.message || "Gagal menghapus berita.",
        });
      }
    } catch (error) {
      console.error("Gagal hapus berita:", error);
      setAlert({
        type: "error",
        message: "Terjadi kesalahan server saat menghapus berita.",
      });
    } finally {
      setDeleteTarget(null);
      setTimeout(() => setAlert(null), 3000);
    }
  };

  if (loading)
    return (
      <p className="text-center text-gray-600 py-10">Memuat data berita...</p>
    );

  return (
    <div className="p-4 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-green-700">Kelola Berita</h1>
          <p className="text-gray-500 text-sm mt-1">
            Lihat, cari, dan kelola berita yang telah ditambahkan.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Cari berita..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none text-sm"
            />
          </div>

          {/* Tombol tambah */}
          <button
            onClick={() => navigate("add")}
            className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition text-sm shadow-sm"
          >
            <PlusCircle size={18} /> Tambah Berita
          </button>
        </div>
      </div>

      {/* Alert */}
      {alert && (
        <div
          className={`mb-6 flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium shadow-sm border transition-all duration-300 ${
            alert.type === "success"
              ? "bg-green-50 border-green-400 text-green-700"
              : "bg-red-50 border-red-400 text-red-700"
          }`}
        >
          {alert.type === "success" ? (
            <CheckCircle2 size={18} />
          ) : (
            <XCircle size={18} />
          )}
          <span>{alert.message}</span>
        </div>
      )}

      {/* Card Grid */}
      {filteredNews.length === 0 ? (
        <p className="text-center text-gray-500 italic py-10">
          Tidak ada berita ditemukan.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredNews.map((n) => (
            <div
              key={n.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden"
            >
              <img
                src={
                  n.image
                    ? `${API_BASE_URL}/uploads/${n.image}`
                    : "/no-image.jpg"
                }
                alt={n.title}
                className="h-48 w-full object-cover"
              />

              <div className="p-5 flex flex-col justify-between min-h-[180px]">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800 line-clamp-2 mb-1">
                    {n.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    {n.category || "-"} • {n.author_name}
                  </p>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {n.content.slice(0, 100)}...
                  </p>
                </div>

                <div className="flex justify-between items-center mt-4 border-t pt-3">
                  <p className="text-xs text-gray-400">
                    {new Date(n.created_at).toLocaleDateString("id-ID")}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`edit/${n.id}`)}
                      className="p-2 rounded-lg bg-yellow-100 hover:bg-yellow-200 text-yellow-700 transition"
                      title="Edit"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() =>
                        setDeleteTarget({ id: n.id, title: n.title })
                      }
                      className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 transition"
                      title="Hapus"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Konfirmasi */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="text-red-600" size={22} />
              <h2 className="text-lg font-semibold text-gray-800">
                Konfirmasi Hapus
              </h2>
            </div>
            <p className="text-gray-600 text-sm mb-6">
              Apakah Anda yakin ingin menghapus berita{" "}
              <span className="font-semibold text-gray-800">
                “{deleteTarget.title}”
              </span>{" "}
              ? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg font-medium text-gray-800 transition"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
