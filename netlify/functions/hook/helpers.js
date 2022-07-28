const filterObject = (obj, filter = [], isBlacklist = true) => {
  const arr = Object.entries(obj);
  const set = new Set(filter);

  const filtered = arr.filter(([property]) =>
    isBlacklist ? !set.has(property) : set.has(property),
  );

  return Object.fromEntries(filtered);
};

module.exports = {
  filterObject,
};
