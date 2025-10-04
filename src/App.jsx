import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Login from "./pages/Login";

// About Pages
import AboutSejarah from "./pages/about/AboutSejarah";
import AboutVisiMisi from "./pages/about/AboutVisiMisi";
import AboutTujuanFungsi from "./pages/about/AboutTujuanFungsi";
import AboutLogo from "./pages/about/AboutLogo";
import AboutSekretariat from "./pages/about/AboutSekretariat";
import AboutProgramKerja from "./pages/about/AboutProgja";
import AboutLagu from "./pages/about/AboutLagu";
import AboutKepengurusan from "./pages/about/AboutKepengurusan";

// Admin Area
import ProtectedRoute from "./auth/ProtectedRoute";
import AdminLayout from "./admin/layout/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import NewsAdmin from "./admin/pages/NewsAdmin";
import InfoAdmin from "./admin/pages/InfoAdmin";
import PartnersAdmin from "./admin/pages/PartnersAdmin";
import UsersAdmin from "./admin/pages/UsersAdmin";
import CategoryAdmin from "./admin/pages/CategoryAdmin";
import PengurusAdmin from "./admin/pages/PengurusAdmin";
import NewsAdd from "./admin/pages/news/NewsAdd";
import NewsEdit from "./admin/pages/news/NewsEdit";
import PengurusAdd from "./admin/pages/kepengurusan/PengurusAdd";
import PengurusEdit from "./admin/pages/kepengurusan/PengurusEdit";
import PartnersAdd from "./admin/pages/partners/PartnersAdd";
import PartnersEdit from "./admin/pages/partners/PartnersEdit";
import AdminAdd from "./admin/pages/user_admin/AdminAdd";
import AdminEdit from "./admin/pages/user_admin/AdminEdit";

export default function App() {
  const location = useLocation();
  const hideLayoutRoutes = ["/login"];
  const isAdminRoute = location.pathname.startsWith("/admin");
  const hideLayout =
    hideLayoutRoutes.includes(location.pathname) || isAdminRoute;

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <Navbar />}

      <main className="flex-1">
        <Routes>
          {/* Login */}
          <Route path="/login" element={<Login />} />

          {/* Admin */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="news" element={<NewsAdmin />} />
            <Route path="news/add" element={<NewsAdd />} />
            <Route path="news/edit/:id" element={<NewsEdit />} />
            <Route path="info" element={<InfoAdmin />} />
            <Route path="partners" element={<PartnersAdmin />} />
            <Route path="partners/add" element={<PartnersAdd />} />
            <Route path="partners/edit/:id" element={<PartnersEdit />} />
            <Route path="categories" element={<CategoryAdmin />} />
            <Route path="pengurus" element={<PengurusAdmin />} />
            <Route path="pengurus/add" element={<PengurusAdd />} />
            <Route path="pengurus/edit/:id" element={<PengurusEdit />} />
            <Route path="users/add" element={<AdminAdd />} />
            <Route path="users/edit/:id" element={<AdminEdit />} />
            <Route
              path="users"
              element={
                <ProtectedRoute allowedRoles={["superadmin"]}>
                  <UsersAdmin />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/about/sejarah" element={<AboutSejarah />} />
          <Route path="/about/visi-misi" element={<AboutVisiMisi />} />
          <Route path="/about/tujuan-fungsi" element={<AboutTujuanFungsi />} />
          <Route path="/about/logo" element={<AboutLogo />} />
          <Route path="/about/sekretariat" element={<AboutSekretariat />} />
          <Route path="/about/program-kerja" element={<AboutProgramKerja />} />
          <Route path="/about/lagu" element={<AboutLagu />} />
          <Route
            path="/about/sejarah-kepengurusan"
            element={<AboutKepengurusan />}
          />
        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}
