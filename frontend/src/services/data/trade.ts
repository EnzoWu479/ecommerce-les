import { api } from '@/lib/axios';
import { TradeDTO } from '@/server/repositories/dto/TradeDTO';
import { PageRequest } from '@/server/shared/PageRequest';
import { PageResponse } from '@/server/shared/PageResponse';
import { TradeSchema } from '@/server/validations/trade.schema';
import { ITrade } from '@/types/trade';
import { TradeStatus } from '@prisma/client';

export const tradeData = {
  async request(trade: TradeSchema) {
    await api.post('/api/trade', trade);
  },
  async list({ page, limit }: PageRequest) {
    const { data } = await api.get<PageResponse<TradeDTO>>('/api/trade', {
      params: {
        page,
        limit
      }
    });
    return data;
  },
  async updateStatus(id: string, status: TradeStatus) {
    await api.put(`/api/trade/${id}/status`, { status });
  }
};
