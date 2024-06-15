'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { SelectMultiple } from '@/components/ui/select-multiple';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'react-toastify';
import { ICategory } from '@/types/category';
import { IOption } from '@/types/search';
import { zodResolver } from '@hookform/resolvers/zod';
import { BookForm, bookFormSchema } from '@/validations/bookForm.schema';
import { ErrorMessage } from '@/components/ui/error-message';
import { IPriceGroup } from '@/types/priceGroup';
import { productData } from '@/services/data/product';
import { IProduct } from '@/types/product';
import { getSellPrice } from '@/utils/getSellPrice';
import { formaters } from '@/helpers/formaters';
import { useMutationAi } from '@/services/query/useMutationAi';
import { Bot, MailQuestion } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '../ui/tooltip';

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
  const [takenSugestedSynopse, setTakenSugestedSynopse] = useState(false);
  const [
    takenSugestedGramaticalImprovement,
    setTakenSugestedGramaticalImprovement
  ] = useState(false);
  const [takenSugestedAuthor, setTakenSugestedAuthor] = useState(false);

  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setValue,
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
      priceGroupId: product?.priceGroup?.id || '',
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

  const { gramaticalImprovement, suggest } = useMutationAi();
  const suggestCategoriesFiltered =
    suggest.data?.categories.filter(
      category => !watch('categories').includes(category)
    ) || [];

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
  console.log(suggest.data);

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      {!!watch('name') && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="pt-2"
                onClick={() => {
                  suggest.mutate(getValues());
                  setTakenSugestedSynopse(false);
                  setTakenSugestedAuthor(false);
                }}
                disabled={suggest.isPending}
              >
                <Bot />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <span>Tenha ajuda da IA</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
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
          {!!suggest.data?.author && !takenSugestedAuthor && (
            <div className="text-sm">
              Sugestão:{' '}
              <span
                className="cursor-pointer text-blue-600 underline hover:text-blue-800"
                onClick={() => {
                  setValue('author', suggest.data.author);
                  setTakenSugestedAuthor(true);
                }}
              >
                {suggest.data.author}
              </span>
            </div>
          )}
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
        {/* <div className="w-72">
          
        </div> */}

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
          <div className="mt-4 flex flex-wrap gap-2">
            {suggestCategoriesFiltered.map(category => (
              <button
                type="button"
                onClick={() => {
                  setCategories(prev => [
                    ...prev,
                    { value: category, label: category }
                  ]);
                  setValue('categories', [...watch('categories'), category]);
                }}
                className="rounded-md bg-slate-800 px-4 text-sm text-white"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="w-full">
          <Label className="mb-2 flex items-center gap-2">
            Sinopse{' '}
            {!!watch('synopsis') && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={() => {
                        gramaticalImprovement.mutate(getValues());
                        setTakenSugestedGramaticalImprovement(false);
                      }}
                      disabled={gramaticalImprovement.isPending}
                    >
                      <MailQuestion size={14} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>Peça correção da IA</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </Label>
          <Textarea
            {...register('synopsis')}
            error={errors.synopsis?.message}
          />
          <ErrorMessage error={errors.synopsis?.message} />
          {!!suggest.data?.synopsis && !takenSugestedSynopse && (
            <div className="text-sm">
              Sugestão:{' '}
              <span
                className="cursor-pointer text-blue-600 underline hover:text-blue-800"
                onClick={() => {
                  setValue('synopsis', suggest.data.synopsis);
                  setTakenSugestedSynopse(true);
                }}
              >
                {suggest.data.synopsis}
              </span>
            </div>
          )}
          {!!gramaticalImprovement.data &&
            !takenSugestedGramaticalImprovement && (
              <div className="text-sm">
                {gramaticalImprovement.data === watch('synopsis') ? (
                  <span className="text-green-600">Texto sem erros</span>
                ) : (
                  <>
                    {gramaticalImprovement.data ===
                    'A mensagem não tem sentido.' ? (
                      <span className="text-red-600">
                        A mensagem não tem sentido.
                      </span>
                    ) : (
                      <>
                        Sugestão gramatical:
                        <span
                          className="ml-2 cursor-pointer text-blue-600 underline hover:text-blue-800"
                          onClick={() => {
                            setValue('synopsis', gramaticalImprovement.data);
                            setTakenSugestedGramaticalImprovement(true);
                          }}
                        >
                          {gramaticalImprovement.data}
                        </span>{' '}
                      </>
                    )}
                  </>
                )}
              </div>
            )}
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
