import { CartController } from '@/server/controllers/CartController';
import { SingletonClass } from '@/server/singleton/SingletonClass';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

// export const config = {
//   api: {
//     externalResolver: true
//   }
// };

console.log("oiie");
const router = createRouter<NextApiRequest, NextApiResponse>();

const cartController = SingletonClass.getInstance(CartController);

// Publica
router
  // .use(authorizationMiddleware([AccountRoles.USER]))
  .get(cartController.getCurrentCart)
  .post(cartController.addProductToCart)
  .put(cartController.updateProductAmount);
  // .get((req, res) => res.status(200).json({oi: "a"}))

export default router.handler();
