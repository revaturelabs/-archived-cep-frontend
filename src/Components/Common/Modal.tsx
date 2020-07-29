import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import RequestForm from "./Intervention/Intervention";
import {Button} from "@material-ui/core";

function getModalStyle() {
  const top = 60
  const left = 60

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: "50%",
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      {/* <SimpleModal /> */}
      <RequestForm/>
    </div>
  );

  return (
    <div>
   {/*    <button type="button" onClick={handleOpen}>
        Open Modal
      </button> */}
      <br />
      <Button variant="contained" style={{backgroundColor:"#f26925", color:"#fff"}} onClick={handleOpen}>
       Make a Request
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {/* <RequestForm  /> */}{body}
      </Dialog>
    </div>
  );
}
