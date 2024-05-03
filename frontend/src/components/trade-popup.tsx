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
import { useEffect, useState } from 'react';
import { useInfiniteQueryNotification } from '@/services/query/useInfiniteQueryNotification';
import { useIntersection } from '@/hooks/useIntersection';
import { NotificationType, TradeStatus } from '@prisma/client';
import { tradeData } from '@/services/data/trade';

export const TradePopup = () => {
  const { data: notifications, fetchNextPage, refetch } = useInfiniteQueryNotification();

  const { ref } = useIntersection(fetchNextPage);

  const handleAccept = async (id: string) => {
    try {
      await tradeData.updateStatus(id, TradeStatus.TROCA_REALIZADA);
      refetch();
      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    fetchNextPage();
  }, [])
  
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
          {
            notifications.map((notification) => (
              <div>
                <Card className="bg-lime-100">
                  <CardHeader className="pb-2">
                    <h3 className="text-lg font-semibold">{notification.title}</h3>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm">{notification.message}</p>
                    {/* {retrieved ? (
                      <Button disabled>Devolvido</Button>
                    ) : (
                      <Button onClick={() => setRetrieved(true)} 
                      data-test="retrieve-button"
                      >Devolver</Button>
                    )} */}
                    {
                      notification.type === NotificationType.RETRIEVE_REQUEST && (
                        <Button 
                          onClick={() => handleAccept(notification.tradeId!)}
                        
                          data-test="retrieve-button"
                        >
                          Devolver
                        </Button>
                      )
                    }
                  </CardContent>
                </Card>
              </div> 
            ))
          }
          {/* <div>
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
          </div> */}
          <div ref={ref}></div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
