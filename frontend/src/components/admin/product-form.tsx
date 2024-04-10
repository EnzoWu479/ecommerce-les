'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';
import { Listbox } from '@headlessui/react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useState } from 'react';
import { Icon, ItemIndicator } from '@radix-ui/react-select';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SelectMultiple } from '../ui/select-multiple';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { toast } from 'react-toastify';
import { ICategory } from '@/types/category';
import { IOption } from '@/types/search';
import { zodResolver } from '@hookform/resolvers/zod';
import { BookForm, bookFormSchema } from '@/validations/bookForm.schema';
import { ErrorMessage } from '../ui/error-message';
import { IPriceGroup } from '@/types/priceGroup';
import { productData } from '@/data/product';
import { IProduct } from '@/types/product';
import { getSellPrice } from '@/utils/getSellPrice';
import { formaters } from '@/helpers/formaters';

interface Props {
  categories: ICategory[];
  priceGroups: IPriceGroup[];
  product?: IProduct;
}
export const ProductForm = ({
  categories: categoriesData,
  priceGroups,
  product
}: Props) => {
  const [categories, setCategories] = useState<IOption[]>(
    categoriesData.map(category => ({
      value: category.name,
      label: category.name
    }))
  );
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    watch
  } = useForm<BookForm>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      name: product?.name || '',
      isbn: product?.isbn || '',
      author: product?.author || '',
      manufacturer: product?.manufacturer || '',
      depth: String(product?.depth || 0),
      edition: product?.edition || '',
      height: String(product?.height || 0),
      numberPages: String(product?.numberPages || 0),
      priceCost: String(product?.priceCost || 0),
      publisher: product?.publisher || '',
      synopsis: product?.synopsis || '',
      priceGroupId: product?.priceGroup.id || '',
      weight: String(product?.weight || 0),
      width: String(product?.width || 0),
      year: String(product?.year || 0),
      categories: product?.categories.map(category => category.name) || []
    }
  });
  const router = useRouter();
  const sellPrice = getSellPrice(
    Number(watch('priceCost') || 0),
    Number(
      priceGroups.find(priceGroup => priceGroup.id === watch('priceGroupId'))
        ?.profitPercent || 0
    )
  );

  console.log(errors);
  console.log(product);

  const onSubmit = handleSubmit(async data => {
    try {
      if (product) {
        await productData.update(product.id, data);
      } else {
        await productData.create(data);
      }
      toast.success('Produto salvo com sucesso');
      router.back();
    } catch (error) {
      toast.error('Erro ao salvar produto');
    }
  });
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="flex flex-wrap gap-x-8 gap-y-4">
        <div className="w-72">
          <Label>Nome da produto</Label>
          <Input {...register('name')} error={errors.name?.message} />
          <ErrorMessage error={errors.name?.message} />
        </div>
        <div className="w-72">
          <Label>ISBN</Label>
          <Input {...register('isbn')} error={errors.isbn?.message} />
          <ErrorMessage error={errors.isbn?.message} />
        </div>
        <div className="w-72">
          <Label>Fabricante</Label>
          <Input
            {...register('manufacturer')}
            error={errors.manufacturer?.message}
          />
          <ErrorMessage error={errors.manufacturer?.message} />
        </div>

        <div className="w-72">
          <Label>Autor</Label>
          <Input {...register('author')} error={errors.author?.message} />
          <ErrorMessage error={errors.author?.message} />
        </div>
        <div className="w-72">
          <Label>Ano</Label>
          <Input
            {...register('year')}
            error={errors.year?.message as string}
            type="number"
            step="0.1"
          />
          <ErrorMessage error={errors.year?.message as string} />
        </div>
        <div className="w-72">
          <Label>Editora</Label>
          <Input {...register('publisher')} error={errors.publisher?.message} />
          <ErrorMessage error={errors.publisher?.message} />
        </div>
        <div className="w-72">
          <Label>Edição</Label>
          <Input {...register('edition')} error={errors.edition?.message} />
          <ErrorMessage error={errors.edition?.message} />
        </div>
        <div className="w-72">
          <Label>Nº de páginas</Label>
          <Input
            {...register('numberPages')}
            error={errors.numberPages?.message as string}
            type="number"
            step="0.1"
          />
          <ErrorMessage error={errors.numberPages?.message as string} />
        </div>

        <div className="w-full">
          <Label>Categorias</Label>
          <Controller
            control={control}
            name="categories"
            render={({ field: { value, onChange } }) => (
              <SelectMultiple
                value={value}
                onChange={onChange}
                onCreateOption={name =>
                  setCategories(prev => [...prev, { value: name, label: name }])
                }
                options={categories}
              />
            )}
          />
          <ErrorMessage error={errors.categories?.message} />
        </div>
        <div className="w-full">
          <Label>Sinopse</Label>
          <Textarea
            {...register('synopsis')}
            error={errors.synopsis?.message}
          />
        </div>
      </div>
      <h3 className="text-2xl font-bold tracking-tight">Dimensões</h3>
      <div className="flex flex-wrap gap-x-8 gap-y-4">
        <div className="w-72">
          <Label>Altura</Label>
          <Input
            {...register('height')}
            type="number"
            step="0.1"
            error={errors.height?.message as string}
          />
          <ErrorMessage error={errors.height?.message as string} />
        </div>
        <div className="w-72">
          <Label>Largura</Label>
          <Input
            {...register('width')}
            type="number"
            step="0.1"
            error={errors.width?.message as string}
          />
          <ErrorMessage error={errors.width?.message as string} />
        </div>
        <div className="w-72">
          <Label>Peso</Label>
          <Input
            {...register('weight')}
            type="number"
            step="0.1"
            error={errors.weight?.message as string}
          />
          <ErrorMessage error={errors.weight?.message as string} />
        </div>
        <div className="w-72">
          <Label>Profundidade</Label>
          <Input
            {...register('depth')}
            type="number"
            step="0.1"
            error={errors.depth?.message as string}
          />
          <ErrorMessage error={errors.depth?.message as string} />
        </div>
      </div>
      <h3 className="text-2xl font-bold tracking-tight">
        Detalhes de precificação
      </h3>
      <div className="flex flex-wrap gap-x-8 gap-y-4">
        <div className="w-72">
          <Label>Custo</Label>
          <Input
            type="number"
            step="0.1"
            {...register('priceCost')}
            error={errors.priceCost?.message as string}
          />
          <ErrorMessage error={errors.priceCost?.message as string} />
        </div>
        <div className="w-72" data-test="priceGroup">
          <Label>Grupo de precificação</Label>
          <Controller
            control={control}
            name="priceGroupId"
            render={({ field: { value, onChange } }) => (
              <Select value={value} onValueChange={onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {priceGroups.map(priceGroup => (
                    <SelectItem key={priceGroup.id} value={priceGroup.id}>
                      {priceGroup.name} ({priceGroup.profitPercent}%)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <ErrorMessage error={errors.priceGroupId?.message} />
        </div>
        <div className="w-72">
          <Label>Preço de venda</Label>
          <Input readOnly value={formaters.number(sellPrice)} />
        </div>
      </div>
      <div>
        <Button type="submit" data-test="submit-button">
          Salvar
        </Button>
      </div>
    </form>
  );
};
