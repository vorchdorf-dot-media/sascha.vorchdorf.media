export const filterObject = <T>(
  obj: Record<string, any>,
  filter: string[] = [],
  isBlacklist = true,
): T => {
  const arr = Object.entries(obj);
  const set = new Set(filter);

  const filtered = arr.filter(([property]) =>
    isBlacklist ? !set.has(property) : set.has(property),
  );

  return Object.fromEntries(filtered) as T;
};
