import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AgeCheckbox from './AgeCheckbox';
import CumulativeContributionInfo from './CumulativeContributionInfo';
import Chart from './Chart';
import SummaryTable from './SummaryTable';
import SectionTitle from './SectionTitle';
import AutopopulateIncome from './AutopopulateIncome';
import AutopopulateContributionPercentage from './AutopopulateContributionPercentage';
import { roundToNearestCent, currencyFormatter, twoPercentOfIncome } from './utils/monetaryCalculations';
import { pastelColors } from './utils/colors';
import styles from './styles/Content';

const UNDER_FIFTY_MAX_CONTRIBUTION = 23000;
const FIFTY_OR_OLDER_MAX_CONTRIBUTION = 30500;
const COMPANY_CONTRIBUTION_PERCENTAGE = 0.02;

const DEFAULT_INCOME = 7000;
const DEFAULT_STI = 15000;
const DEFAULT_RETIREMENT_CONTRIBUTION = 12;

const STI_STRING = 'STI';
const PAYCHECKS = [
  "Jan #1", "Jan #2", "Feb #1", "Feb #2", STI_STRING, "Mar #1", "Mar #2", "Apr #1", "Apr #2", "May #1", "May #2", "Jun #1", "Jun #2",
  "Jul #1", "Jul #2", "Aug #1", "Aug #2", "Sept #1", "Sept #2", "Oct #1", "Oct #2", "Nov #1", "Nov #2", "Dec #1", "Dec #2",
];
const STI_INDEX = PAYCHECKS.indexOf(STI_STRING);
const NUM_PAYCHECKS = PAYCHECKS.length;

