import { IBook } from '@/server/types/book';
import { IProductCart } from '@/types/cart';

interface Props {
  bookCart: IProductCart[];
  books: IBook[];
}

export const bookSuggestionPrompt = ({ bookCart, books }: Props) => {
  const bookCartStr = JSON.stringify(bookCart);
  const booksStr = JSON.stringify(books).slice(0, 16000 - bookCartStr.length);
  return `Analise os livros no carrinho em formato json "${bookCartStr}" e os livros disponíveis em formato json "${booksStr}" e responda com a lista de ids dos livros que são sugestões de compras para o livro analisado. Sugira até 5 livros. Tenha certeza de mandar uma string tal que o javascript consiga fazer parse. Exemplo: [1, 2, 3]`;
};
