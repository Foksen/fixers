const months = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

export function formatDateTime(input) {
  const [datePart, timePart] = input.split(" ");
  const [day, month, year] = datePart.split(".").map(Number);
  const [hours, minutes] = timePart.split(":").map(Number);

  const inputDate = new Date(year, month - 1, day, hours, minutes);

  const now = new Date();

  const isToday =
    inputDate.getDate() === now.getDate() &&
    inputDate.getMonth() === now.getMonth() &&
    inputDate.getFullYear() === now.getFullYear();

  if (isToday) {
    const h = String(inputDate.getHours()).padStart(2, "0");
    const m = String(inputDate.getMinutes()).padStart(2, "0");
    return `${h}:${m}`;
  }

  const isThisYear = inputDate.getFullYear() === now.getFullYear();

  const dayStr = inputDate.getDate();
  const monthStr = months[inputDate.getMonth()];

  if (isThisYear) {
    return `${dayStr} ${monthStr}`;
  }

  return `${dayStr} ${monthStr} ${inputDate.getFullYear()}`;
}
