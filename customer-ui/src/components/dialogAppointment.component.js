import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import Schedule from './scheduleAppointment.component'

function ConfirmationDialogRaw(props) {
  const { onClose, open, refresh, id , ...other } = props;
 
  return (
    <Dialog
      onClose={onClose}
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xl"
      fullWidth={true}
      open={open}
      {...other}
    >
      <DialogContent dividers>
        <Schedule id={id} close={(message)=>{
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
      <a onClick={handleClickListItem}><i className="green-icon fas fa-pen"></i></a>
      <ConfirmationDialogRaw
        keepMounted
        open={open}
        onClose={handleClose}
        refresh={props.refresh}
        id={props.id}
      />
    </div>
  );
}