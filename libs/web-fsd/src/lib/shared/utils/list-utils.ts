export const deleteByKey = <T, K extends keyof T>(
  list: T[],
  key: K,
  value: T[K],
): T[] => {
  return list.filter((item) => item[key] !== value);
};

export const deleteItem = <T>(list: T[], value: T) =>
  list.filter((x) => x !== value);

export const rollbackWord = <T>(words: T[], word: T, index: number) => {
  const restored = [...words];
  restored.splice(index, 0, word);
  return restored;
};
