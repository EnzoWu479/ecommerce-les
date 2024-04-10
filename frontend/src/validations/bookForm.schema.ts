import { z } from 'zod';

const refineBiggerThan = (number = 0) => {
  return (data: string) => Number(data.replace(/\D/g, '') || 0) > number;
};
export const bookFormSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  isbn: z.string().min(1, 'ISBN é obrigatório'),
  manufacturer: z.string().min(1, 'Fabricante é obrigatório'),
  categories: z
    .array(z.string())
    .min(1, 'Pelo menos uma categoria é obrigatória'),
  author: z.string().min(1, 'Autor é obrigatório'),
  year: z.string().min(1, 'Ano é obrigatório').refine(refineBiggerThan(0), {
    message: 'Ano deve ser maior que 0'
    // path: ['year']
  }),
  publisher: z.string().min(1, 'Editora é obrigatória'),
  edition: z.string().min(1, 'Edição é obrigatória'),
  numberPages: z
    .string()
    .min(1, 'Número de páginas é obrigatório')
    .refine(refineBiggerThan(0), {
      message: 'Número de páginas deve ser maior que 0'
      // path: ['numberPages']
    }),
  synopsis: z.string().min(1, 'Sinopse é obrigatória'),
  height: z
    .string()
    .min(1, 'Altura é obrigatória')
    .refine(refineBiggerThan(0), {
      message: 'Altura deve ser maior que 0'
      // path: ['height']
    }),
  width: z
    .string()
    .min(1, 'Largura é obrigatória')
    .refine(refineBiggerThan(0), {
      message: 'Largura deve ser maior que 0'
      // path: ['width']
    }),
  weight: z.string().min(1, 'Peso é obrigatório').refine(refineBiggerThan(0), {
    message: 'Peso deve ser maior que 0'
    // path: ['weight']
  }),
  depth: z
    .string()
    .min(1, 'Profundidade é obrigatória')
    .refine(refineBiggerThan(0), {
      message: 'Profundidade deve ser maior que 0'
      // path: ['depth']
    }),
  priceCost: z
    .string()
    .min(1, 'Preço de custo é obrigatório')
    .refine(refineBiggerThan(0), {
      message: 'Preço de custo deve ser maior que 0'
      // path: ['priceCost']
    }),
  priceGroupId: z.string().min(1, 'Grupo de preço é obrigatório')
});
export const bookFormDataSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  isbn: z.string().min(1, 'ISBN é obrigatório'),
  manufacturer: z.string().min(1, 'Fabricante é obrigatório'),
  categories: z
    .array(z.string())
    .min(1, 'Pelo menos uma categoria é obrigatória'),
  author: z.string().min(1, 'Autor é obrigatório'),
  year: z.number().gte(1, 'Ano é obrigatório'),
  publisher: z.string().min(1, 'Editora é obrigatória'),
  edition: z.string().min(1, 'Edição é obrigatória'),
  numberPages: z.number().gte(1, 'Número de páginas é obrigatório'),
  synopsis: z.string().min(1, 'Sinopse é obrigatória'),
  height: z.number().gte(0, 'Altura é obrigatória'),
  width: z.number().gte(0, 'Largura é obrigatória'),
  weight: z.number().gte(0, 'Peso é obrigatório'),
  depth: z.number().gte(0, 'Profundidade é obrigatória'),
  priceCost: z.number().gte(0, 'Preço de custo é obrigatório'),
  priceGroupId: z.string().min(1, 'Grupo de preço é obrigatório')
});
export type BookForm = z.infer<typeof bookFormSchema>;
export type BookFormData = z.infer<typeof bookFormDataSchema>;
