'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from './ui/pagination';
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';
import { usePathname, useRouter } from 'next/navigation';

interface Props extends ReactPaginateProps {
  containerStyle?: React.CSSProperties;
  page?: number;
  searchParams?: Record<string, string>;
  setPage?: (page: number) => void;
}
export const Paginate = ({
  page: currentPage,
  searchParams,
  ...rest
}: Props) => {
  const page = currentPage || 1;
  const router = useRouter();
  const pathname = usePathname() as string;
  console.log(page);

  const pageStyle =
    'w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 text-slate-800 cursor-pointer hover:bg-slate-800 hover:text-slate-200 transition-colors duration-200';
  const linkStyle =
    'w-full h-full flex items-center justify-center rounded-full';

  return (
    <ReactPaginate
      breakLabel={'...'}
      nextLabel={<ChevronRight />}
      previousLabel={<ChevronLeft />}
      pageRangeDisplayed={2}
      onPageChange={e => {
        console.log(e.selected);
        console.log('page' + page);
        console.log(e.selected);

        if (e.selected + 1 === page) return;
        console.log('page' + page);

        const search = new URLSearchParams();
        search.set('page', (e.selected + 1).toString());
        for (const key in searchParams) {
          search.set(key, searchParams[key]);
        }
        router.replace('?' + search.toString());
      }}
      forcePage={page - 1}
      {...rest}
      renderOnZeroPageCount={null}
      className="my-4 flex items-center space-x-2"
      activeClassName="!bg-slate-800 !text-slate-200"
      disabledClassName="cursor-not-allowed opacity-50"
      disabledLinkClassName="cursor-not-allowed opacity-50"
      pageClassName={pageStyle}
      previousClassName={pageStyle}
      nextClassName={pageStyle}
      pageLinkClassName={linkStyle}
      nextLinkClassName={linkStyle}
      previousLinkClassName={linkStyle}
    />
  );
};
