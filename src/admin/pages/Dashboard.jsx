import { useEffect, useState } from "react";
import { FileText, Users, Handshake, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;
  const role = user?.role; // ✅ ambil role user dari localStorage

  const [counts, setCounts] = useState({
    news: 0,
    admins: 0,
    partners: 0,
  });

  // 🔹 Ambil data total dari berbagai endpoint
  const fetchDashboardData = async () => {
    try {
      const [newsRes, usersRes, partnersRes] = await Promise.all([
        fetch(`${API_BASE_URL}/news`),
        fetch(`${API_BASE_URL}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_BASE_URL}/partners`),
      ]);

      const [newsData, usersData, partnersData] = await Promise.all([
        newsRes.json(),
        usersRes.json(),
        partnersRes.json(),
      ]);

      // Hitung total admin dengan role "admin"
      const adminCount = Array.isArray(usersData)
        ? usersData.filter((u) => u.role === "admin").length
        : 0;

      setCounts({
        news: Array.isArray(newsData) ? newsData.length : 0,
        admins: adminCount,
        partners: Array.isArray(partnersData) ? partnersData.length : 0,
      });
    } catch (err) {
      console.error("Gagal memuat data dashboard:", err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // 🔹 Semua card
  const allStats = [
    {
      title: "Total Berita",
      value: counts.news,
      icon: FileText,
      color: "bg-green-500",
      link: "/admin/news",
    },
    {
      title: "Total Admin",
      value: counts.admins,
      icon: Users,
      color: "bg-emerald-500",
      link: "/admin/users",
    },
    {
      title: "Total Mitra",
      value: counts.partners,
      icon: Handshake,
      color: "bg-teal-500",
      link: "/admin/partners",
    },
  ];

  // 🔹 Filter tampilan berdasarkan role
  const visibleStats =
    role === "admin"
      ? allStats.filter((s) => s.title === "Total Berita") // hanya berita
      : allStats; // role lain (mis. superadmin) lihat semua

  return (
    <div className="p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-700">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          Ringkasan statistik aktivitas dan data penting dalam sistem HISPPI
          PNF.
        </p>
      </div>

      <div
        className={`grid ${
          visibleStats.length > 1
            ? "grid-cols-1 md:grid-cols-3"
            : "grid-cols-1 md:grid-cols-1"
        } gap-8`}
      >
        {visibleStats.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={i}
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => navigate(item.link)}
              className="cursor-pointer bg-white/90 rounded-3xl shadow-md hover:shadow-xl border border-gray-100 hover:border-green-200 p-8 transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

              {/* Icon + Text */}
              <div className="flex items-center gap-5 relative z-10">
                <div
                  className={`w-16 h-16 flex items-center justify-center rounded-2xl ${item.color} text-white shadow-lg group-hover:shadow-green-400/40 transition-shadow duration-300`}
                >
                  <Icon size={32} />
                </div>
                <div>
                  <h3 className="text-base text-gray-500 font-semibold mb-1">
                    {item.title}
                  </h3>
                  <p className="text-4xl font-extrabold text-gray-800 leading-none">
                    {item.value}
                  </p>
                </div>
              </div>

              {/* Divider Line */}
              <div className="mt-8 border-t border-gray-200 group-hover:border-green-200 transition-all"></div>

              {/* Link “Selengkapnya” */}
              <div className="flex items-center justify-end mt-4 text-green-700 font-semibold text-sm gap-1 group-hover:gap-2 transition-all">
                <span>Selengkapnya</span>
                <ArrowRight size={16} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
