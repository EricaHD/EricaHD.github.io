import React from 'react';
import { Box, styled } from '@mui/system';
import { Unstable_NumberInput as BaseNumberInput, numberInputClasses } from '@mui/base/Unstable_NumberInput';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { blue, grey } from './utils/colors';
import styles from './styles/IncomeInput';

const NumberInput = React.forwardRef(function CustomNumberInput(props, ref) {
  return (
    <BaseNumberInput
      slots={{
        root: InputRoot,
        input: InputElement,
      }}
      {...props}
      ref={ref}
    />
  );
});

export default function IncomeInput({ label, value, onChange }) {
  return (
    <Stack direction="column" sx={styles.incomeInputStack}>
      <Typography variant="caption">{label}</Typography>
      <NumberInput
        startAdornment={<InputAdornment sx={styles.inputAdornment}>$</InputAdornment>}
        onChange={(event, val) => onChange(event, val)}
        min={0}
        defaultValue={value}
      />
    </Stack>
  );
}

const InputAdornment = styled('div')(
  ({ theme }) => `
  margin: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  grid-row: 1/3;
  color: ${theme.palette.mode === 'dark' ? grey[500] : grey[700]};
`
);

const InputRoot = styled('div')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
  };
  display: grid;
  grid-template-columns: auto 1fr auto 19px;
  grid-template-rows: 1fr 1fr;
  overflow: hidden;
  padding: 0;

  &.${numberInputClasses.focused} {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === 'dark' ? blue[700] : blue[200]
    };
  }

  &:hover {
    border-color: ${blue[400]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

const InputElement = styled('input')(
  ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  grid-row: 1/3;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 0 12px;
  outline: 0;
`
);
