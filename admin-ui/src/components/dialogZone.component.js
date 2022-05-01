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
        {open? <Tags cities={cities} setCities={setCities} weekday={props.weekday}/>: <div></div>}
        
      </DialogContent>
    </Dialog>
  );
}

export default function ConfirmationDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [cities, setCities] = React.useState([]);
  const handleOpen = () => {
    axios.get(`${window.ENV.ZONE_SERVICE_URI}/${props.weekday}`).then(res=>{
      setCities(res.data.data.zone.cities)
      setOpen(true);
    })
  };

  const handleClose = (newValue) => {
    setOpen(false);
  };

  return (
    <div>
      <div
      onClick={handleOpen}
      className="mx-2 my-2" style={{width: "200px", height: "200px", borderColor: "black", borderWidth: "1px", borderStyle: "solid"}}>
        {props.weekday}
      </div>
      <ConfirmationDialogRaw
        id="ringtone-menu"
        keepMounted
        open={open}
        onClose={handleClose}
        cities={cities}
        setCities={setCities}
        weekday={props.weekday}
      />
    </div>
  );
}
