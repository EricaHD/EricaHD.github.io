import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { axisClasses, ChartsReferenceLine } from '@mui/x-charts';
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
import { BarChart, BarPlot } from '@mui/x-charts/BarChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { useDrawingArea } from '@mui/x-charts/hooks';
import BaseSalary from './BaseSalaryInput';
import ContributionPercentageInput from './ContributionPercentageInput';
import { roundToNearestCent, currencyFormatter } from './utils/monetaryCalculations.js';
import { pastelColors } from './utils/colors';
import styles from './styles/Chart';

const UNDER_FIFTY_MAX_CONTRIBUTION = 23000;
const FIFTY_OR_OLDER_MAX_CONTRIBUTION = 30500;
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
    161500, // Jan #1
    161500, // Jan #2
    161500, // Feb #1
    161500, // Feb #2
    15865,  // STI
    165895, // Mar #1
    165895, // Mar #2
    165895, // Apr #1
    165895, // Apr #2
    165895, // May #1
    165895, // May #2
    165895, // Jun #1
    165895, // Jun #2
    165895, // Jul #1
    165895, // Jul #2
    165895, // Aug #1
    165895, // Aug #2
    165895, // Sept #1
    165895, // Sept #2
    165895, // Oct #1
    165895, // Oct #2
    165895, // Nov #1
    165895, // Nov #2
    165895, // Dec #1
    165895, // Dec #2
  ];

  // TODO make this user input
  const individualContributionPercentages = [
    0.13, // Jan #1
    0.13, // Jan #2
    0.13, // Feb #1
    0.13, // Feb #2
    0.13, // STI
    0.13, // Mar #1
    0.13, // Mar #2
    0.13, // Apr #1
    0.13, // Apr #2
    0.13, // May #1
    0.13, // May #2
    0.13, // Jun #1
    0.13, // Jun #2
    0.13, // Jul #1
    0.13, // Jul #2
    0.13, // Aug #1
    0.13, // Aug #2
    0.13, // Sept #1
    0.13, // Sept #2
    0.13, // Oct #1
    0.13, // Oct #2
    0.13, // Nov #1
    0.13, // Nov #2
    0.13, // Dec #1
    0.13, // Dec #2
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

  let cumulativeIndividualContribution = 0;
  const series = [];
  for (let i = 0; i < paychecks.length; i++) {
    const incomeThisPaycheck = paychecks[i] === 'STI' ? income[i] : income[i] / 24;
    let contributionThisPaycheck = roundToNearestCent(incomeThisPaycheck * individualContributionPercentages[i]);
    if (cumulativeIndividualContribution + contributionThisPaycheck > maxIndividualContribution) {
      const overage = cumulativeIndividualContribution + contributionThisPaycheck - maxIndividualContribution
      contributionThisPaycheck -= overage;
    }
    cumulativeIndividualContribution += contributionThisPaycheck;
    series.push({
      label: paychecks[i],
      data: (Array(i).fill(0)).concat(Array(paychecks.length - i).fill(contributionThisPaycheck)),
      type: 'bar',
      stack: 'IndividualContributionStack',
      valueFormatter: currencyFormatter,
      color: pastelColors[i % pastelColors.length],
    });
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // RETURN                                                                                                           //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <Stack sx={styles.fullWidth}>
      <Stack direction="row">
        <FormControlLabel
          checked={fiftyOrOlder}
          control={
            <Checkbox onChange={onChangeFiftyOrOlder} />
          }
          label="Check this box if you will be 50 or older by the end of the calendar year"
          labelPlacement="end"
          sx={styles.centered}
        />
      </Stack>
      <Stack direction="row" sx={styles.paycheckSection}>
        <Typography
          variant="h5"
          sx={styles.paycheckSectionTitle}
        >
          {paychecks[0]}
        </Typography>
        <BaseSalary />
        <ContributionPercentageInput />
      </Stack>
      <Box sx={styles.chartBox}>
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
