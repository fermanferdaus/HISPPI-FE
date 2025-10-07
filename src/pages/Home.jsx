import Hero from "../components/Hero";
import TentangKami from "../components/TentangKami";
import Berita from "../components/Berita";
import Kemitraan from "../components/Kemitraan";
import HubungiKami from "../components/HubungiKami";
import StrukturUtama from "../components/StrukturUtama";
import GabungSection from "../components/GabungSection";

export default function Home() {
  return (
    <div>
      <Hero />
      <TentangKami />
      <StrukturUtama/>
      <Berita />
      <Kemitraan />
      <GabungSection/>
      <HubungiKami/>
    </div>
  );
}
