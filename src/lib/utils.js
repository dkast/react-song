export function formatSeconds (secs) {
  const minutes = padWithZeros(Math.floor(secs / 60), 2);
  const seconds = padWithZeros(secs % 60, 2);
  return `${minutes}:${seconds}`;
}

function padWithZeros(num, size) {
  let s = num + '';
  while(s.length < size) {
    s = '0' + s;
  }
  return s;
}