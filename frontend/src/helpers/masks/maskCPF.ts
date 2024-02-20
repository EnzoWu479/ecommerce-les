import { IMask } from ".";

export const maskCPF: IMask = (value: string) => {
  return value
    .replace(/[^0-9.-]/g, "")
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1-$2")
    .slice(0, 14);
};
