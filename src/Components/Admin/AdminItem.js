import React, { useState, useEffect} from 'react'
import { Grid, Typography, makeStyles, Card, CardContent, CardHeader, Button } from '@material-ui/core'
import Axios from 'axios';

//used solely for styling 
const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    left: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    right: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rightButton: {
        marginTop: '5px',
        marginBottom: '5px',
    },
    spacing: {
        marginTop: '15px',
        marginBottom: '15px'
    },
}));

//Display individual requests
export default function AdminItem(props){
    const styles = useStyles();

    //Status=Pending color is Orange, Status=Completed color is Blue
    //Initial color is Orange
    const [statusColor, setStatusColor] = useState('#F26925'); 
    const [status, setStatus] = useState(props.data.status)

    //States used for conditional rendering
    const [buttonCompleteVisi, setButtonCompleteVisi] = useState(true)
    const [buttonDeleteVisi, setButtonDeleteVisi] = useState(true)

    //Simply return the button component for conditional rendering
    const ButtonComplete = () => {
        return(
            <Button className={styles.rightButton} variant="outlined" color="primary" onClick={handleToComplete}>Completed</Button>
        )
    }
    const ButtonDelete = () => {
        return(
            <Button className={styles.rightButton} variant="outlined" color="secondary" onClick={handleDelete}>Delete</Button>
        )
    }

    //On first render check if the status is complete and render the correct color and buttons
    useEffect(() => {
        if(status === 'Complete'){
            setStatusColor('#72A4C2')
            setButtonCompleteVisi(false)
        }
    },[status])

    //handle complete button to change to the color, status, 
    //and call a function to persist the complete status of the request
    const handleToComplete = () => {
        setStatus('Complete')
        updateToComplete()
    }

    //There needs to be an axios call to update the status on the database
    const updateToComplete = () => {
        //Get JWT

        //axios call
        Axios.put(`http://localhost:8080/admin/request/${props.data.requestId}`,{
            status: 'Complete'
        })
        .then((response) => console.log('Success'))
        .catch((err) => console.log('Failure'))
    }

    //Handle onClick delete
    const handleDelete = () => {
        Axios.delete(`http://localhost:8080/admin/request/delete/${props.data.requestId}`)
        .then((response) => {
            /*After delete we reload the webpage so it can show "real time" that the request has been deleted
            May want to just hide the card to not lose potential filtering and sorting options later on*/
            window.location.reload();
        })
        .catch((err) => console.log('Failure'))
    }

    return(
        <Card className={styles.spacing}>
            <CardHeader style={{backgroundColor: statusColor}}></CardHeader>
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item xs={3} className={styles.left}>
                        <Typography variant="overline">{props.data.companyName}</Typography>
                        <Typography variant="h4">{props.data.firstName}{" "}{props.data.lastName}</Typography>
                        <Typography variant="body1">{props.data.requestType}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2">{props.data.descrip}</Typography>
                    </Grid>
                    <Grid item xs={3} className={styles.right}>
                        <Typography variant="body2">{props.data.endTime}</Typography>
                        {buttonDeleteVisi ? <ButtonDelete/> : null}
                        {buttonCompleteVisi ? <ButtonComplete/> : null}
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}