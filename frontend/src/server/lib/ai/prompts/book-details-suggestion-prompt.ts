import { IBook } from '@/server/types/book';
import { BookFormData } from '@/validations/bookForm.schema';

export const bookDetailsSuggestionPrompt = (book: Partial<BookFormData>) => {
  const missingFields = [];
  if (book.name === '') {
    missingFields.push('nome');
  }
  if (book.synopsis === '') {
    missingFields.push('sinopse');
  }
  return `Faça sugestão de preenchimento para os campos: ${missingFields.join(', ')} para o livro que contém ${
    book.name ? `Nome: ${book.name}` : ''
  } ${book.categories?.length ? `Categorias: ${book.categories.join(', ')}` : ''}.
  Responda no formato json { "name": 'nome', "synopsis": 'sinopse', "categories": ['categoria1', 'categoria2'], "author": "autor"} sem aspas, somente o json.
  Assegure-se que a resposta seja somente um json, nada a mais.
  Assegure-se que o javascript consiga fazer o parse do json. Dê sugestão de até 5 categorias de livro
  `;
};
