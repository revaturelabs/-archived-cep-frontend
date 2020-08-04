import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import RequestForm from "./Intervention/Intervention";
import {Button} from "@material-ui/core";
import { useSelector } from 'react-redux';

/**
 * Modal doesn't work in TS, so we use JS.
 * 
 */


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

   /* >>>>>> addon*/ const batch = useSelector((state) => state.batchReducer);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      {/* <SimpleModal /> */}
      <RequestForm batchId ={batch.batchId} batch={batch}/> {/* changed by Michael Worrell */}
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
      {/* Was originally Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {/* <RequestForm  /> */}{body}
      </Modal>
    </div>
  );
}
