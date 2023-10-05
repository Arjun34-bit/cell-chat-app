export const getCurrentTime = () => {
  let date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  let ampm = "AM";

  if (h >= 12) {
    h = h - 12;
    ampm = "PM";
  }

  h = h === 0 ? (h = 12) : h;

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;
  return `${h}:${m} ${ampm}`;
};

const maxLength = 9;
export const truncate = (name) => {
  if (name.length > maxLength) {
    return name.slice(0, maxLength - 1) + "...";
  } else {
    return name;
  }
};
