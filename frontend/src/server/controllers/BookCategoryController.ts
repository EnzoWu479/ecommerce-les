import { bookFormSchema } from '@/validations/bookForm.schema';
import { NextApiRequest, NextApiResponse } from 'next';
import { BookRepository } from '../repositories/BookRepository';
import { ResponseData } from '../shared/ResponseDataImp';
import { api } from '@/lib/axios';
import { SingletonClass } from '../singleton/SingletonClass';
import { BookCategoryRepository } from '../repositories/BookCategoryRepository';

export class BookCategoryController {
  private bookCategoryRepository: BookCategoryRepository;
  constructor() {
    this.bookCategoryRepository = new BookCategoryRepository();
    this.create = this.create.bind(this);
    this.list = this.list.bind(this);
  }
  public async create(req: NextApiRequest, res: NextApiResponse) {
    try {
      const body = bookFormSchema.parse(req.body);

      const client = await this.bookCategoryRepository.create(body);

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
      const body = bookFormSchema.parse(req.body);

      const client = await this.bookCategoryRepository.update(
        id as string,
        body
      );

      // res.revalidate('/admin/clientes');
      api.get('/admin/produtos/revalidate');

      res.status(201).json(client);
    } catch (error: any) {
      res.status(400).json(new ResponseData(null, error.message, 400));
    }
  }
  public async list(req: NextApiRequest, res: NextApiResponse) {
    try {
      const bookCategories = await this.bookCategoryRepository.getAll();

      res.status(200).json(bookCategories);
    } catch (error: any) {
      console.log(error);

      res.status(400).json(new ResponseData(null, error.message, 400));
    }
  }
  public async delete(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { id } = req.query;

      await this.bookCategoryRepository.delete(id as string);

      // res.revalidate('/admin/clientes');
      api.get('/admin/produtos/revalidate');

      res.status(204).end();
    } catch (error: any) {
      res.status(400).json(new ResponseData(null, error.message, 400));
    }
  }
}
