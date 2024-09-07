export function extractBangladeshiTime(dateString) {
  const date = new Date(dateString);

  // Convert to UTC
  const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;

  // Bangladesh is UTC+6, so add 6 hours
  const bangladeshOffset = 6 * 60 * 60000; // 6 hours in milliseconds
  const bangladeshTime = new Date(utcTime + bangladeshOffset);

  // Format the time in 12-hour format
  let hours = bangladeshTime.getHours();
  const minutes = padZero(bangladeshTime.getMinutes());

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // If hour is 0, make it 12

  return `${hours}:${minutes} ${ampm}`;
}

// Helper function to pad single-digit numbers with a leading zero
function padZero(number) {
  return number.toString().padStart(2, "0");
}
