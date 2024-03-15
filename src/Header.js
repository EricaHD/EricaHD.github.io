import React from 'react';
import Typography from '@mui/material/Typography';
import styles from './styles/Header';

export default function Header() {
  return (
    <div>
      <Typography variant="h3" sx={styles.title}>
        Retirement Contribution Calculator
      </Typography>
      <Typography variant="h6" sx={styles.subtitle}>
        with a 2% per-paycheck match from your company
      </Typography>
    </div>
  );
}
