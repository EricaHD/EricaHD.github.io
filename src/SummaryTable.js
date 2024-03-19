import React from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import IncomeInput from './IncomeInput';
import ContributionPercentageInput from './ContributionPercentageInput';
import { currencyFormatter } from './utils/monetaryCalculations';
import styles from './styles/SummaryTable';

export default function SummaryTable({
  paychecks,
  income,
  onChangeIncome,
  contributionPercentage,
  onChangeContributionPercentage,
  individualContributions,
  companyContributions,
}) {
  return (
    <TableContainer component={Paper} sx={styles.tableContainer}>
      <Table size="small">
        {/* Header */}
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell><b>Paycheck Income<br />(annual salary ÷ 24, or STI grant)</b></TableCell>
            <TableCell><b>Retirement Contribution</b></TableCell>
            <TableCell><b>Individual Contribution</b></TableCell>
            <TableCell><b>Company Contribution</b></TableCell>
          </TableRow>
        </TableHead>
        {/* Rows */}
        <TableBody>
          {paychecks.map((paycheck, idx) => (
            <TableRow sx={styles.tableRow} key={paycheck}>
              <TableCell component="th" scope="row" key={`${paycheck}-paycheck`}>
                <b>{paycheck}</b>
              </TableCell>
              <TableCell component="th" scope="row" key={`${paycheck}-income`}>
                <IncomeInput value={income[idx]} onChange={(event, val) => onChangeIncome(idx, event, val)} />
              </TableCell>
              <TableCell component="th" scope="row" key={`${paycheck}-contrib`}>
                <ContributionPercentageInput value={contributionPercentage[idx]} onChange={(event, val) => onChangeContributionPercentage(idx, event, val)} />
              </TableCell>
              <TableCell component="th" scope="row" key={`${paycheck}-individual`}>
                {currencyFormatter(individualContributions[idx])}
              </TableCell>
              <TableCell component="th" scope="row" key={`${paycheck}-company`}>
                {currencyFormatter(companyContributions[idx])}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
