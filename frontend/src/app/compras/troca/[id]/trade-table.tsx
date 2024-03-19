'use client';
import { ClientNavigationMenu } from '@/components/client/client-navigation-menu';
import { ProductCard } from '@/components/client/product-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
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
import { useToast } from '@/components/ui/use-toast';
import { formaters } from '@/helpers/formaters';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const TradeTable = () => {
  const router = useRouter();
  const { toast } = useToast();
  const handleTrade = () => {
    toast({
      title: 'Troca realizada com sucesso',
      description: 'A troca foi realizada com sucesso'
    });
    router.push('/compras');
  };
  return (
    <>
    
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead />
            <TableHead>Nome</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Fabricante</TableHead>
            <TableHead>Categorias</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="w-10">
              <Checkbox />
            </TableCell>
            <TableCell className="flex gap-4">Livro do Harry Potter</TableCell>
            <TableCell>{formaters.money(5)}</TableCell>
            <TableCell>Editora Violet</TableCell>
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
          </TableRow>
          <TableRow>
            <TableCell className="w-10">
              <Checkbox />
            </TableCell>
            <TableCell className="flex gap-4">Livro do Harry Potter</TableCell>
            <TableCell>{formaters.money(5)}</TableCell>
            <TableCell>Editora Violet</TableCell>
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
          </TableRow>
          <TableRow>
            <TableCell className="w-10">
              <Checkbox />
            </TableCell>
            <TableCell className="flex gap-4">Livro do Harry Potter</TableCell>
            <TableCell>{formaters.money(5)}</TableCell>
            <TableCell>Editora Violet</TableCell>
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
          </TableRow>
          <TableRow>
            <TableCell className="w-10">
              <Checkbox />
            </TableCell>
            <TableCell className="flex gap-4">Livro do Harry Potter</TableCell>
            <TableCell>{formaters.money(5)}</TableCell>
            <TableCell>Editora Violet</TableCell>
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
          </TableRow>
          <TableRow>
            <TableCell className="w-10">
              <Checkbox />
            </TableCell>
            <TableCell className="flex gap-4">Livro do Harry Potter</TableCell>
            <TableCell>{formaters.money(5)}</TableCell>
            <TableCell>Editora Violet</TableCell>
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
          </TableRow>
          <TableRow>
            <TableCell className="w-10">
              <Checkbox />
            </TableCell>
            <TableCell className="flex gap-4">Livro do Harry Potter</TableCell>
            <TableCell>{formaters.money(5)}</TableCell>
            <TableCell>Editora Violet</TableCell>
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
          </TableRow>
          <TableRow>
            <TableCell className="w-10">
              <Checkbox />
            </TableCell>
            <TableCell className="flex gap-4">Livro do Harry Potter</TableCell>
            <TableCell>{formaters.money(5)}</TableCell>
            <TableCell>Editora Violet</TableCell>
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
          </TableRow>
          <TableRow>
            <TableCell className="w-10">
              <Checkbox />
            </TableCell>
            <TableCell className="flex gap-4">Livro do Harry Potter</TableCell>
            <TableCell>{formaters.money(5)}</TableCell>
            <TableCell>Editora Violet</TableCell>
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
          </TableRow>
          <TableRow>
            <TableCell className="w-10">
              <Checkbox />
            </TableCell>
            <TableCell className="flex gap-4">Livro do Harry Potter</TableCell>
            <TableCell>{formaters.money(5)}</TableCell>
            <TableCell>Editora Violet</TableCell>
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
          </TableRow>
          <TableRow>
            <TableCell className="w-10">
              <Checkbox />
            </TableCell>
            <TableCell className="flex gap-4">Livro do Harry Potter</TableCell>
            <TableCell>{formaters.money(5)}</TableCell>
            <TableCell>Editora Violet</TableCell>
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
          </TableRow>
          <TableRow>
            <TableCell className="w-10">
              <Checkbox />
            </TableCell>
            <TableCell className="flex gap-4">Livro do Harry Potter</TableCell>
            <TableCell>{formaters.money(5)}</TableCell>
            <TableCell>Editora Violet</TableCell>
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
          </TableRow>
          <TableRow>
            <TableCell className="w-10">
              <Checkbox />
            </TableCell>
            <TableCell className="flex gap-4">Livro do Harry Potter</TableCell>
            <TableCell>{formaters.money(5)}</TableCell>
            <TableCell>Editora Violet</TableCell>
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
          </TableRow>
        </TableBody>
      </Table>
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
      <div className="mt-4 flex justify-end gap-2">
        <Button variant="outline" asChild>
          <Link href="/compras">Voltar</Link>
        </Button>
        <Button onClick={handleTrade}>Trocar</Button>
      </div>
    </>
  );
};
