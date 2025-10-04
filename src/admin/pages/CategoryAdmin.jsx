import { useEffect, useState } from "react";
import {
  PlusCircle,
  Edit2,
  Trash2,
  Save,
  XCircle,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { API_BASE_URL } from "../../config/api";

export default function CategoryAdmin() {
  const [categories, setCategories] = useState([]);
  const [newName, setNewName] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [alert, setAlert] = useState(null);

  const token = JSON.parse(localStorage.getItem("user"))?.token;

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/categories`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Gagal memuat kategori:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newName }),
      });

      if (res.ok) {
        showAlert("success", "Kategori berhasil ditambahkan.");
        setNewName("");
        fetchCategories();
      } else {
        showAlert("error", "Gagal menambahkan kategori.");
      }
    } catch (err) {
      console.error("Gagal menambah kategori:", err);
      showAlert("error", "Terjadi kesalahan server.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id) => {
    if (!editName.trim()) return;
    try {
      const res = await fetch(`${API_BASE_URL}/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: editName }),
      });

      if (res.ok) {
        showAlert("success", "Kategori berhasil diperbarui.");
        setEditId(null);
        fetchCategories();
      } else {
        showAlert("error", "Gagal memperbarui kategori.");
      }
    } catch (err) {
      console.error("Gagal memperbarui kategori:", err);
      showAlert("error", "Terjadi kesalahan server saat memperbarui.");
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`${API_BASE_URL}/categories/${deleteTarget.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        showAlert(
          "success",
          `Kategori "${deleteTarget.name}" berhasil dihapus.`
        );
        fetchCategories();
      } else {
        showAlert("error", "Gagal menghapus kategori.");
      }
    } catch (err) {
      console.error("Gagal menghapus kategori:", err);
      showAlert("error", "Terjadi kesalahan server saat menghapus kategori.");
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div className="p-4 relative">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-700">Kelola Kategori</h1>
        <p className="text-gray-500 text-sm mt-1">
          Tambah, ubah, dan hapus kategori berita yang digunakan pada sistem
          HISPPI PNF.
        </p>
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
            <AlertTriangle size={18} />
          )}
          <span>{alert.message}</span>
        </div>
      )}

      {/* Form Tambah */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 mb-8">
        <form
          onSubmit={handleAdd}
          className="flex flex-col md:flex-row items-center gap-4"
        >
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Masukkan nama kategori baru..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all placeholder-gray-400"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm transition-all ${
              loading && "opacity-70 cursor-not-allowed"
            }`}
          >
            <PlusCircle size={18} />
            {loading ? "Menambah..." : "Tambah"}
          </button>
        </form>
      </div>

      {/* ✅ Tabel Responsif */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {" "}
          {/* ✅ Tambahkan ini */}
          <table className="w-full min-w-[500px] text-sm text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-gray-700 font-semibold w-16">
                  #
                </th>
                <th className="px-6 py-3 text-gray-700 font-semibold">
                  Nama Kategori
                </th>
                <th className="px-6 py-3 text-gray-700 font-semibold w-40">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, i) => (
                <tr
                  key={cat.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-all"
                >
                  <td className="px-6 py-3 text-gray-700 font-medium">
                    {i + 1}
                  </td>
                  <td className="px-6 py-3 text-gray-800 font-medium">
                    {editId === cat.id ? (
                      <input
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        autoFocus
                      />
                    ) : (
                      cat.name
                    )}
                  </td>
                  <td className="px-6 py-3 text-center">
                    {editId === cat.id ? (
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleUpdate(cat.id)}
                          className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-xs font-medium transition-all shadow-sm"
                        >
                          <Save size={14} /> Simpan
                        </button>
                        <button
                          onClick={() => setEditId(null)}
                          className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-md text-xs font-medium transition-all shadow-sm"
                        >
                          <XCircle size={14} /> Batal
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => {
                            setEditId(cat.id);
                            setEditName(cat.name);
                          }}
                          className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md text-xs font-medium transition-all shadow-sm"
                        >
                          <Edit2 size={14} /> Edit
                        </button>
                        <button
                          onClick={() =>
                            setDeleteTarget({ id: cat.id, name: cat.name })
                          }
                          className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-xs font-medium transition-all shadow-sm"
                        >
                          <Trash2 size={14} /> Hapus
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td
                    colSpan="3"
                    className="text-center py-6 text-gray-500 italic"
                  >
                    Belum ada kategori yang ditambahkan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Hapus */}
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
              Yakin ingin menghapus kategori{" "}
              <span className="font-semibold text-gray-800">
                "{deleteTarget.name}"
              </span>
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
