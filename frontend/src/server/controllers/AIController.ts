import { NextApiRequest, NextApiResponse } from 'next';
import { AIAdapter } from '../lib/ai/adapter/interface';
import { AiService } from '../lib/ai/service';
import { COOKIES_NAME } from '@/config/constants';
import { jwtService } from '../lib/jwt';
import { CartRepository } from '../repositories/CartRepository';
import { BookRepository } from '../repositories/BookRepository';
import { BookDTO } from '../repositories/dto/BookDTO';
import { IBook } from '../types/book';
import { BookStatus } from '@prisma/client';
import { getSellPrice } from '@/utils/getSellPrice';
import { ICategory } from '@/types/product';

export class AIController {
  private aiService: AiService;
  private cartRepository: CartRepository;
  private bookRepository: BookRepository;

  constructor() {
    this.aiService = new AiService();
    this.cartRepository = new CartRepository();
    this.bookRepository = new BookRepository();
    this.verify = this.verify.bind(this);
    this.suggest = this.suggest.bind(this);
    this.gramaticalImprovement = this.gramaticalImprovement.bind(this);
    this.bookSearch = this.bookSearch.bind(this);
  }
  public async verify(req: NextApiRequest, res: NextApiResponse) {
    try {
      const message = req.query.message as string;
      const response = await this.aiService.verifyMessage(message);
      res.status(200).json(response);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
  public async suggest(req: NextApiRequest, res: NextApiResponse) {
    let tries = 3;
    const makeRequest = async (): Promise<{
      name: string;
      synopsis: string;
      categories: string[];
    }> => {
      try {
        const name = req.query.name as string;
        const synopsis = req.query.synopsis as string;
        const categories = req.query.categories as string[];
        const response = await this.aiService.suggest({
          name,
          synopsis,
          categories
        });
        return response;
      } catch (error) {
        tries--;
        if (tries === 0) {
          throw error;
        }
        return await makeRequest();
      }
    };
    try {
      const response = await makeRequest();

      res.status(200).json(response);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
      res.status(400).json({ message: 'Error' });
    }
  }
  public async gramaticalImprovement(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    try {
      const message = req.query.message as string;
      const response = await this.aiService.gramaticalImprovement(message);
      res.status(200).json(response);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
  // public async complementarBookSuggestion(
  //   req: NextApiRequest,
  //   res: NextApiResponse
  // ) {
  //   try {
  //     const jwt = req.cookies[COOKIES_NAME.TOKEN];
  //     if (!jwt) {
  //       throw new Error('Token not found');
  //     }
  //     const { infos } = jwtService.extract(jwt);

  //     const [cart, books] = await Promise.all([
  //       this.cartRepository.getCurrentCart(infos.id),
  //       this.bookRepository.getAll()
  //     ]);
  //     const aiAnswer = await this.aiService.complementarBookSuggestion(
  //       cart.productCart.map(product => ({
  //         ...product,
  //         book: new BookDTO({
  //           ...product.book
  //         })
  //       })),
  //       books.filter(
  //         book => !cart.productCart.some(product => product.book.id === book.id)
  //       ) as IBook[]
  //     );
  //     const booksSuggested: BookDTO[] = aiAnswer.map(bookId => {
  //       const bookFound = books.find(book => book.id === bookId);
  //       return {
  //         author: '',
  //         categories: (bookFound?.categories || []).map(category => ({
  //           id: crypto.randomUUID(),
  //           name: category.name,
  //           createdAt: new Date(),
  //           updatedAt: new Date()
  //         })),
  //         createdAt: new Date(),
  //         depth: 0,
  //         edition: bookFound?.edition || '',
  //         height: 0,
  //         id: bookFound?.id || '',
  //         isbn: '',
  //         manufacturer: '',
  //         name: bookFound?.name || '',
  //         numberPages: 0,
  //         priceCost: bookFound?.priceCost || 0,
  //         priceSell: getSellPrice(
  //           bookFound?.priceCost || 0,
  //           bookFound?.priceGroup?.profitPercent || 0
  //         ),
  //         publisher: '',
  //         status: BookStatus.ACTIVE,
  //         synopsis: '',
  //         updatedAt: new Date(),
  //         weight: 0,
  //         stock: null,
  //         width: 0,
  //         year: 0
  //       };
  //     });
  //     res.status(200).json(booksSuggested);
  //   } catch (error: any) {
  //     res.status(400).json({ message: error.message });
  //   }
  // }
  public async bookSearch(
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<void> {
    try {
      const jwt = req.cookies[COOKIES_NAME.TOKEN];
      if (!jwt) {
        throw new Error('Token not found');
      }
      const { infos } = jwtService.extract(jwt);

      const message = req.body.message as string;

      const [cart, books] = await Promise.all([
        this.cartRepository.getCurrentCart(infos.id),
        this.bookRepository.getAll()
      ]);

      const aiAnswer = await this.aiService.bookSearch({
        bookCart: cart.productCart.map(product => ({
          id: product.book.id,
          name: product.book.name
        })),
        books: books.map(book => ({
          id: book.id,
          name: book.name
        })),
        message
      });

      if (!aiAnswer.bookId || aiAnswer.bookId === 'undefined') {
        res.status(200).json({
          message: aiAnswer.message
        });
        return;
      }
      const bookSuggested = books.find(book => book.id === aiAnswer.bookId);
      if (!bookSuggested) {
        console.log(aiAnswer);

        throw new Error('Book not found');
      }
      res.status(200).json({
        book: new BookDTO(bookSuggested),
        message: aiAnswer.message
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
