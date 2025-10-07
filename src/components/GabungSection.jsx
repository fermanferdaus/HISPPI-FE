export default function GabungSection() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-green-100 to-gray-50 text-center overflow-hidden">

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        {/* Judul konsisten dengan Kemitraan */}
        <p className="text-green-600 font-semibold uppercase tracking-wide mb-2">
          Bergabung Sekarang
        </p>
        <h2 className="text-4xl font-extrabold text-gray-800 mb-3">
          <span className="text-green-700">Satu Visi</span>, Mewujudkan
          Pendidikan Berkualitas
        </h2>
        <div className="w-20 h-1 bg-green-600 mx-auto rounded mb-6"></div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Jadi bagian dari{" "}
          <span className="text-green-700 font-semibold">HISPPI PNF</span> dan
          bersama-sama membangun masa depan pendidikan non formal yang unggul
          dan berdaya saing.
        </p>

        {/* Tombol CTA */}
        <div data-aos="zoom-in" data-aos-delay="400">
          <a
            href="https://bit.ly/InstrumenProfile_PKPPNF"
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-green-700 text-white font-semibold px-10 py-4 rounded-full shadow-lg hover:bg-green-800 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Bergabung Sekarang
          </a>
        </div>
      </div>
    </section>
  );
}
