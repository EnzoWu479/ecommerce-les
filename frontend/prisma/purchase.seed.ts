import {
  CouponStatus,
  CouponType,
  Gender,
  PrismaClient,
  PurchaseStatus
} from '@prisma/client';
import { fakerPT_BR as faker } from '@faker-js/faker';
import { BookDTO } from '@/server/repositories/dto/BookDTO';
import { getSellPrice } from '@/utils/getSellPrice';

const prisma = new PrismaClient();

const emails = [
  faker.internet.email(),
  faker.internet.email(),
  faker.internet.email(),
  faker.internet.email(),
  faker.internet.email(),
  faker.internet.email(),
  faker.internet.email(),
  faker.internet.email(),
  faker.internet.email(),
  faker.internet.email(),
  faker.internet.email(),
  faker.internet.email(),
  faker.internet.email(),
  faker.internet.email(),
  faker.internet.email(),
  faker.internet.email(),
  faker.internet.email(),
  faker.internet.email(),
  faker.internet.email(),
  faker.internet.email(),
  faker.internet.email(),
  faker.internet.email(),
  faker.internet.email()
];

const main = async () => {
  const books = await prisma.book.findMany({
    select: {
      id: true,
      priceCost: true,
      priceGroup: {
        select: {
          profitPercent: true
        }
      }
    }
  });
  const booksProcessed = books.map(book => ({
    ...book,
    priceSell: getSellPrice(book.priceCost, book.priceGroup?.profitPercent || 0)
  }));
  await Promise.all(
    new Array(500).fill(null).map(async (_, index) => {
      // const person = await prisma.client.create({
      //   data: {
      //     name: faker.person.fullName(),
      //     birthDate: faker.date.between({
      //       from: new Date('1920-01-01'),
      //       to: new Date('2002-01-01')
      //     }),
      //     cpf: `${faker.number.int({ min: 100, max: 999 })}.${faker.number.int({
      //       min: 100,
      //       max: 999
      //     })}.${faker.number.int({ min: 100, max: 999 })}-${faker.number.int({
      //       min: 10,
      //       max: 99
      //     })}`,
      //     gender: faker
      //   }
      // });
      const email =
        emails[faker.number.int({ min: 0, max: emails.length - 1 })];
      console.log(email);

      const state = faker.location.state();
      const city = faker.location.city();
      const person = await prisma.account.upsert({
        create: {
          email: email,
          password: faker.internet.password(),
          client: {
            create: {
              name: faker.person.fullName(),
              birthDate: faker.date.between({
                from: new Date('1920-01-01'),
                to: new Date('2002-01-01')
              }),
              cpf: `${faker.number.int({ min: 100, max: 999 })}.${faker.number.int(
                {
                  min: 100,
                  max: 999
                }
              )}.${faker.number.int({ min: 100, max: 999 })}-${faker.number.int(
                {
                  min: 10,
                  max: 99
                }
              )}`,
              gender: [Gender.FEMALE, Gender.MALE][
                faker.number.int({ min: 0, max: 1 })
              ],
              addresses: {
                create: {
                  name: faker.location.streetAddress(),
                  address: {
                    create: {
                      street: faker.location.street(),
                      neighborhood: faker.location.streetAddress(),
                      city: {
                        connectOrCreate: {
                          create: {
                            name: city,
                            state: {
                              connectOrCreate: {
                                create: {
                                  uf: state
                                },
                                where: {
                                  uf: state
                                }
                              }
                            }
                          },
                          where: {
                            name: city
                          }
                        }
                      },
                      number: String(faker.number.int({ min: 1, max: 9999 })),
                      zipCode: faker.location.zipCode(),
                      observation: faker.lorem.sentence(),
                      residenceType: [
                        'Casa',
                        'Apartamento',
                        'Comercial',
                        'Outro'
                      ][faker.number.int({ min: 0, max: 3 })],
                      streetType: [
                        'Rua',
                        'Avenida',
                        'Praça',
                        'Estrada',
                        'Alameda'
                      ][faker.number.int({ min: 0, max: 4 })]
                    }
                  }
                }
              }
            }
          }
        },
        update: {},
        where: {
          email
        },
        include: {
          client: {
            include: {
              addresses: {
                include: {
                  address: true
                }
              }
            }
          }
        }
      });
      // const person = await prisma.account.findFirst({
      //   where: {
      //     email
      //   },
      //   include: {
      //     client: {
      //       include: {
      //         addresses: {
      //           include: {
      //             address: true
      //           }
      //         }
      //       }
      //     }
      //   }
      // });
      const amountBooks = faker.number.int({ min: 1, max: 5 });
      const booksPurchase: {
        id: string;
        priceCost: number;
        priceSell: number;
        priceGroup: {
          profitPercent: number;
        } | null;
      }[] = [];
      const randomDate = faker.date.past({ years: 1 });
      const discount = faker.number.float({
        min: -80,
        max: 10,
        multipleOf: 0.01
      });
      const shipping = faker.number.float({
        min: 0,
        max: 10,
        multipleOf: 0.01
      });
      const coupon = discount > 0 ? faker.lorem.word() : null;
      const totalValue =
        booksPurchase.reduce((acc, book) => acc + book.priceSell, 0) -
        discount +
        shipping;
      for (let i = 0; i < amountBooks; i++) {
        booksPurchase.push(
          booksProcessed[faker.number.int({ min: 0, max: books.length - 1 })]
        );
      }
      await prisma.purchase.create({
        data: {
          purchasedAt: randomDate,
          status: PurchaseStatus.ENTREGUE,
          totalShipping: shipping,
          totalDiscount: Math.max(discount, 0),
          totalValue: Math.max(totalValue, 0),
          coupons: coupon
            ? {
                connectOrCreate: {
                  create: {
                    code: coupon,
                    status: CouponStatus.ACTIVE,
                    type: faker.number.binary()
                      ? CouponType.PROMOTIONAL
                      : CouponType.TRADE,
                    value: discount
                  },
                  where: {
                    code: coupon
                  }
                }
              }
            : undefined,
          createdAt: randomDate,
          address: {
            connect: {
              id: person?.client?.addresses[0].address?.id
            }
          },
          cart: {
            create: {
              client: {
                connect: {
                  id: person?.client?.id
                }
              },
              productCart: {
                create: booksPurchase.map(book => ({
                  amount: faker.number.int({ min: 1, max: 5 }),
                  book: {
                    connect: {
                      id: book.id
                    }
                  },
                  createdAt: randomDate
                }))
              }
            }
          }
        }
      });
      // await prisma.purchase.create
    })
  );
};

main()
  .then(() => {
    console.log('Books created');

    prisma.$disconnect();
  })
  .catch(e => {
    console.error(e);
    prisma.$disconnect();
  });
