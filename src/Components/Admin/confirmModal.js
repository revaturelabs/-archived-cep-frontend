import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button } from "@material-ui/core";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import { useSelector } from "react-redux";
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
        height: "contain",
        backgroundColor: theme.palette.background.paper,
        borderStyle: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    confirmBtn: {
        padding: "5px 15px",
        backgroundColor: "#f26925",
        color: "#fff",
        borderStyle: "none",
        fontSize: "medium",
        marginRight: "15px",
        cursor: "pointer"
    },
    cancelBtn: {
        padding: "5px 15px",
        backgroundColor: "grey",
        color: "#fff",
        borderStyle: "none",
        fontSize: "medium",
        marginRight: "15px",
        cursor: "pointer"
    }
}));

export default function ConfirmModal(props) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [chosen, setChosen] = React.useState(null);
    const [desc, setDesc] = React.useState("");
    const [message, setMessage] = React.useState("");

    const token = useSelector(state => state.credReducer.token);

    //Shows modal
    const handleOpen = () => {
        setOpen(true);
    };

    //Closes with cancel button. Doesn't modify parent
    const handleClose = () => {
        setOpen(false);
    };

    //Handles confirm button. If resolve button is null or resolve button is denied and no description given, will show message and not do anything.
    //Modifies parent with react hook props.hideCard()
    const handleConfirmClose = () => {
        if (chosen == null) {
            setMessage("Must resolve account or cancel")
        } else if (chosen === "deny" && !desc) {
            setMessage("Must write deny message")
        } else if (chosen === "deny") {
            props.hideCard();
            setOpen(false);
            axios.post(process.env.REACT_APP_ZUUL_ROUTE + "/pending/deny?id=" + props.userInfo.userId, {
                denyMessage: desc
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        } else if (chosen === "confirm") {
            props.hideCard();
            setOpen(false);
            axios.get(process.env.REACT_APP_ZUUL_ROUTE + "/pending/approve?id=" + props.userInfo.userId, {

            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    };

    //Sets the denied description
    const handleDesc = (e) => {
        setDesc(e.target.value);
    };

    //Allows to switch between the resolve options
    const handleRadio = (e) => {
        if (e.target.value === chosen) {
            setChosen(null);
        } else {
            setChosen(e.target.value);
        }
    };

    return (
        <div>
            <Button variant="contained" style={{ backgroundColor: "#f26925", color: "#fff" }} onClick={handleOpen}>
                Resolve
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={modalStyle} className={classes.paper}>
                    {/* <SimpleModal /> */}
                    <h4>{props.userInfo.firstName} {props.userInfo.lastName}</h4>
                    <h4>{props.userInfo.company}</h4>
                    <h4>{props.userInfo.email}</h4>
                    <div>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Options: </FormLabel>
                            <RadioGroup aria-label="option" name="options" value={chosen} onChange={handleRadio}>
                                <FormControlLabel value="confirm" control={<Radio />} label="Confirm" />
                                <FormControlLabel value="deny" control={<Radio />} label="Deny" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div>
                        {chosen === "deny" ?
                            <TextField
                                id="filled-multiline-static"
                                multiline
                                rows={4}
                                placeholder="Deny explanation"
                                value={desc}
                                onChange={handleDesc}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                            />
                            : ""
                        }
                    </div>
                    <div >
                        <h5 style={{ color: "red" }}>{message}</h5>
                    </div>
                    <button type="button" variant="contained" className={classes.confirmBtn} onClick={handleConfirmClose}>
                        Confirm
                    </button>
                    <button type="button" variant="contained" className={classes.cancelBtn} onClick={handleClose}>
                        Cancel
                    </button>
                </div>
            </Modal>
        </div>
    );
}
