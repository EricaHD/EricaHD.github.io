import React from 'react';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { BarPlot } from '@mui/x-charts/BarChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { ChartsReferenceLine } from '@mui/x-charts';
import { currencyFormatter } from './utils/monetaryCalculations';

export default function Chart({ xAxisData, series, maximumContribution, maximumContributionLabel }) {
  return (
    <ResponsiveChartContainer
      series={series}
      xAxis={[
        { scaleType: 'band', data: xAxisData, label: 'Paycheck' },
      ]}
      yAxis={[
        { max: maximumContribution * 1.05, valueFormatter: currencyFormatter },
      ]}
      height={800}
      margin={{ left: 100 }}
      tooltip={{ trigger: 'axis' }}
    >
      <BarPlot />
      <ChartsXAxis />
      <ChartsYAxis />
      <ChartsReferenceLine
        y={maximumContribution}
        label={`${maximumContributionLabel}: ${currencyFormatter(maximumContribution)}`}
        labelStyle={{ stroke: '#7daba1' }}
        lineStyle={{ stroke: '#7daba1', strokeWidth: '2', strokeDasharray: '5,5' }}
      />
    </ResponsiveChartContainer>
  );
}
