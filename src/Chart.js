import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { axisClasses, ChartsReferenceLine } from '@mui/x-charts';
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
import { BarChart, BarPlot } from '@mui/x-charts/BarChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { useDrawingArea } from '@mui/x-charts/hooks';
import IncomeInput from './IncomeInput';
import ContributionPercentageInput from './ContributionPercentageInput';
import { roundToNearestCent, currencyFormatter } from './utils/monetaryCalculations.js';
import { pastelColors } from './utils/colors';
import styles from './styles/Chart';

const UNDER_FIFTY_MAX_CONTRIBUTION = 23000;
const FIFTY_OR_OLDER_MAX_CONTRIBUTION = 30500;
const COMPANY_CONTRIBUTION_PERCENTAGE = 0.02;

const DEFAULT_BASE_SALARY = 100000;
const DEFAULT_STI = 15000;

const STI_STRING = 'STI';
const PAYCHECKS = [
  "Jan #1", "Jan #2", "Feb #1", "Feb #2", STI_STRING, "Mar #1", "Mar #2", "Apr #1", "Apr #2", "May #1", "May #2", "Jun #1", "Jun #2",
  "Jul #1", "Jul #2", "Aug #1", "Aug #2", "Sept #1", "Sept #2", "Oct #1", "Oct #2", "Nov #1", "Nov #2", "Dec #1", "Dec #2",
];
const NUM_PAYCHECKS = PAYCHECKS.length;

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

  const initialIncomeArray = Array(NUM_PAYCHECKS).fill(DEFAULT_BASE_SALARY);
  initialIncomeArray[PAYCHECKS.indexOf(STI_STRING)] = DEFAULT_STI;
  const [income, setIncome] = React.useState(initialIncomeArray);

  const onChangeIncome = (idx, value) => {
    const newValue = (value === null) ? 0 : value;
    setIncome(Object.assign([...income], { [idx]: newValue }));
  }

  const [contributionPercentage, setContributionPercentage] = React.useState(Array(NUM_PAYCHECKS).fill(12));

  const onChangeContributionPercentage = (idx, value) => {
    const newValue = (value === null) ? 0 : value;
    setContributionPercentage(Object.assign([...contributionPercentage], { [idx]: newValue }));
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // DATA                                                                                                             //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  let cumulativeIndividualContribution = 0;
  const series = [];
  for (let i = 0; i < NUM_PAYCHECKS; i++) {
    const incomeThisPaycheck = PAYCHECKS[i] === STI_STRING ? income[i] : income[i] / 24;
    let contributionThisPaycheck = roundToNearestCent(incomeThisPaycheck * contributionPercentage[i] / 100.0);
    if (cumulativeIndividualContribution + contributionThisPaycheck > maxIndividualContribution) {
      const overage = cumulativeIndividualContribution + contributionThisPaycheck - maxIndividualContribution
      contributionThisPaycheck -= overage;
    }
    cumulativeIndividualContribution += contributionThisPaycheck;
    series.push({
      label: PAYCHECKS[i],
      data: (Array(i).fill(0)).concat(Array(NUM_PAYCHECKS - i).fill(contributionThisPaycheck)),
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

      {PAYCHECKS.map((paycheck, idx) => (
        <Grid container alignItems="center" sx={styles.paycheckSection} key={paycheck}>
          <Grid item xs={3}>
            <Typography variant="h5" sx={styles.paycheckSectionTitle}>{paycheck}</Typography>
          </Grid>
          <Grid item xs={5}>
            <IncomeInput value={income[idx]} onChange={(val) => onChangeIncome(idx, val)} />
          </Grid>
          <Grid item xs={4}>
            <ContributionPercentageInput value={contributionPercentage[idx]} onChange={(val) => onChangeContributionPercentage(idx, val)} />
          </Grid>
        </Grid>
      ))}

      <Box sx={styles.chartBox}>
        <ResponsiveChartContainer
          series={series}
          xAxis={[
            { scaleType: 'band', data: PAYCHECKS, label: 'Paycheck' },
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
