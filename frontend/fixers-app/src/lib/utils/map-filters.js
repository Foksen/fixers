export const mapFilters = (filters) => {
  const mapped = Object.fromEntries(
    Object.entries(filters)
      .filter(([_, value]) => Array.isArray(value) && value.length > 0)
      .map(([key, value]) => [key, value.join(",")])
  );
  return Object.keys(mapped).length > 0 ? mapped : null;
};
