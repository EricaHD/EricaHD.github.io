import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import ContributionPercentageInput from './ContributionPercentageInput';
import styles from './styles/AutopopulateContributionPercentage';

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
      <DialogTitle>Autopopulate Retirement Contribution</DialogTitle>
      <DialogContent dividers>
        <Stack direction="row" spacing={5} alignItems="center" justifyContent="space-between">
          <Typography variant="body1">Retirement contribution percentage:</Typography>
          <ContributionPercentageInput value={12} onChange={(event, val) => console.log(event, val)} />
        </Stack>
        <br />
        <Typography variant="body1">
          <i>
            This will overwrite the values currently in the "Retirement Contribution" column.
            You can still edit those values after autopopulating.
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

export default function AutopopulateContributionPercentage() {
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
        Autopopulate<br />retirement contribution
      </Button>
      <ConfirmationDialogRaw
        open={open}
        onClose={handleClose}
        value={value}
      />
    </div>
  );
}
