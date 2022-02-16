import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import AppoitmentForm from './appointment.form.component'

function ConfirmationDialogRaw(props) {
  const { onClose, open, refresh, id , ...other } = props;
 
  return (
    <Dialog
      onClose={onClose}
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
      {...other}
    >
      <DialogContent dividers>
        <AppoitmentForm id={id} close={(message)=>{
          window.alert(message)
          if(message == "Changed Successfully !"){
            onClose();
            refresh()
          }
        }} />
      </DialogContent>
    </Dialog>
  );
}

export default function ConfirmationDialog(props) {
  const [open, setOpen] = useState(false);

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <a className="red-btn" onClick={handleClickListItem}><i className="fas fa-pen"></i></a>
      <ConfirmationDialogRaw
        id="ringtone-menu"
        keepMounted
        open={open}
        onClose={handleClose}
        refresh={props.refresh}
        id={props.id}
      />
    </div>
  );
}