export const maskExpireDateCard = (value: string) => {
  const maskedValue = value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .slice(0, 5);
  return maskedValue;
};
