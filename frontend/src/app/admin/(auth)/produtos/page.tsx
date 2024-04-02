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
      <div className="mt-5 rounded border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código ISBN</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Custo</TableHead>
              <TableHead>Preço de venda</TableHead>
              <TableHead>Fabricante</TableHead>
              <TableHead>Estoque</TableHead>
              <TableHead>Categorias</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Opções</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>978312732</TableCell>
              <TableCell>Livro do Harry Potter</TableCell>
              <TableCell>{formaters.money(10)}</TableCell>
              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>{formaters.money(12)}</TooltipTrigger>
                    <TooltipContent>{20}%</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell>Editora Violet</TableCell>
              <TableCell>2</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger className="hover:underline">
                    Ver categorias
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Categorias</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="max-h-48 overflow-auto">
                      <DropdownMenuItem>Magia</DropdownMenuItem>
                      <DropdownMenuItem>Bruxaria</DropdownMenuItem>
                      <DropdownMenuItem>Aventura</DropdownMenuItem>
                      <DropdownMenuItem>Ação</DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
              <TableCell>
                <div>
                  <ActivatePopOver active />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Link href={`/admin/produtos/${1}`}>
                    <PencilLine />
                  </Link>
                  <Dialog>
                    <DialogTrigger>
                      <ArrowUpLeftFromSquare />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Harry Potter</DialogTitle>
                        <DialogDescription>
                          Entre com a quantidade que deseja adicionar ou remover
                          do estoque
                        </DialogDescription>
                      </DialogHeader>
                      <div>
                        <Input />
                        <div className="mt-2 flex gap-2">
                          <Button>Adicionar</Button>
                          <Button>Remover</Button>
                          <DialogClose asChild>
                            <Button variant={'ghost'}>Cancelar</Button>
                          </DialogClose>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <ModalWarning
                    title="Tem certeza que deseja excluir esse produto?"
                    description="Essa ação não poderá ser desfeita."
                    acceptButton="Excluir"
                  />
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>421534536</TableCell>
              <TableCell>Livro do Harry Potter 2</TableCell>
              <TableCell>{formaters.money(24)}</TableCell>
              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>{formaters.money(28)}</TooltipTrigger>
                    <TooltipContent>{20}%</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell>Editora Violet</TableCell>
              <TableCell>4</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger className="hover:underline">
                    Ver categorias
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Categorias</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="max-h-48 overflow-auto">
                      <DropdownMenuItem>Magia</DropdownMenuItem>
                      <DropdownMenuItem>Bruxaria</DropdownMenuItem>
                      <DropdownMenuItem>Aventura</DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
              <TableCell>
                <div>
                  <ActivatePopOver active={false} />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Link href={`/admin/produtos/${1}`}>
                    <PencilLine />
                  </Link>
                  <Dialog>
                    <DialogTrigger>
                      <ArrowUpLeftFromSquare />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Harry Potter</DialogTitle>
                        <DialogDescription>
                          Entre com a quantidade que deseja adicionar ou remover
                          do estoque
                        </DialogDescription>
                      </DialogHeader>
                      <div>
                        <Input />
                        <div className="mt-2 flex gap-2">
                          <Button>Adicionar</Button>
                          <Button>Remover</Button>
                          <DialogClose asChild>
                            <Button variant={'ghost'}>Cancelar</Button>
                          </DialogClose>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <ModalWarning
                    title="Tem certeza que deseja excluir esse produto?"
                    description="Essa ação não poderá ser desfeita."
                    acceptButton="Excluir"
                  />
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};
export default ProductList;
