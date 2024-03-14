import { placeholderImage } from '@/lib/placeholderImage';
import { IProduct } from '@/types/product';

export const productsMock: IProduct[] = [
  {
    id: '4',
    name: 'Book 4',
    author: 'Author 4',
    description:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    year: 2021,
    publisher: 'Publisher 4',
    edition: '1st Edition',
    isbn: '978-1-234567-89-0',
    numberOfPages: 200,
    imageSrc: placeholderImage({ preview: 'Book 4' }),
    price: 8.99,
    dimensions: {
      id: '4',
      height: 20,
      width: 15,
      weight: 0.5,
      depth: 2
    },
    priceGroup: {
      name: 'Group 1',
      profitMarginPercent: 10
    },
    categories: [
      {
        id: '1',
        name: 'Category 1'
      },
      {
        id: '2',
        name: 'Category 2'
      },
      {
        id: '3',
        name: 'Category 3'
      }
    ]
  },
  {
    id: '5',
    name: 'Book 5',
    author: 'Author 5',
    description:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    year: 2022,
    publisher: 'Publisher 5',
    edition: '2nd Edition',
    isbn: '978-2-345678-90-1',
    numberOfPages: 250,
    imageSrc: placeholderImage({ preview: 'Book 5' }),
    price: 9.99,
    dimensions: {
      id: '5',
      height: 25,
      width: 18,
      weight: 0.6,
      depth: 3
    },
    priceGroup: {
      name: 'Group 2',
      profitMarginPercent: 15
    },
    categories: [
      {
        id: '4',
        name: 'Category 4'
      },
      {
        id: '5',
        name: 'Category 5'
      },
      {
        id: '6',
        name: 'Category 6'
      }
    ]
  },
  {
    id: '6',
    name: 'Book 6',
    author: 'Author 6',
    description:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    year: 2023,
    publisher: 'Publisher 6',
    edition: '3rd Edition',
    isbn: '978-3-456789-01-2',
    numberOfPages: 300,
    imageSrc: placeholderImage({ preview: 'Book 6' }),
    price: 10.99,
    dimensions: {
      id: '6',
      height: 30,
      width: 20,
      weight: 0.7,
      depth: 4
    },
    priceGroup: {
      name: 'Group 3',
      profitMarginPercent: 20
    },
    categories: [
      {
        id: '7',
        name: 'Category 7'
      },
      {
        id: '8',
        name: 'Category 8'
      },
      {
        id: '9',
        name: 'Category 9'
      }
    ]
  },
  {
    id: '7',
    name: 'Book 7',
    author: 'Author 7',
    description:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    year: 2024,
    publisher: 'Publisher 7',
    edition: '4th Edition',
    isbn: '978-4-567890-12-3',
    numberOfPages: 350,
    imageSrc: placeholderImage({ preview: 'Book 7' }),
    price: 11.99,
    dimensions: {
      id: '7',
      height: 35,
      width: 22,
      weight: 0.8,
      depth: 5
    },
    priceGroup: {
      name: 'Group 4',
      profitMarginPercent: 25
    },
    categories: [
      {
        id: '10',
        name: 'Category 10'
      },
      {
        id: '11',
        name: 'Category 11'
      },
      {
        id: '12',
        name: 'Category 12'
      }
    ]
  },
  {
    id: '8',
    name: 'Book 8',
    author: 'Author 8',
    description:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    year: 2025,
    publisher: 'Publisher 8',
    edition: '5th Edition',
    isbn: '978-5-678901-23-4',
    numberOfPages: 400,
    imageSrc: placeholderImage({ preview: 'Book 8' }),
    price: 12.99,
    dimensions: {
      id: '8',
      height: 40,
      width: 24,
      weight: 0.9,
      depth: 6
    },
    priceGroup: {
      name: 'Group 5',
      profitMarginPercent: 30
    },
    categories: [
      {
        id: '13',
        name: 'Category 13'
      },
      {
        id: '14',
        name: 'Category 14'
      },
      {
        id: '15',
        name: 'Category 15'
      }
    ]
  },
  {
    id: '9',
    name: 'Book 9',
    author: 'Author 9',
    description:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    year: 2026,
    publisher: 'Publisher 9',
    edition: '6th Edition',
    isbn: '978-6-789012-34-5',
    numberOfPages: 450,
    imageSrc: placeholderImage({ preview: 'Book 9' }),
    price: 13.99,
    dimensions: {
      id: '9',
      height: 45,
      width: 26,
      weight: 1.0,
      depth: 7
    },
    priceGroup: {
      name: 'Group 6',
      profitMarginPercent: 35
    },
    categories: [
      {
        id: '16',
        name: 'Category 16'
      },
      {
        id: '17',
        name: 'Category 17'
      },
      {
        id: '18',
        name: 'Category 18'
      }
    ]
  },
  {
    id: '10',
    name: 'Book 10',
    author: 'Author 10',
    description:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    year: 2027,
    publisher: 'Publisher 10',
    edition: '7th Edition',
    isbn: '978-7-890123-45-6',
    numberOfPages: 500,
    imageSrc: placeholderImage({ preview: 'Book 10' }),
    price: 14.99,
    dimensions: {
      id: '10',
      height: 50,
      width: 28,
      weight: 1.1,
      depth: 8
    },
    priceGroup: {
      name: 'Group 7',
      profitMarginPercent: 40
    },
    categories: [
      {
        id: '19',
        name: 'Category 19'
      },
      {
        id: '20',
        name: 'Category 20'
      },
      {
        id: '21',
        name: 'Category 21'
      }
    ]
  },
  {
    id: '11',
    name: 'Book 11',
    author: 'Author 11',
    description:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    year: 2028,
    publisher: 'Publisher 11',
    edition: '8th Edition',
    isbn: '978-8-901234-56-7',
    numberOfPages: 550,
    imageSrc: placeholderImage({ preview: 'Book 11' }),
    price: 15.99,
    dimensions: {
      id: '11',
      height: 55,
      width: 30,
      weight: 1.2,
      depth: 9
    },
    priceGroup: {
      name: 'Group 8',
      profitMarginPercent: 45
    },
    categories: [
      {
        id: '22',
        name: 'Category 22'
      },
      {
        id: '23',
        name: 'Category 23'
      },
      {
        id: '24',
        name: 'Category 24'
      }
    ]
  },
  {
    id: '12',
    name: 'Book 12',
    author: 'Author 12',
    description:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    year: 2029,
    publisher: 'Publisher 12',
    edition: '9th Edition',
    isbn: '978-9-012345-67-8',
    numberOfPages: 600,
    imageSrc: placeholderImage({ preview: 'Book 12' }),
    price: 16.99,
    dimensions: {
      id: '12',
      height: 60,
      width: 32,
      weight: 1.3,
      depth: 10
    },
    priceGroup: {
      name: 'Group 9',
      profitMarginPercent: 50
    },
    categories: [
      {
        id: '25',
        name: 'Category 25'
      },
      {
        id: '26',
        name: 'Category 26'
      },
      {
        id: '27',
        name: 'Category 27'
      }
    ]
  },
  {
    id: '13',
    name: 'Book 13',
    author: 'Author 13',
    description:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    year: 2030,
    publisher: 'Publisher 13',
    edition: '10th Edition',
    isbn: '978-0-123456-78-9',
    numberOfPages: 650,
    imageSrc: placeholderImage({ preview: 'Book 13' }),
    price: 17.99,
    dimensions: {
      id: '13',
      height: 65,
      width: 34,
      weight: 1.4,
      depth: 11
    },
    priceGroup: {
      name: 'Group 10',
      profitMarginPercent: 55
    },
    categories: [
      {
        id: '28',
        name: 'Category 28'
      },
      {
        id: '29',
        name: 'Category 29'
      },
      {
        id: '30',
        name: 'Category 30'
      }
    ]
  },
  {
    id: '14',
    name: 'Book 14',
    author: 'Author 14',
    description:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    year: 2031,
    publisher: 'Publisher 14',
    edition: '11th Edition',
    isbn: '978-1-234567-89-0',
    numberOfPages: 700,
    imageSrc: placeholderImage({ preview: 'Book 14' }),
    price: 18.99,
    dimensions: {
      id: '14',
      height: 70,
      width: 36,
      weight: 1.5,
      depth: 12
    },
    priceGroup: {
      name: 'Group 11',
      profitMarginPercent: 60
    },
    categories: [
      {
        id: '31',
        name: 'Category 31'
      },
      {
        id: '32',
        name: 'Category 32'
      },
      {
        id: '33',
        name: 'Category 33'
      }
    ]
  },
  {
    id: '15',
    name: 'Book 15',
    author: 'Author 15',
    description:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    year: 2032,
    publisher: 'Publisher 15',
    edition: '12th Edition',
    isbn: '978-2-345678-90-1',
    numberOfPages: 750,
    imageSrc: placeholderImage({ preview: 'Book 15' }),
    price: 19.99,
    dimensions: {
      id: '15',
      height: 75,
      width: 38,
      weight: 1.6,
      depth: 13
    },
    priceGroup: {
      name: 'Group 12',
      profitMarginPercent: 65
    },
    categories: [
      {
        id: '34',
        name: 'Category 34'
      },
      {
        id: '35',
        name: 'Category 35'
      },
      {
        id: '36',
        name: 'Category 36'
      }
    ]
  }
];
