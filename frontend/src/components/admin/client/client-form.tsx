'use client';
import { DatePicker } from '@/components/date-picker';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export const ClientForm = () => {
  const { handleSubmit } = useForm();
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = handleSubmit(async () => {
    toast({
      title: 'Cliente salvo com sucesso',
      description: 'O cliente foi salvo com sucesso'
    });
    router.back();
  });
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <Tabs defaultValue="personal">
        <TabsList>
          <TabsTrigger value="personal">Dados pessoais</TabsTrigger>
          <TabsTrigger value="address">Endereço</TabsTrigger>
          <TabsTrigger value="credit-card">Cartão</TabsTrigger>
        </TabsList>
        <TabsContent value="personal">
          <div className="space-y-2">
            <div>
              <Label>Nome</Label>
              <Input className="w-80" />
            </div>
            <div className="flex flex-col space-y-1">
              <Label>Data de nascimento</Label>
              <DatePicker />
            </div>
            <div>
              <Label>Email</Label>
              <Input className="w-80" />
            </div>
            <div className="grid max-w-[41rem] grid-cols-2 gap-4">
              <div>
                <Label>Senha</Label>
                <Input />
              </div>
              <div>
                <Label>Confirmar senha</Label>
                <Input />
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="address">
          <div className="flex flex-col space-y-2">
            <Button type="button" className="w-fit">
              Adicionar endereço
            </Button>
            <div>
              <Card className="grid grid-cols-3 gap-4 p-4">
                <div>
                  <Label>CEP</Label>
                  <Input />
                </div>
                <div>
                  <Label>Logradouro</Label>
                  <Input />
                </div>
                <div>
                  <Label>Tipo de logradouro</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="street">Rua</SelectItem>
                      <SelectItem value="Av">Avenida</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Número</Label>
                  <Input />
                </div>
                <div>
                  <Label>Bairro</Label>
                  <Input />
                </div>
                <div>
                  <Label>Tipo de residência</Label>
                  <Input />
                </div>
                <div>
                  <Label>Cidade</Label>
                  <Input />
                </div>
                <div>
                  <Label>Estado</Label>
                  <Input />
                </div>
                <div>
                  <Label>País</Label>
                  <Input />
                </div>
                <div className="col-span-3">
                  <h3>Tipo de endereço</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox />
                  <Label>Endereço residencial</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox />
                  <Label>Endereço comercial</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox />
                  <Label>Endereço de entrega</Label>
                </div>
                <div className="col-span-3 flex justify-end">
                  <button type="button">
                    <Trash2 />
                  </button>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="credit-card">
          <div className="flex flex-col space-y-2">
            <Button type="button" className="w-fit">
              Adicionar cartão
            </Button>
            <div>
              <Card className="grid grid-cols-3 gap-4 p-4">
                <div>
                  <Label>Número</Label>
                  <Input />
                </div>
                <div>
                  <Label>Nome do titular</Label>
                  <Input />
                </div>
                <div>
                  <Label>CVV</Label>
                  <Input />
                </div>
                <div>
                  <Label>Data de validade</Label>
                  <Input />
                </div>
                <div>
                  <Label>Bandeira</Label>
                  <Input />
                </div>

                <div className="col-span-3 flex justify-end">
                  <button type="button">
                    <Trash2 />
                  </button>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      <div>
        <Button>Salvar</Button>
      </div>
    </form>
  );
};
