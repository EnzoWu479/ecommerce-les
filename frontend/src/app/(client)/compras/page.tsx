import { ClientNavigationMenu } from '@/components/client/client-navigation-menu';
import { ProductCard } from '@/components/client/product-card';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card';
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
import { ClientLayout } from '@/components/layouts/client-layout';
import { ArrowLeftRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { PurchaseTable } from './purchase-table';
import { IPage } from '@/types/page';

export default function Bought({ searchParams }: { searchParams: IPage }) {
  return (
    <ClientLayout>
      <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Compras</h2>
        </div>
        <PurchaseTable {...searchParams} />
      </div>
    </ClientLayout>
  );
}
