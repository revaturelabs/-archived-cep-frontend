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

export default function AdminItem(props){
    const styles = useStyles();
    //Set the initial state based on the the status given by the data in useEffect
    //Status=Pending Orange, Status=Completed Blue
    const [statusColor, setStatusColor] = useState('#F26925'); 
    //Get initial status from props
    const [status, setStatus] = useState(props.data.status)

    

    useEffect(() => {
        
    },[status])

    const changeStatus = () => {
        setStatusColor('#72A4C2')
        setStatus('Complete')
        updateStatus()
    }

    //There needs to be an axios call to update the status on the database
    const updateStatus = () => {
        //Get JWT
        const updateData = {
            requestId: props.data.requestId,
            batchId: props.data.batchId,
            userId: props.data.userId,
            startTime: props.data.startTime,
            endTime: props.data.endTime,
            isAllDay: props.data.isAllDay,
            status: "Complete",
            requestType: props.data.requestType,
            desciption: props.data.desciption,
        }

        //axios call
        Axios.put()
        .then((response) => console.log())
        .catch((err) => console.log())
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
                    <Grid item xs={7}>
                        <Typography variant="body2">{props.data.descrip}</Typography>
                    </Grid>
                    <Grid item xs={2} className={styles.right}>
                        <Typography variant="body2">{props.data.date}</Typography>
                        <Button variant="outlined" color="primary" onClick={changeStatus}>Completed</Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}