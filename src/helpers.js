export function arrayOfLength(length) {
  return Array.from(Array(length).keys());
}

export function randomArrayElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}
