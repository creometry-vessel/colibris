import * as React from "react";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import axios from 'axios'
import Tags from './Tags.component'
function ConfirmationDialogRaw(props) {
  const { onClose, open, cities, setCities, ...other } = props;

  return (
    <Dialog
      onClose={onClose}
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
      {...other}
    >
      <DialogContent dividers>
          <input type="date" />

          <select placeholder="shift">
            <option>morning</option>
            <option>afternoon</option>
          </select>     

          <select placeholder="status" >
            <option>pending</option>
            <option>attempted</option>
            <option>completed</option>
            <option>canceled</option>
          </select>    

          <button>Submit</button> 
      </DialogContent>
    </Dialog>
  );
}

export default function ConfirmationDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [cities, setCities] = React.useState([]);
  
  const handleOpen = () => {
    setOpen(true)
  };

  const handleClose = (newValue) => {
    setOpen(false);
  };

  return (
    <div>
        <button className="btn btn-warning" onClick={handleOpen}><i class="fa fa-pen"></i></button>     
        <ConfirmationDialogRaw
        id="ringtone-menu"
        keepMounted
        open={open}
        onClose={handleClose}
        weekday={props.weekday}
      />
    </div>
  );
}
