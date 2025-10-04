import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../config/api";

export default function AdminAdd() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...form, role: "admin" }), // pastikan role admin
      });

      const data = await res.json();

      if (res.ok) {
        navigate("/admin/users", {
          state: {
            alert: { type: "success", message: "Admin berhasil ditambahkan!" },
          },
        });
      } else {
        navigate("/admin/users", {
          state: {
            alert: {
              type: "error",
              message: data.message || "Gagal menambahkan admin.",
            },
          },
        });
      }
    } catch (err) {
      navigate("/admin/users", {
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
      <h1 className="text-3xl font-bold text-green-700 mb-2">Tambah Admin</h1>
      <p className="text-gray-500 text-sm mb-8">
        Lengkapi formulir di bawah untuk menambahkan admin baru ke sistem.
      </p>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-medium text-gray-700 text-sm mb-1 block">
              Nama Admin
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Masukkan nama admin"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700 text-sm mb-1 block">
              Email Admin
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Masukkan email admin"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700 text-sm mb-1 block">
              Password
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Masukkan password"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex items-center gap-1 px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg font-medium text-gray-800 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg font-medium shadow transition"
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
