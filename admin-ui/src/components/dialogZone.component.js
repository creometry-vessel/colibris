import * as React from "react";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import axios from 'axios'
import Tags from './Tags.component';
import './zone.css';

function ConfirmationDialogRaw(props) {
  const { onClose, open, cities, setCities, ...other } = props;

  return (
    <Dialog
      onClose={onClose}
      sx={{ "& .MuiDialog-paper": { width: "70%", maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
      {...other}
    >
      <DialogContent dividers>
        {open? 
        <div>
          <Tags  cities={cities} setCities={setCities} weekday={props.weekday} handleClose={onClose} />
        </div> : <div></div>}
        
      </DialogContent>
    </Dialog>
  );
}

export default function ConfirmationDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [cities, setCities] = React.useState([]);
  
  const handleOpen = () => {
    fetch('config/ZONE_SERVICE_URI')
      .then((r) => r.text())
      .then( ZONE_SERVICE_URI  => {
        axios.get(`${ZONE_SERVICE_URI}/${props.weekday}`).then(res=>{
          console.log(res.data.data.zones)
          setCities(res.data.data.zones.cities)
          setOpen(true);
        })
      })
    
  };

  const handleClose = (newValue) => {
    props.refresh();
    setOpen(false);
  };

  return (
    <div>
      <div
      className="mr-3 mb-3"
      onClick={handleOpen}
      >
        <div className="box-shadowly zone-box">
        <h4 className="zone-title">{props.weekday}</h4>
        <ul type="circle">
        {props.zoneData?.cities.map((city, index)=>(
          
          <li>{city}</li>
        ))}
        </ul>
        </div>
        
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
