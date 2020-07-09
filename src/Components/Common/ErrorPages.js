import React from 'react'
import { makeStyles, Typography, Button, Card } from '@material-ui/core'
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(() => ({
    root: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FCB414'
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px'
    },
    button: {
        margin: '10px',
    }
}));

//403 page
export function Forbbiden(){
    const styles = useStyles();
    const history = useHistory();
    const prevLink = useSelector(state => state.redirectReducer);

    /*TODO: There's probably a better way to redirect the user back to the previous page, but currently we get the path from redux store which updates 
    everytime a user goes to a new path. An example of this dispatch is in AdminPage component line 13. This is not done on all paths as of the end of sprint 1*/
    const Redirect = () => history.push(prevLink)

    return(
        <div className={styles.root}>
            <Card className={styles.card}>
                <Typography variant='h1'>403</Typography>
                <Typography variant='caption'>This page is not for you</Typography>
                <Button className={styles.button} variant="outlined" color='primary' onClick={Redirect}>Go Back</Button>
            </Card>
        </div>
    )
}

//404 page
export function NotFound(){
    const styles = useStyles();
    const history = useHistory();
    const prevLink = useSelector(state => state.redirectReducer);

    const Redirect = () => history.push(prevLink)

    return(
        <div className={styles.root}>
            <Card className={styles.card}>
                <Typography variant='h1'>404</Typography>
                <Typography variant='caption'>Page Not Found</Typography>
                <Button className={styles.button} variant="outlined" color='primary' onClick={Redirect}>Go Back</Button>
            </Card>
        </div>
    )
}