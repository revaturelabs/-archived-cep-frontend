import React, { useState, useEffect } from 'react'
import { Grid, Typography, makeStyles, Card, CardContent, CardHeader, Button } from '@material-ui/core'

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
    color: {
        backgroundColor: '#F26925'
    },
    spacing: {
        marginTop: '15px',
        marginBottom: '15px'
    }
}));

export default function AdminList(props){
    const styles = useStyles();
    const [statusColor, setStatusColor] = useState(props.data.status);


    useEffect(() => {
        
    })

    function changeStatus(){
        setStatusColor()
    }

    return(
        <Card className={styles.spacing}>
            <CardHeader className={styles.color}></CardHeader>
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