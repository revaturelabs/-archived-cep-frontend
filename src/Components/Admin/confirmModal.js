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
import { useSelector, useDispatch } from "react-redux";
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
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    confirmBtn: {
        position: 'absolute',
        left: '3%',
        bottom: '5%',
        backgroundColor: "#f26925",
        color: "#fff",
        borderColor: "#f26925",
        height: "7%",
        width: "10%",
        fontSize: "medium",
        marginTop: "5%" 
    },
    cancelBtn: {
        position: 'absolute',
        right: '3%',
        bottom: '5%',
        backgroundColor: "grey",
        color: "#fff",
        borderColor: "grey",
        height: "7%",
        width: "10%",
        fontSize: "medium",
        marginTop: "5%"
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
        console.log("inside confirmation function");
        console.log(chosen);
        console.log()
        if (chosen == null) {
            setMessage("Must resolve account or cancel")
        } else if (chosen === "deny" && message == "") {
            setMessage("Must write deny message")
        } else if (chosen === "deny") {
            props.hideCard();
            setOpen(false);
            axios.get(process.env.REACT_APP_ZUUL_ROUTE + "/pending/deny?id="+props.userInfo.userId, {
                message
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
                .then(function (response) {
                    alert(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else if (chosen === "confirm") {
            props.hideCard();
            setOpen(false);
            axios.get(process.env.REACT_APP_ZUUL_ROUTE + "/pending/approve?id="+props.userInfo.userId, {
                
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
                .then(function (response) {
                    alert(response.data);
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
            <br />
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
                    <h1>{props.userInfo.firstName} {props.userInfo.lastName}</h1>
                    <h3>{props.userInfo.email}</h3>
                    <h3>{props.userInfo.company}</h3>
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
                        {chosen ==="deny" ? 
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
                        confirm
                    </button>
                    <button type="button" variant="contained" className={classes.cancelBtn} onClick={handleClose}>
                        cancel
                    </button>
                </div>
            </Modal>
        </div>
    );
}
