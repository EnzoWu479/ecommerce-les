import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { formaters } from '@/helpers/formaters';
import { masks } from '@/helpers/masks';
import { PencilLine, Trash2 } from 'lucide-react';
import { ModalSearch } from '@/components/admin/modal-search';
import { coupomSearchFields } from './utils';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { IPage } from '@/types/page';
import { couponData } from '@/services/data/coupon';
import { CouponTable } from './coupon-table';
import { Suspense } from 'react';
import { Paginate } from '@/components/paginate';

export const dynamic = 'force-dynamic';

const FetchTable = async ({ page }: IPage) => {
  const coupons = await couponData.list({ page: page || 1, limit: 10 });
  return (
    <>
      <div className="mt-5 rounded border">
        {' '}
        <CouponTable coupons={coupons} />
      </div>
      <div className="flex justify-end">
        <Paginate
          page={page ? Number(page) : undefined}
          pageCount={coupons.totalPages || 1}
        />
      </div>
    </>
  );
};

const CategoriesPage = ({ searchParams }: { searchParams: IPage }) => {
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div className="flex gap-4">
          <h2 className="text-3xl font-bold tracking-tight">Cupons</h2>
        </div>
        <Link href="/admin/cupons/cadastrar">
          <Button>Novo cupom</Button>
        </Link>
      </div>
      <div>
        <Suspense fallback="Loading">
          <FetchTable {...searchParams} />
        </Suspense>
      </div>
    </>
  );
};
export default CategoriesPage;
