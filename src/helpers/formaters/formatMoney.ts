export const formatMoney = (number: number) => {
  try {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(number);
  } catch {
    return number;
  }
}