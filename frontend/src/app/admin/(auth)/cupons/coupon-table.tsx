import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { formaters } from '@/helpers/formaters';
import { ICoupon } from '@/types/coupon';
import { PageResponse } from '@/server/shared/PageResponse';
import { CouponStatus, CouponType } from '@prisma/client';

interface Props {
  coupons: PageResponse<ICoupon>;
}

export const CouponTable = ({ coupons }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Código</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Validade</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {coupons.content.map(coupon => (
          <TableRow key={coupon.id}>
            <TableCell>{coupon.code}</TableCell>
            <TableCell>
              {
                {
                  [CouponType.PROMOTIONAL]: 'Promocional',
                  [CouponType.TRADE]: 'Troca'
                }[coupon.type]
              }
            </TableCell>
            <TableCell>{formaters.money(coupon.value)}</TableCell>
            <TableCell className="w-fit">
              <div className="w-20">
                <Select defaultValue="a" value={coupon.status}>
                  <SelectTrigger className="w-[170px] border-none outline-none">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status do cupom</SelectLabel>
                      <SelectItem value={CouponStatus.ACTIVE}>Ativo</SelectItem>
                      <SelectItem value={CouponStatus.INACTIVE}>
                        Inativo
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>{' '}
              </div>
            </TableCell>
            <TableCell>
              {coupon.expiresAt && formaters.date(coupon.expiresAt)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
