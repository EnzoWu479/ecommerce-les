import { Prisma } from '@prisma/client';

export type TradeReturn = Prisma.TradeRequestGetPayload<{
  include: {
    books: {
      include: {
        product: {
          include: {
            book: {
              include: {
                priceGroup: true;
              };
            };
          };
        };
      };
    };
    client: true;
    coupon: true;
  };
}>;
