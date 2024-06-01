'use client';

import { DashboardChart } from '@/types/dashboard';
import { getDashboardChartProps } from '@/utils/getDashboardProps';
import { DashboardScale } from '@/utils/getIdealDashboardScale';
import { getRandomColor } from '@/utils/getRandomColor';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Line,
  LineChart,
  Legend,
  Tooltip
} from 'recharts';


interface Props {
  dashboardChart?: DashboardChart;
  scale?: DashboardScale;
}

export function Overview({ dashboardChart, scale }: Props) {
  if (!dashboardChart || !scale) {
    return null;
  }
  const data = getDashboardChartProps({ dashboardChart, scale });
  console.log(data);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          // tickFormatter={value => `$${value}`}
        />
        <Legend />
        <Tooltip />
        {dashboardChart.datasets?.map(dataset => (
          <Line
            key={dataset.label}
            dataKey={dataset.label}
            fill={getRandomColor()}
            // className="fill-primary"
          />
        ))}
        {/* <Line dataKey="total1" fill="currentColor" className="fill-primary" /> */}
      </LineChart>
    </ResponsiveContainer>
  );
}
