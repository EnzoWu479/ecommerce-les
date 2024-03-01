import { NextApiRequest, NextApiResponse } from 'next';
import * as yup from 'yup';

export const validationMiddleware = (schema: yup.ObjectSchema<any>) => {
  const middleware = async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: () => Promise<void>
  ) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (error: any) {
      res.status(400).json({ errors: error.errors });
    }
  };
  return middleware;
};
