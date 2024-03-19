import React from 'react';
import Typography from '@mui/material/Typography';
import styles from './styles/SectionTitle';

export default function SectionTitle({ title, marginBottom }) {
  return (
    <Typography variant="h4" sx={{ ...styles.title, marginBottom }}>
      {title}
    </Typography>
  );
}
