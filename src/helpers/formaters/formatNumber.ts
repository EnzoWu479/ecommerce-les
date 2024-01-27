export const formatNumber = (number: number) => {
  try {
    return new Intl.NumberFormat('pt-BR', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(number);
  } catch {
    return number;
  }
};