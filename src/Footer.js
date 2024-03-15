import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import styles from './styles/Footer';

export default function Footer() {
  const disclaimers = [
    'I am not a financial advisor; this is not financial advice',
    'Data you enter here is not logged or saved by me, so take a screenshot if you would like to refer back',
    'Fidelity will cap 401k contributions at the yearly limit, but if you contributed to a different 401k account for another job this year, you are responsible for contributing the correct amount to this account',
    'Fidelity only allows integer contribution percentages (as does this calculator)',
    'The contribution percentage for your STI should equal the contribution percentage for your Mar #1 paycheck (this calculator does not enforce that, so make sure you fill in numbers accordingly)',
  ];
  return (
    <Box sx={styles.footerBackground}>
      <Typography variant="h5">
        Disclaimers!
      </Typography>
      <List sx={styles.bulletList}>
        {disclaimers.map((disclaimer, idx) => (
          <ListItem sx={styles.listItem} key={idx}>
            <Typography variant="body2">
              {disclaimer}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
