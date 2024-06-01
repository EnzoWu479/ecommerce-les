export const getRandomColor = () => {
  // Gera um número aleatório entre 0 e 16777215 (valor máximo de um número hexadecimal de 6 dígitos)
  const randomNumber = Math.floor(Math.random() * 16777215);
  // Converte o número aleatório para uma string hexadecimal
  const randomColor = randomNumber.toString(16);
  // Padroniza a string resultante para garantir que ela tenha exatamente 6 dígitos
  const paddedColor = randomColor.padStart(6, '0');
  // Retorna a cor no formato hexadecimal precedida por '#'
  return `#${paddedColor}`;
};
