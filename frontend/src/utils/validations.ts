export const refineBiggerThan = (number = 0) => {
  return (data: string) => Number(data.replace(/\D/g, '') || 0) > number;
};
