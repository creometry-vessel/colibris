import Dialog from '@mui/material/Dialog';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";
export default function EditDialog(props) {
  const [cookies] = useCookies(["colibrisID"]);
  const [avatar, setAvatar] = useState("")
    const handleClose = () => {
      props.setOpen(false);
    };
    const Submit = ()=>{
      fetch("config/USER_SERVICE_URI")
      .then((r) => r.text())
      .then((USER_SERVICE_URI) => {
        axios
          .put(`${USER_SERVICE_URI}/${cookies.colibrisID}`, {avatar: avatar})
          .then((res) => {
            console.log(res)
            handleClose()
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
    useEffect(()=>{
      fetch("config/USER_SERVICE_URI")
      .then((r) => r.text())
      .then((USER_SERVICE_URI) => {
        axios
          .get(`${USER_SERVICE_URI}/${cookies.colibrisID}`)
          .then((res) => {
            setAvatar(res.data.avatar)
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }, [])
  return (
    
    <Dialog onClose={handleClose} fullWidth={true} maxWidth={"md"} open={props.openDialog}>
      <div className='contact'>
      <div className='container-fluid mt-4 mb-5 center contact-form'>
      <h5>Entrer le lien vers la photo</h5>
      <input
            placeholder="Lien vers la photo"
            className="form-control mt-3"
            type="text"
            value={avatar}
            onChange={(e)=>setAvatar(e.target.value)}
          />
          <button className='btn custom-btn mt-4' onClick={Submit}>Submit</button>
      </div>
      </div>
    </Dialog>
  );
}

