export const formatMoney = (number: number) => {
  const formater = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
  try {
    return formater.format(number);
  } catch {
    return number;
  }
};
