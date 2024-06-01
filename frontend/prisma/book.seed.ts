import { PrismaClient } from '@prisma/client';
import { fakerPT_BR as faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const adjetivos = [
  'Fantástico',
  'Incrível',
  'Misterioso',
  'Maravilhoso',
  'Enigmático',
  'Aventuroso',
  'Sombrio',
  'Brilhante'
];
const substantivos = [
  'Segredo',
  'Mistério',
  'Aventura',
  'Jornada',
  'Destino',
  'Reino',
  'Herói',
  'Lenda'
];
const locais = [
  'das Sombras',
  'do Deserto',
  'do Oceano',
  'da Floresta',
  'das Estrelas',
  'do Tempo',
  'dos Sonhos',
  'da Magia'
];
const categorias = [
  'Ação',
  'Aventura',
  'Biografia',
  'Comédia',
  'Drama',
  'Fantasia',
  'Ficção Científica',
  'História',
  'Horror',
  'Mistério',
  'Romance',
  'Suspense',
  'Terror'
];
const priceGroups = [
  {
    name: 'Lucrando pouco',
    profitPercent: 5
  },
  {
    name: 'Lucrando muito',
    profitPercent: 25
  },
  {
    name: 'Lucrando',
    profitPercent: 10
  }
];
const main = async () => {
  await Promise.all(adjetivos.map(async adjetivo => {
    await Promise.all(substantivos.map(async substantivo => {
      await Promise.all(locais.map(async local => {
        // get random category
        console.log(`${adjetivo} ${substantivo} ${local}`);

        const priceGroup =
          priceGroups[
            faker.number.int({ min: 0, max: priceGroups.length - 1 })
          ];
        const categoria = [];
        for (let i = 0; i < faker.number.int({ min: 1, max: 3 }); i++) {
          categoria.push(
            categorias[faker.number.int({ min: 0, max: categorias.length - 1 })]
          );
        }
        await prisma.book.create({
          data: {
            name: `${adjetivo} ${substantivo} ${local}`,
            author: faker.person.fullName(),
            depth: faker.number.int({ min: 1, max: 10 }),
            edition: `Edição ${faker.number.int({ min: 1, max: 10 })}`,
            publisher: faker.company.name(),
            height: faker.number.float({ min: 10, max: 30, multipleOf: 0.01 }),
            width: faker.number.float({ min: 10, max: 30, multipleOf: 0.01 }),
            // "isbn": "978-0-7432-7356-5",
            isbn: `${faker.number.int({ min: 100, max: 999 })}-0-${faker.number.int({ min: 1000, max: 9999 })}-${faker.number.int({ min: 1000, max: 9999 })}-${faker.number.int({ min: 0, max: 9 })}`,
            manufacturer: faker.company.name(),
            numberPages: faker.number.int({ min: 100, max: 500 }),
            weight: faker.number.float({ min: 0.5, max: 2, multipleOf: 0.01 }),
            priceCost: faker.number.float({
              min: 50,
              max: 100,
              multipleOf: 0.01
            }),
            synopsis: faker.lorem.paragraph(),
            year: faker.date.past({ years: 30 }).getFullYear(),
            categories: {
              connectOrCreate: categoria.map(cat => {
                return {
                  where: { name: cat },
                  create: { name: cat }
                };
              })
            },
            priceGroup: {
              connectOrCreate: {
                where: { name: priceGroup.name },
                create: {
                  name: priceGroup.name,
                  profitPercent: priceGroup.profitPercent
                }
              }
            },
            stock: {
              create: {
                quantity: faker.number.int({ min: 100, max: 10000 })
              }
            }
          }
        });
      }));
    }));
  }));
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
