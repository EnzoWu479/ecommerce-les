'use client';
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
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
import { Ban, PencilLine, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const SellsPage = () => {
  const [accepted, setAccepted] = useState(false);
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Trocas</h2>
      </div>
      <div className="mt-5 rounded border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Produtos</TableHead>
              <TableHead>Valor trocado</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Cupom gerado</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>João</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger className="hover:underline">
                    Ver produtos
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Produtos</DropdownMenuLabel>
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
              <TableCell>{formaters.money(54)}</TableCell>
              <TableCell>{formaters.date(new Date().toISOString())}</TableCell>
              <TableCell>
                {/* <Select>
                  <SelectTrigger className="w-[170px] border-none outline-none">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status da troca</SelectLabel>
                      <SelectItem value="e">Em troca</SelectItem>
                      <SelectItem value="f">Troca autorizada</SelectItem>
                      <SelectItem value="g">Trocado</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select> */}
                {accepted ? 'Troca autorizada' : 'Em troca'}
              </TableCell>
              <TableCell>-</TableCell>
              <TableCell>
                {!accepted && (
                  <Button
                    data-test="accept-button"
                    onClick={() => setAccepted(true)}
                  >
                    Aceitar troca
                  </Button>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>João</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger className="hover:underline">
                    Ver produtos
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Produtos</DropdownMenuLabel>
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
              <TableCell>{formaters.money(54)}</TableCell>
              <TableCell>{formaters.date(new Date().toISOString())}</TableCell>
              <TableCell>
                {/* <Select>
                  <SelectTrigger className="w-[170px] border-none outline-none">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status da troca</SelectLabel>
                      <SelectItem value="e">Em troca</SelectItem>
                      <SelectItem value="f">Troca autorizada</SelectItem>
                      <SelectItem value="g">Trocado</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select> */}
                Trocado
              </TableCell>
              <TableCell>QUERO54</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>João</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger className="hover:underline">
                    Ver produtos
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Produtos</DropdownMenuLabel>
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
              <TableCell>{formaters.money(54)}</TableCell>
              <TableCell>{formaters.date(new Date().toISOString())}</TableCell>
              <TableCell>
                {/* <Select>
                  <SelectTrigger className="w-[170px] border-none outline-none">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status da troca</SelectLabel>
                      <SelectItem value="e">Em troca</SelectItem>
                      <SelectItem value="f">Troca autorizada</SelectItem>
                      <SelectItem value="g">Trocado</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select> */}
                Troca recusada
              </TableCell>
              <TableCell>-</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>João</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger className="hover:underline">
                    Ver produtos
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Produtos</DropdownMenuLabel>
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
              <TableCell>{formaters.money(54)}</TableCell>
              <TableCell>{formaters.date(new Date().toISOString())}</TableCell>
              <TableCell>
                {/* <Select>
                  <SelectTrigger className="w-[170px] border-none outline-none">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status da troca</SelectLabel>
                      <SelectItem value="e">Em troca</SelectItem>
                      <SelectItem value="f">Troca autorizada</SelectItem>
                      <SelectItem value="g">Trocado</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select> */}
                Troca autorizada
              </TableCell>
              <TableCell>-</TableCell>
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
export default SellsPage;
