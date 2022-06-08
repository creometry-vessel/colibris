import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";

const options = ["Client injoignable", "Place non reconnue"];

function ConfirmationDialogRaw(props) {
  const { onClose, open, getMarker, ...other } = props;

  return (
    <Dialog
      onClose={onClose}
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
      {...other}
    >
      <DialogContent dividers>
        <List component="div" role="group">
          {options.map((opt, ind) => (
            <ListItem
              key={ind}
              button
              divider
              aria-haspopup="true"
              aria-controls="ringtone-menu"
              aria-label="phone ringtone"
              onClick={() => {
                getMarker("attempted", opt);
                onClose();
              }}
            >
              <ListItemText primary={opt} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}

export default function ConfirmationDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue) => {
    setOpen(false);
  };

  return (
    <div>
      <button className="red-custom-btn" onClick={handleClickListItem}>
        Problème
      </button>
      <ConfirmationDialogRaw
        id="ringtone-menu"
        keepMounted
        open={open}
        onClose={handleClose}
        getMarker={props.getMarker}
      />
    </div>
  );
}
