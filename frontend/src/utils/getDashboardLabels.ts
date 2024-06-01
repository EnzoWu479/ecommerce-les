import { DashboardScale } from "./getIdealDashboardScale";

export const getDashboardLabels = (start: string, end: string, scale: DashboardScale) => {
  switch (scale) {
    case DashboardScale.DAILY:
      const startDate = new Date(start);
      const endDate = new Date(end);
      const days: Date[] = [];
      for (
        let date = startDate;
        date <= endDate;
        date.setDate(date.getDate() + 1)
      ) {
        days.push(new Date(date));
      }

      return days.map(date => date.toISOString().split('T')[0]);
    case DashboardScale.MONTHLY:
      const startMonth = new Date(start);
      const endMonth = new Date(end);
      const months: Date[] = [];
      for (
        let date = startMonth;
        date <= endMonth;
        date.setMonth(date.getMonth() + 1)
      ) {
        months.push(new Date(date));
      }

      return months.map(date => date.toISOString().split('T')[0]);
    case DashboardScale.YEARLY:
      const startYear = new Date(start);
      const endYear = new Date(end);
      const years: Date[] = [];
      for (
        let date = startYear;
        date <= endYear;
        date.setFullYear(date.getFullYear() + 1)
      ) {
        years.push(new Date());
      }
      return years.map(date => date.toISOString().split('T')[0]);
  }
};
