import React from 'react';
import Table from '@mui/material/Table';
import Typography from '@mui/material/Typography';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { currencyFormatter } from './utils/monetaryCalculations';
import styles from './styles/SummaryTable';

export default function SummaryTable({ paychecks, individualContributions, companyContributions }) {
  return (
    <div>
      <TableContainer component={Paper} sx={{ margin: '0 30px', width: '95%' }}>
        <Table size="small">
          {/* Header */}
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell><b>{'Annual salary ÷ 24'}</b></TableCell>
              <TableCell><b>Retirement contribution</b></TableCell>
              <TableCell><b>Individual contribution</b></TableCell>
              <TableCell><b>Company contribution</b></TableCell>
            </TableRow>
          </TableHead>
          {/* Rows */}
          <TableBody>
            {paychecks.map((paycheck, idx) => (
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <b>{paycheck}</b>
                </TableCell>
                <TableCell component="th" scope="row">
                  Income input
                </TableCell>
                <TableCell component="th" scope="row">
                  Retirement contribution input
                </TableCell>
                <TableCell component="th" scope="row" key={idx}>
                  {currencyFormatter(individualContributions[idx])}
                </TableCell>
                <TableCell component="th" scope="row" key={idx}>
                  {currencyFormatter(companyContributions[idx])}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
