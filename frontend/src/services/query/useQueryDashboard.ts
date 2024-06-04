import { DashboardRequest } from '@/types/dashboard';
import { useQuery } from '@tanstack/react-query';
import { dashboardData } from '../data/dashboard';

export const useQueryDashboardChart = (request: Partial<DashboardRequest>) => {
  const filteredCategories =
    request!.categoryGroups?.filter(group => group.length > 0) || [];
  const query = useQuery({
    queryKey: ['dashboard', filteredCategories, request.start, request.end],
    queryFn: async () =>
      dashboardData.getChart({
        start: request!.start!,
        end: request!.end!,
        categoryGroups: filteredCategories
      }),
    enabled:
      request.categoryGroups?.some(group => group.length > 0) &&
      !!request.start &&
      !!request.end
  });
  return query;
};
export const useQueryDashboardInfos = (request: Partial<DashboardRequest>) => {
  const query = useQuery({
    queryKey: ['dashboard', request.start, request.end],
    queryFn: async () =>
      dashboardData.getInfos({
        start: request!.start!,
        end: request!.end!
      }),
    enabled: !!request.start && !!request.end
  });
  return query;
};
