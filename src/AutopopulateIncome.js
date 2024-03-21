import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IncomeInput from './IncomeInput';
import styles from './styles/AutopopulateIncome';

function ConfirmationDialogRaw(props) {
  const { onClose, value: valueProp, open } = props;
  const [value, setValue] = React.useState(valueProp);

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value);
  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="sm"
      open={open}
    >
      <DialogTitle>Autopopulate Paycheck Income</DialogTitle>
      <DialogContent dividers>
        <Stack direction="row" spacing={5} alignItems="center" justifyContent="space-between">
          <Typography variant="body1">Annual base salary before Mar 1:</Typography>
          <IncomeInput value={1000} onChange={(event, val) => console.log(idx, event, val)} />
        </Stack>
        <br />
        <Stack direction="row" spacing={5} alignItems="center" justifyContent="space-between">
          <Typography variant="body1">Annual base salary after Mar 1:</Typography>
          <IncomeInput value={1000} onChange={(event, val) => console.log(idx, event, val)} />
        </Stack>
        <br />
        <Stack direction="row" spacing={5} alignItems="center" justifyContent="space-between">
          <Typography variant="body1">STI (paid out on Mar 15):</Typography>
          <IncomeInput value={1000} onChange={(event, val) => console.log(idx, event, val)} />
        </Stack>
        <br />
        <Typography variant="body1">
          <i>
            This will overwrite the values currently in the "Paycheck Income" column.
            You can still edit those values after autopopulating (e.g. in the case of an off-cycle raise or bonus).
          </i>
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}

export default function AutopopulateIncome() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('Dione'); // TODO (erica)

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickListItem} sx={styles.button}>
        Autopopulate<br />paycheck income
      </Button>
      <ConfirmationDialogRaw
        open={open}
        onClose={handleClose}
        value={value}
      />
    </div>
  );
}
