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

const ProductList = () => {
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div className="flex gap-4">
          <h2 className="text-3xl font-bold tracking-tight">Produtos</h2>
          <ModalSearch fields={productSearchFields} />
        </div>
        <Button asChild>
          <Link href="/admin/auth/produtos/cadastrar">Novo produto</Link>
        </Button>
      </div>
      <div className="mt-5 rounded border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código SKU</TableHead>
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
              <TableCell>1</TableCell>
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
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>Billing</DropdownMenuItem>
                      <DropdownMenuItem>Billing</DropdownMenuItem>
                      <DropdownMenuItem>Billing</DropdownMenuItem>
                      <DropdownMenuItem>Billing</DropdownMenuItem>
                      <DropdownMenuItem>Billing</DropdownMenuItem>
                      <DropdownMenuItem>Billing</DropdownMenuItem>
                      <DropdownMenuItem>Billing</DropdownMenuItem>
                      <DropdownMenuItem>Team</DropdownMenuItem>
                      <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
              <TableCell>
                <div>
                  <Select>
                    <SelectTrigger className="w-[170px] border-none outline-none">
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status da compra</SelectLabel>
                        <SelectItem value="a">Em processamento</SelectItem>
                        <SelectItem value="b">Em transporte</SelectItem>
                        <SelectItem value="c">Em transito</SelectItem>
                        <SelectItem value="d">Entregue</SelectItem>
                        <SelectItem value="h">Aprovado</SelectItem>
                        <SelectItem value="i">Reprovado</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Link href={`/admin/auth/produtos/${1}`}>
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
