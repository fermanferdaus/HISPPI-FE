export default function FooterAdmin() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 shadow-sm text-sm py-4 px-6 mt-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between text-gray-600">
        <p className="font-medium text-center sm:text-left">
          © {year}{" "}
          <span className="font-semibold text-green-700">HISPPI PNF</span>. Semua Hak Dilindungi.
        </p>
        <p className="text-xs sm:text-sm mt-1 sm:mt-0 text-gray-400">
          Dashboard Administrator
        </p>
      </div>
    </footer>
  );
}
