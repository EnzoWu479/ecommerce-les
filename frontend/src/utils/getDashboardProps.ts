import { DashboardChart } from '@/types/dashboard';
import { DashboardScale } from './getIdealDashboardScale';
import { formaters } from '@/helpers/formaters';

interface Props {
  dashboardChart: DashboardChart;
  scale: DashboardScale;
}

const getLabel = (name: string, scale: DashboardScale) => {
  switch (scale) {
    case DashboardScale.YEARLY:
      return new Date(name).getFullYear();
    case DashboardScale.MONTHLY:
      return new Date(name).toLocaleString('default', { month: 'short' });
    case DashboardScale.DAILY:
      return formaters.date(name, "dd/MM");
  }
};

export const getDashboardChartProps = ({ dashboardChart, scale }: Props) => {
  return dashboardChart.labels.map((label, index) => {
    return Object.assign(
      { name: getLabel(label, scale) },
      ...dashboardChart.datasets?.map(dataset => ({
        [dataset.label]: dataset.data[index]
      }))
    );

    // return {
    // name: getLabel(label, scale),
    // ...dashboardChart.datasets?.map(dataset => ({
    //   [dataset.label]: dataset.data[index]
    // }))
    // };
  });
};
