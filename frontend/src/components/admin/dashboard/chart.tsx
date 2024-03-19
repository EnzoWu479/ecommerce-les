'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Overview } from './overview';
import { SelectNavigator } from '@/components/select-navigator';
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { RecentSales } from './recent-sales';
import { SelectMultiple } from '@/components/ui/select-multiple';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
interface Props {
  type: 'product' | 'category';
}

const categoriesAvailable = [
  { label: 'Categoria 1', value: '1' },
  { label: 'Categoria 2', value: '2' },
  { label: 'Categoria 3', value: '3' },
  { label: 'Categoria 4', value: '4' }
];

export const DashboardChart = ({ type }: Props) => {
  const [categoriesGroups, setCategoriesGroups] = useState<string[][]>([]);
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <Overview />
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>
              {/* {type === 'product'
                ? 'Produtos mais vendidos'
                : 'Categorias mais vendidas'} */}
              Compare grupos de categorias
            </CardTitle>
            {/* <CardDescription>You made 265 sales this month.</CardDescription> */}
          </div>
          {/* <SelectNavigator keyword="type" value={type}>
            <SelectTrigger className="w-auto">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="product">Produtos</SelectItem>
              <SelectItem value="category">Categorias</SelectItem>
            </SelectContent>
          </SelectNavigator> */}
        </CardHeader>

        <CardContent>
          <div className="space-y-2">
            {categoriesGroups.map((categories, index) => (
              <div className="flex items-center gap-2">
                <SelectMultiple
                  value={categories}
                  onChange={value => {
                    const newCategoriesGroups = [...categoriesGroups];
                    newCategoriesGroups[index] = value;
                    setCategoriesGroups(newCategoriesGroups);
                  }}
                  options={categoriesAvailable}
                />
                <button
                  onClick={() =>
                    setCategoriesGroups(prev =>
                      prev.filter((_, i) => i !== index)
                    )
                  }
                >
                  <Trash />
                </button>
              </div>
            ))}
            <Button
              className="w-full"
              onClick={() => setCategoriesGroups(prev => [...prev, []])}
            >
              Adicionar grupo de categorias
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
