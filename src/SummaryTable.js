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

export default function SummaryTable({ header, individualContributions, companyContributions }) {
  return (
    <div>
      <Typography variant="h5" sx={styles.tableTitle}>Summary of Contributions</Typography>
      <TableContainer component={Paper} sx={styles.table}>
        <Table size="small">
          {/* Header */}
          <TableHead>
            <TableRow>
              <TableCell />
              {header.map((row) => (
                <TableCell key={row}>{row}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          {/* Rows */}
          <TableBody>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {'Individual:'}
              </TableCell>
              {individualContributions.map((individualContribution, idx) => (
                <TableCell component="th" scope="row" key={idx}>
                  {currencyFormatter(individualContribution)}
                </TableCell>
              ))}
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {'Company:'}
              </TableCell>
              {companyContributions.map((companyContribution, idx) => (
                <TableCell component="th" scope="row" key={idx}>
                  {currencyFormatter(companyContribution)}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
