'use client';
import { Bell } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './ui/dropdown-menu';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { useState } from 'react';

export const TradePopup = () => {
  const [retrieved, setRetrieved] = useState(false);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        data-test="trade-popup"
        className="underline underline-offset-2 hover:underline-offset-1"
      >
        <Bell />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Notificações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-72 w-72 space-y-2 overflow-auto p-3">
          <div>
            <Card className="bg-lime-100">
              <CardHeader className="pb-2">
                <h3 className="text-lg font-semibold">Devolução produto</h3>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">Você solicitou a devolução do produto</p>
                {retrieved ? (
                  <Button disabled>Devolvido</Button>
                ) : (
                  <Button onClick={() => setRetrieved(true)} 
                  data-test="retrieve-button"
                  >Devolver</Button>
                )}
              </CardContent>
            </Card>
          </div>
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
                <p className="text-sm">
                  O cupom referente à compra #5: QUKLÇJFDKLS
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
