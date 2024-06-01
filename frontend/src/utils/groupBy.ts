type fn = <T>(item: T) => string;

export const groupBy = <T>(arr: T[], fn: fn) => {
  return arr.reduce((acc, item) => {
    const key = fn(item);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<string, T[]>);
};
