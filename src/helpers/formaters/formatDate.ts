import { format, parseISO } from 'date-fns';

export const formatDate = (date: string, pattern: string = 'dd/MM/yyyy') => {
  try {
    return format(parseISO(date), pattern);
  } catch {
    return date;
  }
};
