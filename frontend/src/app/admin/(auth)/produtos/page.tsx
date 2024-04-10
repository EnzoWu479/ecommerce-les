import { ModalSearch } from '@/components/admin/modal-search';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { formaters } from '@/helpers/formaters';
import { masks } from '@/helpers/masks';
import { ArrowUpLeftFromSquare, PencilLine, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { productSearchFields } from './utils';
import { Input } from '@/components/ui/input';
import { ModalWarning } from '@/components/modal-warning';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { ActivatePopOver } from './components/activate-pop-over';
import { productData } from '@/data/product';
import { ProductTable } from './product-table';
import { Paginate } from '@/components/paginate';
import { IPage } from '@/types/page';
import { Suspense } from 'react';

type Props = IPage;

const ClientTableFetch = async ({ page }: Props) => {
  const products = await productData.getList({
    page: page || 1,
    limit: 10
    // search: clientSearchParams
  });
  return (
    <>
      <div className="mt-5 rounded border">
        <ProductTable products={products} />
      </div>
      <div className="flex justify-end">
        <Paginate
          page={page}
          pageCount={products.totalPages || 1}
          // searchParams={clientSearchParams}
        />
      </div>
    </>
  );
};

const ProductList = () => {
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div className="flex gap-4">
          <h2 className="text-3xl font-bold tracking-tight">Produtos</h2>
          <ModalSearch fields={productSearchFields} />
        </div>
        <Button asChild>
          <Link href="/admin/produtos/cadastrar">Novo produto</Link>
        </Button>
      </div>
      <Suspense fallback="Loading">
        <ClientTableFetch />
      </Suspense>
    </>
  );
};
export default ProductList;
