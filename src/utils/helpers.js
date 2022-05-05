export function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

export function copyShallowObjs(arr) {
  return arr.map((a) => ({ ...a }));
}

export function startsWithCapital(str) {
  return str[0].toUpperCase() === str[0];
}
