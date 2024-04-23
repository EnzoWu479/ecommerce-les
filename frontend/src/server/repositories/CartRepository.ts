import { PrismaClient } from '@prisma/client';
import { prisma } from '@/server/lib/prisma';
export class CartRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = prisma;
  }

  public async listByClient(clientId: string) {
    return await this.prisma.cart.findMany({
      where: {
        clientId
      },
      include: {
        productCart: {
          include: {
            book: {
              include: {
                priceGroup: true
              }
            }
          }
        },
        purchase: true
      }
    });
  }
  public async getCurrentCart(accountId: string) {
    const cart = await this.prisma.cart.findFirst({
      where: {
        client: {
          account: {
            id: accountId
          }
        },
        purchase: null
      },
      include: {
        productCart: {
          include: {
            book: {
              include: {
                priceGroup: true
              }
            }
          }
        }
      }
    });
    if (!cart) {
      const client = await this.prisma.client.findFirst({
        where: {
          account: {
            id: accountId
          }
        }
      });
      if (!client) {
        throw new Error('Client not found');
      }
      return await this.prisma.cart.create({
        data: {
          client: {
            connect: {
              id: client.id
            }
          }
        },
        include: {
          productCart: {
            include: {
              book: {
                include: {
                  priceGroup: true
                }
              }
            }
          }
        }
      });
    }
    return cart;
  }
  public async addProductToCart(
    clientId: string,
    productId: string,
    quantity: number
  ) {
    const currentCart = await this.getCurrentCart(clientId);

    if (currentCart.productCart.some(product => product.bookId === productId)) {
      return this.updateProductQuantity(clientId, productId, quantity);
    }

    return this.prisma.cart.update({
      where: {
        id: currentCart.id
      },
      data: {
        productCart: {
          create: {
            amount: quantity,
            book: {
              connect: {
                id: productId
              }
            }
          }
        }
      },
      include: {
        productCart: {
          include: {
            book: {
              include: {
                priceGroup: true
              }
            }
          }
        }
      }
    });
  }
  public async removeProductFromCart(clientId: string, productId: string) {
    const currentCart = await this.getCurrentCart(clientId);
    if (!currentCart) {
      throw new Error('Cart not found');
    }
    return this.prisma.cart.update({
      where: {
        id: currentCart.id
      },
      data: {
        productCart: {
          deleteMany: {
            bookId: productId
          }
        }
      },
      include: {
        productCart: {
          include: {
            book: {
              include: {
                priceGroup: true
              }
            }
          }
        }
      }
    });
  }
  public async updateProductQuantity(
    clientId: string,
    productId: string,
    quantity: number
  ) {
    const currentCart = await this.getCurrentCart(clientId);
    if (!currentCart) {
      throw new Error('Cart not found');
    }
    if (quantity === 0) {
      return await this.removeProductFromCart(clientId, productId);
    }
    console.log(quantity);

    const product = await this.prisma.productCart.findFirst({
      where: {
        cartId: currentCart.id,
        bookId: productId
      },
      include: {
        book: {
          include: {
            stock: true
          }
        }
      }
    });

    if (!product) {
      throw new Error('Product not found');
    }
    if ((product?.book?.stock?.quantity || 0) < quantity) {
      throw new Error('Stock not available');
    }

    return this.prisma.cart.update({
      where: {
        id: currentCart.id
      },
      data: {
        productCart: {
          updateMany: {
            where: {
              bookId: productId
            },
            data: {
              amount: quantity
            }
          }
        }
      },
      include: {
        productCart: {
          include: {
            book: {
              include: {
                priceGroup: true
              }
            }
          }
        }
      }
    });
  }
}
