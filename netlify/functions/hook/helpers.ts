export const filterObject = (
  obj: Record<string, any>,
  filter: string[] = [],
  isBlacklist = true,
) => {
  const arr = Object.entries(obj);
  const set = new Set(filter);

  const filtered = arr.filter(([property]) =>
    isBlacklist ? !set.has(property) : set.has(property),
  );

  return Object.fromEntries(filtered);
};
