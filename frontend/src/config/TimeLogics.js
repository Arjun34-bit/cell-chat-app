export const getCurrentTime = () => {
  let date = new Date();
  h = date.getHours();
  m = date.hetMinutes();
  s = date.getSeconds();
  ampm = "AM";

  if (h >= 12) {
    h = h - 12;
    ampm = "PM";
  }

  h = h == 0 ? (h = 12) : h;

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;
  return `${h}:${m}:${s} ${ampm}`;
};
