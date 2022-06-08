import * as React from 'react';
import Dialog from '@mui/material/Dialog';

function SimpleDialog(props) {
    const [open, setOpen] = React.useState(false);

    const handleClose = (value) => {
        setOpen(false);
    };
    
  return (
    <Dialog onClose={handleClose} open={open}>
      <h6>Entrer le lien vers la photo</h6>
      <input
            placeholder="Lien vers la photo"
            className="form-control"
            type="text"
            
          />
    </Dialog>
  );
}

