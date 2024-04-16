import {
  bookFormDataSchema,
  bookFormSchema
} from '@/validations/bookForm.schema';
import { NextApiRequest, NextApiResponse } from 'next';
import { BookRepository } from '../repositories/BookRepository';
import { ResponseData } from '../shared/ResponseDataImp';
import { api } from '@/lib/axios';
import { SingletonClass } from '../singleton/SingletonClass';
import { BookStockRepository } from '../repositories/BookStockRepository';
import { BookDTO } from '../repositories/dto/BookDTO';
import { IBook } from '../types/book';

export class BookController {
  private bookRepository: BookRepository;
  private bookStockRepository: BookStockRepository;
  constructor() {
    this.bookRepository = SingletonClass.getInstance(BookRepository);
    this.bookStockRepository = SingletonClass.getInstance(BookStockRepository);
    this.create = this.create.bind(this);
    this.list = this.list.bind(this);
    this.get = this.get.bind(this);
    this.update = this.update.bind(this);
    this.updateStock = this.updateStock.bind(this);
    this.home = this.home.bind(this);
  }
  public async create(req: NextApiRequest, res: NextApiResponse) {
    try {
      const body = bookFormDataSchema.parse(req.body);

      const client = await this.bookRepository.create(body);

      // res.revalidate('/admin/clientes');
      api.get('/admin/produtos/revalidate');

      res.status(201).json(client);
    } catch (error: any) {
      res.status(400).json(new ResponseData(null, error.message, 400));
    }
  }
  public async update(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { id } = req.query;
      const body = bookFormDataSchema.parse(req.body);

      const client = await this.bookRepository.update(id as string, body);

      // res.revalidate('/admin/clientes');
      api.get('/admin/produtos/revalidate');

      res.status(201).json(client);
    } catch (error: any) {
      res.status(400).json(new ResponseData(null, error.message, 400));
    }
  }
  public async home(req: NextApiRequest, res: NextApiResponse) {
    try {
      const page = Number(req.query.page || 1);
      const limit = Number(req.query.limit || 10);
      const search = undefined;
      const books = await this.bookRepository.findAvailableBooks({
        page,
        limit,
        search
      });

      res.status(200).json({
        ...books,
        content: books.content.map(b => new BookDTO(b))
      });
    } catch (error: any) {
      console.log(error);

      res.status(400).json(new ResponseData(null, error.message, 400));
    }
  }
  public async list(req: NextApiRequest, res: NextApiResponse) {
    try {
      const page = Number(req.query.page || 1);
      const limit = Number(req.query.limit || 10);
      const search = undefined;
      // console.log(search);

      const books = await this.bookRepository.list({ page, limit, search });

      res.status(200).json(books);
    } catch (error: any) {
      console.log(error);

      res.status(400).json(new ResponseData(null, error.message, 400));
    }
  }
  public async get(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { id } = req.query;

      const book = await this.bookRepository.findById(id as string);

      if (!book) throw new Error('Livro não encontrado');

      res.status(200).json(new BookDTO(book));
    } catch (error: any) {
      res.status(400).json(new ResponseData(null, error.message, 400));
    }
  }
  public async updateStock(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { id } = req.query;
      const stock = Number(req.body.stock || 0);

      if (stock === 0) throw new Error('Quantidade inválida');

      const book = await this.bookStockRepository.changeStockFromProduct(
        id as string,
        stock
      );

      api.get('/admin/produtos/revalidate');

      res.status(200).json(book);
    } catch (error: any) {
      res.status(400).json(new ResponseData(null, error.message, 400));
    }
  }
}
