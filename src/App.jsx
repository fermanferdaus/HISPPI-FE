import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import News from "./pages/News";
import Login from "./pages/Login";
import NewsDetail from "./pages/NewsDetail";
import AboutSejarah from "./pages/about/AboutSejarah";
import AboutVisiMisi from "./pages/about/AboutVisiMisi";
import AboutTujuanFungsi from "./pages/about/AboutTujuanFungsi";
import AboutLogo from "./pages/about/AboutLogo";
import AboutSekretariat from "./pages/about/AboutSekretariat";
import AboutProgramKerja from "./pages/about/AboutProgja";
import AboutLagu from "./pages/about/AboutLagu";
import AboutKepengurusan from "./pages/about/AboutKepengurusan";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/about/sejarah" element={<AboutSejarah />} />
          <Route path="/about/visi-misi" element={<AboutVisiMisi/>}/>
          <Route path="/about/tujuan-fungsi" element={<AboutTujuanFungsi/>}/>
          <Route path="/about/logo" element={<AboutLogo/>}/>
          <Route path="/about/sekretariat" element={<AboutSekretariat/>}/>
          <Route path="/about/program-kerja" element={<AboutProgramKerja/>}/>
          <Route path="/about/lagu" element={<AboutLagu/>}/>
          <Route path="/about/sejarah-kepengurusan" element={<AboutKepengurusan/>}/>
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
