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
interface Props {
  type: 'product' | 'category';
}
export const DashboardChart = ({ type }: Props) => {
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
              {type === 'product'
                ? 'Produtos mais vendidos'
                : 'Categorias mais vendidas'}
            </CardTitle>
            <CardDescription>You made 265 sales this month.</CardDescription>
          </div>
          <SelectNavigator keyword="type" value={type}>
            <SelectTrigger className="w-auto">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="product">Produtos</SelectItem>
              <SelectItem value="category">Categorias</SelectItem>
            </SelectContent>
          </SelectNavigator>
        </CardHeader>

        <CardContent>
          <RecentSales />
        </CardContent>
      </Card>
    </div>
  );
};
