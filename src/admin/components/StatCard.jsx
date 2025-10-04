export default function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg border-l-4 border-green-700 transition">
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      <p className="text-3xl font-bold text-green-700 mt-2">{value}</p>
    </div>
  );
}
