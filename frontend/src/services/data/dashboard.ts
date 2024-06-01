import { api } from '@/lib/axios';
import {
  DashboardChart,
  DashboardInfos,
  DashboardRequest,
  DashboardWithoutCategoryGroups
} from '@/types/dashboard';

export const dashboardData = {
  async getChart(request: DashboardRequest) {
    console.log(request.categoryGroups?.filter(group => group.length > 0));

    const { data } = await api.get<DashboardChart>(`/api/dashboard/chart`, {
      params: {
        start: request.start,
        end: request.end,
        categoryGroups: request.categoryGroups
          ?.filter(group => group.length > 0)
          .map(group => group.join(','))
      }
    });
    return data;
  },
  async getInfos(request: DashboardWithoutCategoryGroups) {
    const { data } = await api.get<DashboardInfos>(`/api/dashboard/infos`, {
      params: {
        start: request.start,
        end: request.end
      }
    });
    return data;
  }
};
