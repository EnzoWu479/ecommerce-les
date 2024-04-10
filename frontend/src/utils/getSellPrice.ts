export const getSellPrice = (priceCost: number, profitPercent: number) => {
  return priceCost + priceCost * (profitPercent / 100);
};
