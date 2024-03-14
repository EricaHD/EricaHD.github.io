import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { axisClasses, ChartsReferenceLine } from '@mui/x-charts';
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
import { BarChart, BarPlot } from '@mui/x-charts/BarChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { roundToNearestCent, currencyFormatter } from './utils.js';

const UNDER_FIFTY_MAX_CONTRIBUTION = 23000;
const FIFTY_OR_OLDER_MAX_CONTRIBUTION = 31200;
const COMPANY_CONTRIBUTION_PERCENTAGE = 0.02;

export default function Chart() {

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // STATE                                                                                                            //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [fiftyOrOlder, setFiftyOrOlder] = React.useState(false);
  const [maxIndividualContribution, setMaxIndividualContribution] = React.useState(UNDER_FIFTY_MAX_CONTRIBUTION);

  const onChangeFiftyOrOlder = (event) => {
    setFiftyOrOlder(event.target.checked);
    const maxContribution = event.target.checked ? FIFTY_OR_OLDER_MAX_CONTRIBUTION : UNDER_FIFTY_MAX_CONTRIBUTION;
    setMaxIndividualContribution(maxContribution);
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // USER INPUT                                                                                                       //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // TODO make this user input
  const income = [
    160000, // Jan #1
    160000, // Jan #2
    160000, // Feb #1
    160000, // Feb #2
    15865,  // STI
    164355, // Mar #1
    164355, // Mar #2
    164355, // Apr #1
    164355, // Apr #2
    164355, // May #1
    164355, // May #2
    164355, // Jun #1
    164355, // Jun #2
    164355, // Jul #1
    164355, // Jul #2
    164355, // Aug #1
    164355, // Aug #2
    164355, // Sept #1
    164355, // Sept #2
    164355, // Oct #1
    164355, // Oct #2
    164355, // Nov #1
    164355, // Nov #2
    164355, // Dec #1
    164355, // Dec #2
  ];

  // TODO make this user input
  const individualContributionPercentages = [
    0.12, // Jan #1
    0.12, // Jan #2
    0.12, // Feb #1
    0.12, // Feb #2
    0.12, // STI
    0.12, // Mar #1
    0.12, // Mar #2
    0.12, // Apr #1
    0.12, // Apr #2
    0.12, // May #1
    0.12, // May #2
    0.12, // Jun #1
    0.12, // Jun #2
    0.12, // Jul #1
    0.12, // Jul #2
    0.12, // Aug #1
    0.12, // Aug #2
    0.12, // Sept #1
    0.12, // Sept #2
    0.12, // Oct #1
    0.12, // Oct #2
    0.12, // Nov #1
    0.12, // Nov #2
    0.12, // Dec #1
    0.12, // Dec #2
  ];

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // DATA                                                                                                             //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const paychecks = [
    "Jan #1",
    "Jan #2",
    "Feb #1",
    "Feb #2",
    "STI",
    "Mar #1",
    "Mar #2",
    "Apr #1",
    "Apr #2",
    "May #1",
    "May #2",
    "Jun #1",
    "Jun #2",
    "Jul #1",
    "Jul #2",
    "Aug #1",
    "Aug #2",
    "Sept #1",
    "Sept #2",
    "Oct #1",
    "Oct #2",
    "Nov #1",
    "Nov #2",
    "Dec #1",
    "Dec #2",
  ];

  const colors = [
    '#f2c6de', // red
    '#f7d9c4', // orange
    '#faedcb', // yellow
    '#c9e4de', // green
    '#c6def1', // blue
    '#dbcdf0', // purple
  ];

  const series = [];
  for (let i = 0; i < paychecks.length; i++) {
    const incomeThisPayPeriod = paychecks[i] === 'STI' ? income[i] : income[i] / 24;
    const contributionThisPayperiod = roundToNearestCent(incomeThisPayPeriod * individualContributionPercentages[i]);
    series.push({
      label: paychecks[i],
      data: (Array(i).fill(0)).concat(Array(paychecks.length - i).fill(contributionThisPayperiod)),
      type: 'bar',
      stack: 'IndividualContributionStack',
      valueFormatter: currencyFormatter,
      color: colors[i % colors.length],
    });
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // RETURN                                                                                                           //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <Stack sx={{ width: '100%' }}>
      <Stack direction="row">
        <FormControlLabel
          checked={fiftyOrOlder}
          control={
            <Checkbox onChange={onChangeFiftyOrOlder} />
          }
          label="Check this box if you will be 50 or older by the end of the calendar year"
          labelPlacement="end"
        />
      </Stack>
      <Box sx={{ width: '100%' }}>
        <ResponsiveChartContainer
          series={series}
          xAxis={[
            { scaleType: 'band', data: paychecks, label: 'Paycheck' },
          ]}
          yAxis={[
            { max: maxIndividualContribution + 1000, valueFormatter: currencyFormatter },
          ]}
          height={800}
          margin={{ left: 100 }}
          tooltip={{ trigger: 'axis' }}
        >
          <BarPlot />
          <ChartsXAxis />
          <ChartsYAxis />
          <ChartsReferenceLine
            y={maxIndividualContribution}
            label={`Maximum Individual Contribution: ${currencyFormatter(maxIndividualContribution)}`}
            labelStyle={{ stroke: '#7daba1' }}
            lineStyle={{ stroke: '#7daba1' }}
          />
        </ResponsiveChartContainer>
      </Box>
    </Stack>
  );
}