export default function Content() {

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

  const initialIncomeArray = Array(NUM_PAYCHECKS).fill(DEFAULT_INCOME);
  initialIncomeArray[STI_INDEX] = DEFAULT_STI;
  const [income, setIncome] = React.useState(initialIncomeArray);
  const [maxCompanyContribution, setMaxCompanyContribution] = React.useState(twoPercentOfIncome(initialIncomeArray, STI_INDEX));

  const onChangeIncome = (idx, event, value) => {
    const newValue = (value === null) ? 0 : value;
    const newIncome = Object.assign([...income], { [idx]: newValue });
    setIncome(newIncome);
    setMaxCompanyContribution(twoPercentOfIncome(newIncome, STI_INDEX));
  }

  const autopopulateIncome = (preMarchAnnualSalary, postMarchAnnualSalary, sti) => {
    const newPreMarchAnnualSalary = (preMarchAnnualSalary === null) ? 0 : preMarchAnnualSalary;
    const newPostMarchAnnualSalary = (postMarchAnnualSalary === null) ? 0 : postMarchAnnualSalary;
    const newSti = (sti === null) ? 0 : sti;
    const newIncome = Array(NUM_PAYCHECKS).fill(0);
    for (let i = 0; i < newIncome.length; i++) {
      if (i < STI_INDEX) {
        newIncome[i] = roundToNearestCent(newPreMarchAnnualSalary / 24);
      }
      if (i === STI_INDEX) {
        newIncome[i] = newSti;
      }
      if (i > STI_INDEX) {
        newIncome[i] = roundToNearestCent(newPostMarchAnnualSalary / 24);
      }
    }
    setIncome(newIncome);
    setMaxCompanyContribution(twoPercentOfIncome(newIncome, STI_INDEX));
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // STATE - CONTRIBUTION PERCENTAGES                                                                                 //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [contributionPercentage, setContributionPercentage] = React.useState(Array(NUM_PAYCHECKS).fill(DEFAULT_RETIREMENT_CONTRIBUTION));

  const onChangeContributionPercentage = (idx, event, value) => {
    const newValue = (value === null) ? 0 : value;
    const newContributionPercentage = Object.assign([...contributionPercentage], { [idx]: newValue });
    setContributionPercentage(newContributionPercentage);
  }

  const autopopulateContributionPercentage = (retirementContribution) => {
    const newRetirementContribution = (retirementContribution === null) ? 0 : retirementContribution;
    const newContributionPercentage = Array(NUM_PAYCHECKS).fill(newRetirementContribution);
    setContributionPercentage(newContributionPercentage);
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // DATA - CHART DATA                                                                                                //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [individualSeries, setIndividualSeries] = React.useState([]);
  const [companySeries, setCompanySeries] = React.useState([]);
  const [cumulativeIndividualContribution, setCumulativeIndividualContribution] = React.useState(0);
  const [cumulativeCompanyContribution, setCumulativeCompanyContribution] = React.useState(0);

  React.useEffect(() => {
    let newCumulativeIndividualContribution = 0;
    let newCumulativeCompanyContribution = 0;

    const newIndividualSeries = [];
    const newCompanySeries = [];
    for (let i = 0; i < NUM_PAYCHECKS; i++) {
      // Individual contribution
      let individualContribution = roundToNearestCent(income[i] * contributionPercentage[i] / 100.0);
      if (newCumulativeIndividualContribution + individualContribution > maxIndividualContribution) {
        const overage = newCumulativeIndividualContribution + individualContribution - maxIndividualContribution
        individualContribution -= overage;
      }

      // Company contribution
      let companyContribution = roundToNearestCent(income[i] * 0.02);
      if (companyContribution > individualContribution) {
        companyContribution = individualContribution;
      }

      // Update cumulative contributions
      newCumulativeIndividualContribution += individualContribution;
      newCumulativeCompanyContribution += companyContribution;

      // Series
      newIndividualSeries.push({
        label: PAYCHECKS[i],
        data: (Array(i).fill(0)).concat(Array(NUM_PAYCHECKS - i).fill(individualContribution)),
        type: 'bar',
        stack: 'IndividualContributionStack',
        valueFormatter: currencyFormatter,
        color: pastelColors[i % pastelColors.length],
      });
      newCompanySeries.push({
        label: PAYCHECKS[i],
        data: (Array(i).fill(0)).concat(Array(NUM_PAYCHECKS - i).fill(companyContribution)),
        type: 'bar',
        stack: 'CompanyContributionStack',
        valueFormatter: currencyFormatter,
        color: pastelColors[i % pastelColors.length],
      })
    }

    // State setters
    setIndividualSeries(newIndividualSeries);
    setCompanySeries(newCompanySeries);
    setCumulativeIndividualContribution(newCumulativeIndividualContribution);
    setCumulativeCompanyContribution(newCumulativeCompanyContribution);
  }, [maxIndividualContribution, income, contributionPercentage]);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // RETURN                                                                                                           //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <Stack sx={styles.fullWidth}>

      <AgeCheckbox onChange={onChangeMaxIndividualContribution} />

      <Typography variant="subtitle1" sx={styles.scrollDownNote}>
        <i>Scroll down to enter income and retirement contribution percentage details!</i>
      </Typography>

      <Stack direction="row" spacing={5} justifyContent="center">
        <CumulativeContributionInfo
          cumulativeContribution={cumulativeIndividualContribution}
          maximumContribution={maxIndividualContribution}
          individualOrCompany={'individual'}
        />
        <CumulativeContributionInfo
          cumulativeContribution={cumulativeCompanyContribution}
          maximumContribution={maxCompanyContribution}
          individualOrCompany={'company'}
        />
      </Stack>

      <SectionTitle
        title={'Individual Contributions'}
        marginBottom={'-40px'}
      />
      <Chart
        xAxisData={PAYCHECKS}
        series={individualSeries}
        maximumContribution={maxIndividualContribution}
        maximumContributionLabel={'Maximum Individual Contribution'}
      />

      <SectionTitle
        title={'Company Contributions'}
        marginBottom={'-40px'}
      />
      <Chart
        xAxisData={PAYCHECKS}
        series={companySeries}
        maximumContribution={maxCompanyContribution}
        maximumContributionLabel={'Maximum Company Contribution'}
      />

      <SectionTitle
        title={'Summary of Contributions'}
        marginBottom={'20px'}
      />
      <Stack direction="row" spacing={5} justifyContent="center" sx={styles.autopopulateButtons}>
        <AutopopulateIncome autopopulateIncome={autopopulateIncome} />
        <AutopopulateContributionPercentage autopopulateContributionPercentage={autopopulateContributionPercentage} />
      </Stack>
      <SummaryTable
        paychecks={PAYCHECKS}
        income={income}
        onChangeIncome={onChangeIncome}
        contributionPercentage={contributionPercentage}
        onChangeContributionPercentage={onChangeContributionPercentage}
        individualContributions={individualSeries.map((elt, idx) => elt['data'][idx])}
        companyContributions={companySeries.map((elt, idx) => elt['data'][idx])}
      />

    </Stack>
  );
}
