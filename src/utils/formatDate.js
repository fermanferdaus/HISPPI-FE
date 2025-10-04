export function formatDate(dateString, withTime = false) {
  if (!dateString) return "Tanggal tidak tersedia";

  // Ubah "2025-10-03 23:10:04" jadi "2025-10-03T23:10:04"
  const normalized = dateString.replace(" ", "T");
  const date = new Date(normalized);

  if (isNaN(date)) return "Tanggal tidak valid";

  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...(withTime && { hour: "2-digit", minute: "2-digit" }),
  });
}
