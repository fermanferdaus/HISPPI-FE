import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../config/api";

export default function PengurusAdd() {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  const [form, setForm] = useState({ periode: "", ketua_umum: "", sekjen: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/kepengurusan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        navigate("/admin/pengurus", {
          state: {
            alert: {
              type: "success",
              message: "Data kepengurusan berhasil ditambahkan!",
            },
          },
        });
      } else {
        navigate("/admin/pengurus", {
          state: {
            alert: {
              type: "error",
              message: data.message || "Gagal menambahkan data kepengurusan.",
            },
          },
        });
      }
    } catch (err) {
      navigate("/admin/pengurus", {
        state: {
          alert: { type: "error", message: "Terjadi kesalahan server." },
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-700">
          Tambah Kepengurusan
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Lengkapi data di bawah untuk menambahkan kepengurusan baru.
        </p>
      </div>

      <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Periode
            </label>
            <input
              type="text"
              value={form.periode}
              onChange={(e) => setForm({ ...form, periode: e.target.value })}
              placeholder="Contoh: 2023 - 2027"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Ketua Umum
            </label>
            <input
              type="text"
              value={form.ketua_umum}
              onChange={(e) => setForm({ ...form, ketua_umum: e.target.value })}
              placeholder="Masukkan nama Ketua Umum"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Sekretaris Jenderal
            </label>
            <input
              type="text"
              value={form.sekjen}
              onChange={(e) => setForm({ ...form, sekjen: e.target.value })}
              placeholder="Masukkan nama Sekretaris Jenderal"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => navigate("/admin/pengurus")}
              className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2.5 rounded-lg font-medium transition-all"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-6 py-2.5 rounded-lg font-medium shadow transition-all ${
                loading && "opacity-70 cursor-not-allowed"
              }`}
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
