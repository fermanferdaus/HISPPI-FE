import { useState } from "react";
import { User, Menu, XCircle, Save } from "lucide-react";
import { API_BASE_URL } from "../../config/api";

export default function Topbar({ user, onToggleSidebar }) {
  const [showProfile, setShowProfile] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  // 🔹 Buka modal edit dengan data lama
  const handleOpenEdit = () => {
    if (!user) return; // pastikan user sudah ada
    setForm({
      name: user.name || "",
      email: user.email || "",
      password: "",
    });
    setTimeout(() => setShowEdit(true), 50); // beri jeda agar re-render pasti
    setShowProfile(false);
  };

  // 🔹 Simpan perubahan profil
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Profil berhasil diperbarui!");
        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, name: form.name, email: form.email })
        );
        setShowEdit(false);
        window.location.reload();
      } else {
        alert(data.message || "Gagal memperbarui profil.");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="bg-green-700 text-white flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 shadow-md relative">
      {/* 🔹 Kiri: Hamburger (Mobile) + Greeting */}
      <div className="flex items-center gap-3">
        <button
          className="lg:hidden flex items-center justify-center p-2 rounded-md hover:bg-green-800 transition"
          onClick={onToggleSidebar}
        >
          <Menu size={22} />
        </button>

        <h2 className="font-semibold text-base sm:text-lg tracking-wide">
          Selamat Datang,&nbsp;
          <span className="font-bold">{user?.name || "User"}</span>
        </h2>
      </div>

      {/* 🔹 Kanan: Role badge + avatar */}
      <div className="flex items-center gap-3 relative">
        <span className="text-[10px] sm:text-xs font-semibold uppercase bg-green-600/60 border border-green-400/40 px-2 sm:px-3 py-1 rounded-md tracking-wide shadow-sm">
          {user?.role || "USER"}
        </span>

        <div
          onClick={() => setShowProfile(!showProfile)}
          className="w-8 sm:w-9 h-8 sm:h-9 flex items-center justify-center rounded-full bg-green-800/50 border border-green-400/40 cursor-pointer hover:scale-105 transition-transform"
        >
          <User size={18} className="text-white/90" />
        </div>

        {/* 🔹 Dropdown Info Profil */}
        {showProfile && (
          <div className="absolute right-0 top-12 bg-white text-gray-800 rounded-xl shadow-lg border border-gray-200 w-64 z-50 animate-fadeIn">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-semibold text-lg text-green-700 mb-1">
                {user?.name}
              </h3>
              <p className="text-sm text-gray-500">{user?.email}</p>
              <p className="text-xs text-gray-400 uppercase mt-1">
                {user?.role}
              </p>
            </div>
            <div className="p-3">
              <button
                onClick={handleOpenEdit}
                className="w-full text-sm font-semibold text-green-700 border border-green-500 rounded-lg py-2 hover:bg-green-50 transition"
              >
                Edit Profil
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 🔹 Modal Edit Profil */}
      {showEdit && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md border border-gray-200 animate-fadeIn">
            <h2 className="text-xl font-semibold text-green-700 mb-4">
              Edit Profil
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nama */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Nama
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 
                            text-gray-800 placeholder-gray-400 
                            focus:ring-2 focus:ring-green-500 focus:outline-none bg-white"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 
                            text-gray-800 placeholder-gray-400 
                            focus:ring-2 focus:ring-green-500 focus:outline-none bg-white"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Password Baru
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  placeholder="Kosongkan jika tidak ingin mengganti password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 
                            text-gray-800 placeholder-gray-400 
                            focus:ring-2 focus:ring-green-500 focus:outline-none bg-white"
                />
              </div>

              {/* Tombol Aksi */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEdit(false)}
                  className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2.5 rounded-lg font-medium transition-all"
                >
                  <XCircle size={16} /> Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-6 py-2.5 rounded-lg font-medium shadow transition-all ${
                    loading && "opacity-70 cursor-not-allowed"
                  }`}
                >
                  <Save size={18} />
                  {loading ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
