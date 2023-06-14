export function generateMenu(arr, key) {
  return arr
    .filter((item) => item.path == key)[0]
    .children.map((item) => item.meta);
}
