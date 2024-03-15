import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { currencyFormatter } from './utils/monetaryCalculations';
import styles from './styles/IndividualContributionInfo';

export default function IndividualContributionInfo({ cumulativeIndividualContribution, maxIndividualContribution }) {
  return (
    <Box sx={styles.individualContributionInfo}>
      <Typography variant="h3">
        {currencyFormatter(cumulativeIndividualContribution)}
      </Typography>
      <Typography variant="body1">
        Total Individual Contribution
      </Typography>
      <Typography variant="body2">
        Out of {currencyFormatter(maxIndividualContribution)} maximum individual contribution
      </Typography>
    </Box>
  );
}
