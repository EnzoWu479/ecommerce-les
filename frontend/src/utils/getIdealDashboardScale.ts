import { differenceInDays } from 'date-fns';

export enum DashboardScale {
  YEARLY = 'yearly',
  MONTHLY = 'monthly',
  DAILY = 'daily'
}
// const MAX_
export const getIdealDashboardScale = (date1: string, date2: string) => {
  const diff = Math.abs(differenceInDays(new Date(date1), new Date(date2)));

  if (diff > 365) {
    return DashboardScale.YEARLY;
  }
  if (diff > 30) {
    return DashboardScale.MONTHLY;
  }
  return DashboardScale.DAILY;
};
