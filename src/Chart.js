import React from 'react';
import Typography from '@mui/material/Typography';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { BarPlot } from '@mui/x-charts/BarChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { ChartsTooltip } from '@mui/x-charts/ChartsTooltip';
import { ChartsAxisHighlight } from '@mui/x-charts/ChartsAxisHighlight';
import { ChartsReferenceLine } from '@mui/x-charts';
import { currencyFormatter } from './utils/monetaryCalculations';
import styles from './styles/Chart';

export default function Chart({ title, xAxisData, series, maximumContribution, maximumContributionLabel }) {
  return (
    <div>
      <Typography variant="h4" sx={styles.chartTitle}>{title}</Typography>
      <ResponsiveChartContainer
        series={series}
        xAxis={[{ scaleType: 'band', data: xAxisData }]}
        yAxis={[{ max: maximumContribution * 1.05, valueFormatter: currencyFormatter }]}
        height={800}
        margin={{ left: 100 }}
      >
        <BarPlot />
        <ChartsXAxis />
        <ChartsYAxis />
        <ChartsTooltip trigger={'axis'} />
        <ChartsAxisHighlight x={'band'} />
        <ChartsReferenceLine
          y={maximumContribution}
          label={`${maximumContributionLabel}: ${currencyFormatter(maximumContribution)}`}
          labelStyle={{ stroke: '#7daba1' }}
          lineStyle={{ stroke: '#7daba1', strokeWidth: '2', strokeDasharray: '5,5' }}
        />
      </ResponsiveChartContainer>
    </div>
  );
}
