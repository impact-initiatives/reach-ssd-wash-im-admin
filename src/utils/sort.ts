const sort = (a: Data, b: Data): number => {
  if (a.endDate > b.endDate) return -1;
  if (a.endDate < b.endDate) return 1;
  if (a.title < b.title) return -1;
  if (a.title > b.title) return 1;
  return 0;
};

export default sort;
