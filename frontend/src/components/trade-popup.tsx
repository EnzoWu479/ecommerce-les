import { Bell } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './ui/dropdown-menu';
import { Card, CardContent, CardHeader } from './ui/card';

export const TradePopup = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="underline underline-offset-2 hover:underline-offset-1">
        <Bell />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Notificações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-64 w-64 space-y-2 overflow-auto p-3">
          <div>
            <Card className="bg-lime-100">
              <CardHeader className="pb-2">
                <h3 className="text-lg font-semibold">Harry Potter 1</h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm">A solicitação de troca foi aprovado</p>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="">
              <CardHeader className="pb-2">
                <h3 className="text-lg font-semibold">Cupom de troca</h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm">O cupom referente à compra #5: QUKLÇJFDKLS</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
