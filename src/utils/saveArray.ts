function saveArray<T>(key: string, array: T[]): void {
  if (Array.isArray(array)) {
    localStorage.setItem(key, JSON.stringify(array));
  }
}

export default saveArray;
