export default function TentangKami() {
  return (
    <section
      id="about"
      className="relative py-24 bg-gradient-to-b from-green-50 via-white to-green-50 overflow-hidden"
    >
      {/* Background dekorasi */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Logo / Ilustrasi */}
        <div data-aos="fade-right">
          <img
            src="/logo.png"
            alt="Logo HISPPI PNF"
            className="w-72 mx-auto md:mx-0 drop-shadow-xl transform hover:scale-105 transition duration-500"
          />
        </div>

        {/* Konten */}
        <div data-aos="fade-left" data-aos-delay="200">
          <h4 className="text-green-600 font-semibold tracking-wide uppercase mb-3">
            Tentang Kami
          </h4>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 leading-snug">
            Meningkatkan{" "}
            <span className="text-green-700">Pendidikan Non Formal</span> di
            Indonesia
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            <span className="font-semibold text-green-700">HISPPI PNF</span>{" "}
            adalah wadah untuk mendukung pendidik & penguji dalam meningkatkan
            kualitas pendidikan non formal di Indonesia. Kami berkomitmen
            memperkuat peran organisasi dalam kemitraan nasional maupun
            internasional, serta mencetak generasi emas bangsa.
          </p>
        </div>
      </div>
    </section>
  );
}
