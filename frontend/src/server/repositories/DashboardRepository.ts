import { PrismaClient, PurchaseStatus } from '@prisma/client';
import { prisma } from '@/server/lib/prisma';
import {
  DashboardScale,
  getIdealDashboardScale
} from '@/utils/getIdealDashboardScale';
import {
  DashboardChart,
  DashboardDataset,
  DashboardInfos,
  DashboardRequest,
  DashboardWithoutCategoryGroups
} from '@/types/dashboard';
import { groupBy } from '@/utils/groupBy';
import { getDashboardLabels } from '@/utils/getDashboardLabels';

type DashboardWithoutScale = Omit<DashboardRequest, 'scale'>;
type DashboardResponseWithoutLabels = Omit<DashboardChart, 'labels'>;

export class DashboardRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }
  async getChart(request: DashboardRequest) {
    const idealScale = getIdealDashboardScale(request.start, request.end);
    console.log(idealScale);

    switch (idealScale) {
      case DashboardScale.DAILY:
        return this.getChartDaily(request);
      case DashboardScale.MONTHLY:
        return this.getChartMonthly(request);
      case DashboardScale.YEARLY:
        return this.getChartYearly(request);
    }
  }

  async getInfos(request: DashboardWithoutCategoryGroups): Promise<DashboardInfos> {
    const amountSells = await this.prisma.purchase.findMany({
      where: {
        purchasedAt: {
          gte: new Date(request.start),
          lte: new Date(request.end)
        }
      },
      select: {
        totalValue: true
      }
    });
    const sellsValues = amountSells.reduce((acc, sell) => {
      return acc + sell.totalValue;
    }, 0);
    const amountUsers = await this.prisma.account.count({
      where: {
        createdAt: {
          gte: new Date(request.start),
          lte: new Date(request.end)
        }
      }
    });
    const amountProductsSell = await this.prisma.productCart.findMany({
      where: {
        cart: {
          purchase: {
            isNot: null,
            is: {
              purchasedAt: {
                gte: new Date(request.start),
                lte: new Date(request.end)
              }
            }
          }
        }
      }
    });
    const amountSellProducts = amountProductsSell.reduce((acc, product) => {
      return acc + product.amount;
    }, 0);
    
    return {
      amountSells: sellsValues,
      amountUsers,
      amountSellProducts
    };
  }

  private async getChartDaily({
    start,
    end,
    categoryGroups
  }: DashboardWithoutScale): Promise<DashboardChart> {
    const labels = getDashboardLabels(start, end, DashboardScale.DAILY);
    console.log('labels', categoryGroups);

    const allCategories = await this.prisma.bookCategory.findMany({
      where: {
        id: {
          in: categoryGroups.flat()
        }
      },
      select: {
        id: true,
        name: true
      }
    });
    const categories = await Promise.all(
      categoryGroups.map(async categoryGroup => {
        const label = categoryGroup
          .map(categoryId => {
            const category = allCategories.find(cat => cat.id === categoryId);
            return category?.name || 'Unknown';
          })
          .join(', ');

        const products = await this.prisma.productCart.findMany({
          where: {
            cart: {
              purchase: {
                isNot: null,
                is: {
                  purchasedAt: {
                    gte: new Date(start),
                    lte: new Date(end)
                  }
                }
              }
            },
            book: {
              categories: {
                some: {
                  id: {
                    in: categoryGroup
                  }
                }
              }
            }
          },
          select: {
            amount: true,
            book: {
              select: {
                categories: true
              }
            },
            cart: {
              select: {
                purchase: {
                  select: {
                    purchasedAt: true
                  }
                }
              }
            }
          }
        });
        const filteredProducts = products.filter(product => {
          const categoryIds = product.book.categories.map(
            category => category.id
          );
          return categoryGroup.every(category =>
            categoryIds.includes(category)
          );
        });
        const dataByDate = labels.map(label => {
          const amount = filteredProducts.reduce((acc, categoryData) => {
            return (
              acc +
              (categoryData.cart.purchase?.purchasedAt.getDate() ===
              new Date(label).getDate()
                ? categoryData.amount
                : 0)
            );
          }, 0);
          return amount;
        });

        return {
          label,
          data: dataByDate
        };
      })
    );
    return {
      labels,
      datasets: categories
    };
  }

  private async getChartMonthly({
    start,
    end,
    categoryGroups
  }: DashboardWithoutScale): Promise<DashboardChart> {
    const labels = getDashboardLabels(start, end, DashboardScale.MONTHLY);
    console.log(labels);

    const allCategories = await this.prisma.bookCategory.findMany({
      where: {
        id: {
          in: categoryGroups.flat()
        }
      },
      select: {
        id: true,
        name: true
      }
    });

    const categories = await Promise.all(
      categoryGroups.map(async categoryGroup => {
        const label = categoryGroup
          .map(categoryId => {
            const category = allCategories.find(cat => cat.id === categoryId);
            return category?.name || 'Unknown';
          })
          .join(', ');
        const products = await this.prisma.productCart.findMany({
          where: {
            cart: {
              purchase: {
                isNot: null,
                is: {
                  purchasedAt: {
                    gte: new Date(start),
                    lte: new Date(end)
                  }
                }
              }
            },
            book: {
              categories: {
                some: {
                  id: {
                    in: categoryGroup
                  }
                }
              }
            }
          },
          select: {
            amount: true,
            book: {
              select: {
                categories: true
              }
            },
            cart: {
              select: {
                purchase: {
                  select: {
                    purchasedAt: true
                  }
                }
              }
            }
          }
        });
        const filteredProducts = products.filter(product => {
          const categoryIds = product.book.categories.map(
            category => category.id
          );
          return categoryGroup.every(category =>
            categoryIds.includes(category)
          );
        });
        const dataByDate = labels.map(label => {
          const amount = filteredProducts.reduce((acc, categoryData) => {
            return (
              acc +
              (categoryData.cart.purchase?.purchasedAt.getMonth() ===
              new Date(label).getMonth()
                ? categoryData.amount
                : 0)
            );
          }, 0);
          return amount;
        });
        console.log(dataByDate);

        return {
          label,
          data: dataByDate
        };
      })
    );

    return {
      labels,
      datasets: categories
    };
  }
  private async getChartYearly({
    start,
    end,
    categoryGroups
  }: DashboardWithoutScale): Promise<DashboardChart> {
    const labels = getDashboardLabels(start, end, DashboardScale.YEARLY);
    const allCategories = await this.prisma.bookCategory.findMany({
      where: {
        id: {
          in: categoryGroups.flat()
        }
      },
      select: {
        id: true,
        name: true
      }
    });

    const categories = await Promise.all(
      categoryGroups.map(async categoryGroup => {
        const label = categoryGroup
          .map(categoryId => {
            const category = allCategories.find(cat => cat.id === categoryId);
            return category?.name || 'Unknown';
          })
          .join(', ');
        // const data = await Promise.all(
        //   categoryGroups.map(async categoryGroup => {
        const products = await this.prisma.productCart.findMany({
          where: {
            cart: {
              purchase: {
                isNot: null,
                is: {
                  purchasedAt: {
                    gte: new Date(start),
                    lte: new Date(end)
                  }
                }
              }
            },
            book: {
              categories: {
                some: {
                  id: {
                    in: categoryGroup
                  }
                }
              }
            }
          },
          select: {
            createdAt: true,
            amount: true,
            book: {
              select: {
                categories: true
              }
            },
            cart: {
              select: {
                purchase: {
                  select: {
                    purchasedAt: true
                  }
                }
              }
            }
          }
        });
        const filteredProducts = products.filter(product => {
          const categoryIds = product.book.categories.map(
            category => category.id
          );
          return categoryGroup.every(category =>
            categoryIds.includes(category)
          );
        });
        //     return amount;
        //   })
        // );
        const dataByDate = labels.map(label => {
          const amount = filteredProducts.reduce((acc, categoryData) => {
            return (
              acc +
              (categoryData.cart.purchase?.purchasedAt.getFullYear() ===
              new Date(label).getFullYear()
                ? categoryData.amount
                : 0)
            );
          }, 0);
          return amount;
        });
        // console.log(data);

        return {
          label,
          data: dataByDate
        };
      })
    );

    return {
      labels,
      datasets: categories
    };
  }
}
