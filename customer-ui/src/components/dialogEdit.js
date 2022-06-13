import * as React from 'react';
import Dialog from '@mui/material/Dialog';

export default function EditDialog(props) {
    const handleClose = () => {
      props.setOpen(false);
    };
  return (
    
    <Dialog onClose={handleClose} fullWidth={true} maxWidth={"md"} open={props.openDialog}>
      <div className='contact'>
      <div className='container-fluid mt-4 mb-5 center contact-form'>
      <h5>Entrer le lien vers la photo</h5>
      <input
            placeholder="Lien vers la photo"
            className="form-control mt-3"
            type="text"
            
          />
      </div>
      </div>
    </Dialog>
  );
}

