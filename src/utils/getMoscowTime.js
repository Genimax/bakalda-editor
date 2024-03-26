function getMoscowTime() {
  const timeZoneOffset = "+03:00"; // Смещение Московского времени от UTC
  const now = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Europe/Moscow" }),
  );

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Месяцы начинаются с 0
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes} ${day}.${month}.${year}`;
}

export default getMoscowTime;
