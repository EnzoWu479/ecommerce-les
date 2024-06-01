import { DashboardScale } from '@/utils/getIdealDashboardScale';

export interface Dashboard {
  chart: DashboardChart;
  infos: DashboardInfos;
}

export interface DashboardChart {
  labels: string[];
  datasets: DashboardDataset[];
}
export interface DashboardDataset {
  label: string;
  data: number[];
}
export interface DashboardInfos {
  amountSells: number;
  amountUsers: number;
  amountSellProducts: number;
}
export interface DashboardRequest {
  start: string;
  end: string;
  categoryGroups: string[][];
}
export type DashboardWithoutCategoryGroups = Omit<
  DashboardRequest,
  'categoryGroups'
>;
