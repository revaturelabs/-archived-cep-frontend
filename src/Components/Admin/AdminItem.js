import React, { useState, useEffect } from 'react'
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
        alignItems: 'center'
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
        setStatusColor('#72A4C2')
        setStatus('Complete')
        updateToComplete()
    }

    //There needs to be an axios call to update the status on the database
    const updateToComplete = () => {
        //Get JWT
        const updateData = {
            requestId: props.data.requestId,
            batchId: props.data.batchId,
            userId: props.data.userId,
            startTime: props.data.startTime,
            endTime: props.data.endTime,
            isAllDay: props.data.isAllDay,
            status: 'Complete',
            requestType: props.data.requestType,
            desciption: props.data.desciption,
        }

        //axios call
        Axios.put()
        .then((response) => console.log())
        .catch((err) => console.log())
    }

    //Handle onClick delete
    const handleDelete = () => {

    }
    
    //Simply return the button component for conditional rendering
    const ButtonComplete = () => {
        return(
            <Button variant="outlined" color="primary" onClick={handleToComplete}>Completed</Button>
        )
    }
    const ButtonDelete = () => {
        return(
            <Button variant="outlined" color="secondary" onClick={handleDelete}>Delete</Button>
        )
    }

    return(
        <Card className={styles.spacing}>
            <CardHeader style={{backgroundColor: statusColor}}></CardHeader>
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item xs={3} className={styles.left}>
                        <Typography variant="overline">{props.data.companyName}</Typography>
                        <Typography variant="h4">{props.data.firstName}{" "}{props.data.lastName}</Typography>
                        <Typography variant="body1">{props.data.technology}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2">{props.data.descrip}</Typography>
                    </Grid>
                    <Grid item xs={3} className={styles.right}>
                        <Typography variant="body2">{props.data.date}</Typography>
                        {buttonDeleteVisi ? <ButtonDelete/> : null}
                        {buttonCompleteVisi ? <ButtonComplete/> : null}
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}