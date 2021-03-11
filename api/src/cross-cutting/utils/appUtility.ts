export function getEnvironement() {
  return process.env.NODE_ENV || "development";
}

export function isDevelopment() {
  return getEnvironement() === "development";
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}