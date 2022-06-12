import * as React from "react";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import axios from 'axios'
import {useState} from "react"
function Content(props){
  const { appointment,refresh, onClose, ...other } = props;

  const [shift, setShift] = useState(appointment?.shift);
  const [status, setStatus] = useState(appointment?.status);
  const [date, setDate] = useState(appointment?.dueDate);
  
  const Submit = ()=>{
    fetch('config/APPOINT_SERVICE_URI')
      .then((r) => r.text())
      .then( APPOINT_SERVICE_URI  => {
        axios.put(`${APPOINT_SERVICE_URI}/${appointment._id}`, {
          dueDate: date, 
          shift: shift,
          status: status
        }).then(res=>{
          console.log(res.data)
          refresh()
          onClose()
        }).catch(err=>console.log(err))
      })
    
  }
  return(
    <div>
      <h5>Date:</h5>
      <input type="date" value={date} onChange={(e)=>{setDate(e.target.value)}}/>

      <h5>Shift:</h5>
      <select value={shift} placeholder="shift" onChange={(e)=>{setShift(e.target.value)}}>
        <option>morning</option>
        <option>afternoon</option>
      </select>     

      <h5>Status:</h5>
      <select value={status}  placeholder="status" onChange={(e)=>{setStatus(e.target.value)}}>
        <option>pending</option>
        <option>attempted</option>
        <option>completed</option>
        <option>canceled</option>
      </select>    
      <br />
      <br />
      <br />
      <button className="btn btn-primary" onClick={Submit}>Submit</button> 
    </div>
  )
}
function ConfirmationDialogRaw(props) {
  const { onClose, open, appointment, refresh, ...other } = props;
  
  return (
    <Dialog
      onClose={onClose}
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
      {...other}
    >
      <DialogContent dividers>
        {appointment != null? <Content appointment={appointment} refresh={refresh} onClose={onClose}/>: <div></div>}
      </DialogContent>
    </Dialog>
  );
}

export default function ConfirmationDialog(props) {
  const [open, setOpen] = useState(false);
  const [appointment, setAppointment] = useState(null);
  const handleOpen = () => {
    fetch('config/APPOINT_SERVICE_URI')
      .then((r) => r.text())
      .then( APPOINT_SERVICE_URI  => {
        axios.get(`${APPOINT_SERVICE_URI}/${props.id}`).then(res=>{
          setOpen(true)
          setAppointment(res.data)
        })   
      })
    
  };

  const handleClose = () => {
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
        appointment = {appointment}
        refresh={props.refresh}
      />
    </div>
  );
}
