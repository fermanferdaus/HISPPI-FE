import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  PlusCircle,
  Pencil,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Search,
} from "lucide-react";
import { API_BASE_URL } from "../../config/api";

export default function StrukturAdmin() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // data hasil filter
  const [searchTerm, setSearchTerm] = useState(""); // input pencarian
  const [alert, setAlert] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  const role = JSON.parse(localStorage.getItem("user"))?.role;

  // 🔹 Ambil data struktur organisasi
  const fetchData = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/struktur`);
      const data = await res.json();
      setData(data);
      setFilteredData(data);
    } catch (err) {
      console.error("Gagal mengambil data struktur:", err);
      setAlert({
        type: "error",
        message: "Gagal memuat data struktur organisasi.",
      });
    }
  };

  useEffect(() => {
    fetchData();

    if (location.state?.alert) {
      setAlert(location.state.alert);
      window.history.replaceState({}, document.title);
      setTimeout(() => setAlert(null), 3000);
    }
  }, [location.state]);

  // 🔍 Filter data saat mengetik
  useEffect(() => {
    const lowerSearch = searchTerm.toLowerCase();
    const filtered = data.filter(
      (item) =>
        item.nama.toLowerCase().includes(lowerSearch) ||
        item.jabatan.toLowerCase().includes(lowerSearch)
    );
    setFilteredData(filtered);
  }, [searchTerm, data]);

  // 🗑️ Hapus data
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const { id, nama } = deleteTarget;

    try {
      const res = await fetch(`${API_BASE_URL}/struktur/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (res.ok) {
        setAlert({
          type: "success",
          message: `Data pengurus ${nama} berhasil dihapus.`,
        });
        setData((prev) => prev.filter((d) => d.id !== id));
      } else {
        setAlert({
          type: "error",
          message: data.message || "Gagal menghapus data.",
        });
      }
    } catch (err) {
      console.error(err);
      setAlert({
        type: "error",
        message: "Terjadi kesalahan server saat menghapus data.",
      });
    } finally {
      setDeleteTarget(null);
      setTimeout(() => setAlert(null), 3000);
    }
  };

  return (
    <div className="p-4 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-3">
        <div>
          <h1 className="text-3xl font-bold text-green-700">
            Kelola Struktur Organisasi
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Tambah, ubah, atau hapus data struktur pengurus DPP HISPPI PNF.
          </p>
        </div>

        <button
          onClick={() => navigate("add")}
          className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition-all shadow-sm"
        >
          <PlusCircle size={18} /> Tambah Data
        </button>
      </div>

      {/* 🔍 Input Pencarian */}
      <div className="mb-6 flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm max-w-sm">
        <Search size={18} className="text-gray-500" />
        <input
          type="text"
          placeholder="Cari nama atau jabatan..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full outline-none text-sm text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* ✅ Alert */}
      {alert && (
        <div
          className={`mb-6 flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium border shadow-sm transition-all duration-300 ${
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

      {/* ✅ Tabel Data */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-sm text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 font-semibold text-gray-700 w-10">
                  #
                </th>
                <th className="px-6 py-3 font-semibold text-gray-700 w-28">
                  Foto
                </th>
                <th className="px-6 py-3 font-semibold text-gray-700">Nama</th>
                <th className="px-6 py-3 font-semibold text-gray-700">
                  Jabatan
                </th>
                <th className="px-6 py-3 font-semibold text-gray-700">
                  Periode
                </th>
                <th className="px-6 py-3 font-semibold text-gray-700 w-36 text-center">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, i) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-all"
                >
                  <td className="px-6 py-3 text-gray-700 font-medium">
                    {i + 1}
                  </td>

                  {/* Foto */}
                  <td className="px-6 py-3">
                    <img
                      src={`${API_BASE_URL}/uploads/${item.foto}`}
                      alt={item.nama}
                      className="w-12 h-12 rounded-lg object-cover border border-gray-200 shadow-sm"
                    />
                  </td>

                  {/* Nama */}
                  <td className="px-6 py-3 text-gray-800 font-medium">
                    {item.nama}
                  </td>

                  {/* Jabatan */}
                  <td className="px-6 py-3 text-gray-700">{item.jabatan}</td>

                  {/* Periode */}
                  <td className="px-6 py-3 text-gray-700 font-medium">
                    {item.periode}
                  </td>

                  {/* Aksi */}
                  <td className="px-6 py-3 text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => navigate(`edit/${item.id}`)}
                        className="inline-flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md text-xs font-medium transition-all shadow-sm"
                      >
                        <Pencil size={14} /> Edit
                      </button>
                      <button
                        onClick={() =>
                          setDeleteTarget({ id: item.id, nama: item.nama })
                        }
                        className="inline-flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-xs font-medium transition-all shadow-sm"
                      >
                        <Trash2 size={14} /> Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredData.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-6 text-gray-500 italic"
                  >
                    {searchTerm
                      ? "Tidak ada hasil pencarian."
                      : "Belum ada data struktur organisasi."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🗑️ Modal Konfirmasi Hapus */}
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
              Yakin ingin menghapus data pengurus{" "}
              <span className="font-semibold text-gray-800">
                "{deleteTarget.nama}"
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
