import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { axisClasses, ChartsReferenceLine } from '@mui/x-charts';
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
import { BarChart, BarPlot } from '@mui/x-charts/BarChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { useDrawingArea } from '@mui/x-charts/hooks';
import AgeCheckbox from './AgeCheckbox';
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
  // STATE - AGE & MAX CONTRIBUTION                                                                                   //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [maxIndividualContribution, setMaxIndividualContribution] = React.useState(UNDER_FIFTY_MAX_CONTRIBUTION);

  const onChangeMaxIndividualContribution = (event) => {
    const newMaxIndividualContribution = event.target.checked ? FIFTY_OR_OLDER_MAX_CONTRIBUTION : UNDER_FIFTY_MAX_CONTRIBUTION;
    setMaxIndividualContribution(newMaxIndividualContribution);
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // STATE - INCOME                                                                                                   //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const initialIncomeArray = Array(NUM_PAYCHECKS).fill(DEFAULT_BASE_SALARY);
  initialIncomeArray[PAYCHECKS.indexOf(STI_STRING)] = DEFAULT_STI;
  const [income, setIncome] = React.useState(initialIncomeArray);

  const onChangeIncome = (idx, event, value) => {
    const newValue = (value === null) ? 0 : value;
    const newIncome = Object.assign([...income], { [idx]: newValue });
    setIncome(newIncome);
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // STATE - CONTRIBUTION PERCENTAGES                                                                                 //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [contributionPercentage, setContributionPercentage] = React.useState(Array(NUM_PAYCHECKS).fill(12));

  const onChangeContributionPercentage = (idx, event, value) => {
    const newValue = (value === null) ? 0 : value;
    const newContributionPercentage = Object.assign([...contributionPercentage], { [idx]: newValue });
    setContributionPercentage(newContributionPercentage);
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // DATA - SERIES                                                                                                    //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [series, setSeries] = React.useState([]);

  React.useEffect(() => {
    let cumulativeIndividualContribution = 0;
    const newSeries = [];
    for (let i = 0; i < NUM_PAYCHECKS; i++) {
      const incomeThisPaycheck = PAYCHECKS[i] === STI_STRING ? income[i] : income[i] / 24.0;
      let contributionThisPaycheck = roundToNearestCent(incomeThisPaycheck * contributionPercentage[i] / 100.0);
      if (cumulativeIndividualContribution + contributionThisPaycheck > maxIndividualContribution) {
        const overage = cumulativeIndividualContribution + contributionThisPaycheck - maxIndividualContribution
        contributionThisPaycheck -= overage;
      }
      cumulativeIndividualContribution += contributionThisPaycheck;
      newSeries.push({
        label: PAYCHECKS[i],
        data: (Array(i).fill(0)).concat(Array(NUM_PAYCHECKS - i).fill(contributionThisPaycheck)),
        type: 'bar',
        stack: 'IndividualContributionStack',
        valueFormatter: currencyFormatter,
        color: pastelColors[i % pastelColors.length],
      });
    }
    setSeries(newSeries);
  }, [maxIndividualContribution, income, contributionPercentage]);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // RETURN                                                                                                           //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <Stack sx={styles.fullWidth}>

      <AgeCheckbox onChange={onChangeMaxIndividualContribution} />

      <Grid container>

        <Grid item xs={4}>
          {PAYCHECKS.map((paycheck, idx) => (
            <Grid container alignItems="center" sx={styles.paycheckSection} key={paycheck}>
              <Grid item xs={2.5}>
                <Typography variant="h5" sx={styles.paycheckSectionTitle}>{paycheck}</Typography>
              </Grid>
              <Grid item xs={4.5}>
                <IncomeInput value={income[idx]} onChange={(event, val) => onChangeIncome(idx, event, val)} />
              </Grid>
              <Grid item xs={5}>
                <ContributionPercentageInput value={contributionPercentage[idx]} onChange={(event, val) => onChangeContributionPercentage(idx, event, val)} />
              </Grid>
            </Grid>
          ))}
        </Grid>

        <Grid item xs={8}>
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
        </Grid>

      </Grid>

    </Stack>
  );
}
