import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button } from "@material-ui/core";
import Event from './Event';

/**
 * Modal doesn't work in TS, so we use JS.
 * 
 */

/* let conditionalRole = {
  ROLE_ADMIN:"ADMIN",
  ROLE_CLIENT:"CLIENT"
} */

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
        height: "contain",
        backgroundColor: theme.palette.background.paper,
        borderStyle: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function CalModal(props) {
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


    return (
        <div>
            <Button variant="contained" style={{ backgroundColor: "#f26925", color: "#fff", fontSize: 10 }} onClick={handleOpen}>
                Events: {props.Events.length}
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={modalStyle} className={classes.paper}>
                    {props.Events.map((event) =>
                        <Event key={event} eventItem={event} />
                    )}
                </div>
            </Modal>
        </div>
    );
}

