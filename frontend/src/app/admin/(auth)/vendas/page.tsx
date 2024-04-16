'use client';
import { ModalSearch } from '@/components/admin/modal-search';
import { Button } from '@/components/ui/button';
import {
  Dialog,
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { formaters } from '@/helpers/formaters';
import { masks } from '@/helpers/masks';
import { ArrowLeftRight, Eye, PencilLine, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { sellSearchFields } from './utils';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Suspense, useState } from 'react';
import { Label } from '@/components/ui/label';
import { purchaseData } from '@/services/data/purchase';
import { IPage } from '@/types/page';
import { SellTable } from './sell-table';

const FetchTableSell = async ({ page }: IPage) => {
  const sells = await purchaseData.listAll({ page: page || 1, limit: 10 });
  console.log(sells);

  return <SellTable sells={sells} />;
};

const SellsPage = ({ searchParams }: { searchParams: IPage }) => {
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div className="flex gap-4">
          <h2 className="text-3xl font-bold tracking-tight">Vendas</h2>
          {/* <ModalSearch fields={sellSearchFields} /> */}
        </div>
      </div>
      <Suspense fallback="Loading">
        <FetchTableSell {...searchParams} />
      </Suspense>
    </>
  );
};
export default SellsPage;
