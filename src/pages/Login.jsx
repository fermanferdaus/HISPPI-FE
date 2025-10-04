import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Mail } from "lucide-react";
import { API_BASE_URL } from "../config/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login gagal, coba lagi.");
        return;
      }

      if (data.token) {
        const userData = {
          token: data.token,
          role: data.user?.role || "user",
          name: data.user?.name,
          email: data.user?.email,
        };
        localStorage.setItem("user", JSON.stringify(userData));

        if (["admin", "superadmin"].includes(userData.role)) {
          navigate("/admin", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Terjadi kesalahan server.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
      <motion.div
        className="bg-white rounded-2xl shadow-lg w-full max-w-md p-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* 🔹 Logo */}
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="Logo HISPPI PNF" className="h-20 w-20" />
        </div>

        {/* 🔹 Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-green-700 mb-1">
            Selamat Datang
          </h2>
          <p className="text-gray-600 text-sm">
            Silakan masuk ke akun{" "}
            <span className="text-green-700 font-semibold">HISPPI PNF</span>
          </p>
        </div>

        {/* 🔹 Form Login */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="relative">
            <Mail size={18} className="absolute left-3 top-3 text-green-500" />
            <input
              type="email"
              placeholder="Alamat Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 pl-10 pr-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition"
              required
            />
          </div>

          <div className="relative">
            <Lock size={18} className="absolute left-3 top-3 text-green-500" />
            <input
              type="password"
              placeholder="Kata Sandi"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 pl-10 pr-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition"
              required
            />
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          {/* 🔹 Tombol Masuk */}
          <button
            type="submit"
            className="w-full bg-green-700 text-white font-semibold py-2.5 rounded-lg hover:bg-green-800 transition-all shadow-md"
          >
            Masuk
          </button>

          {/* 🔹 Tombol Batal */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2.5 rounded-lg transition-all"
          >
            Batal
          </button>
        </form>

        {/* 🔹 Link Daftar */}
        <div className="text-center text-sm text-gray-500 mt-6">
          Belum punya akun?{" "}
          <a
            href="https://bit.ly/InstrumenProfile_PKPPNF"
            target="_blank"
            rel="noreferrer"
            className="text-green-700 font-semibold hover:underline"
          >
            Daftar Sekarang
          </a>
        </div>
      </motion.div>
    </div>
  );
}
