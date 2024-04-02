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
  setPage?: (page: number) => void;
}
export const Paginate = ({ page: currentPage, ...rest }: Props) => {
  const page = currentPage || 1;
  const router = useRouter();
  const pathname = usePathname() as string;

  return (
    <ReactPaginate
      breakLabel={'...'}
      nextLabel={<ChevronRight />}
      previousLabel={<ChevronLeft />}
      pageRangeDisplayed={2}
      onPageChange={e => {
        if (e.selected + 1 === page) return;
        const search = new URLSearchParams(pathname);
        search.set('page', (e.selected + 1).toString());
        router.replace('?' + search.toString());
      }}
      forcePage={page - 1}
      {...rest}
      renderOnZeroPageCount={null}
      className="pagination"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      activeClassName="active"
      previousClassName="nav-prev"
      nextClassName="nav-next"
      previousLinkClassName="page-link"
      nextLinkClassName="page-link"
      breakClassName="break"
    />
  );
};
