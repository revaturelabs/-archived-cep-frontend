import React from 'react'
import { makeStyles, Typography, Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
}));

export function Forbbiden(){
    const styles = useStyles();
    const history = useHistory();
    const prevLink = useSelector(state => state.link);

    const Redirect = () => history.push(prevLink)

    return(
        <div className={styles.root}>
            <Typography variant='h1'>403</Typography>
            <Typography variant='caption'>This page is not for you</Typography>
            <Button type='submit' variant='outline' color='primary' onClick={Redirect}>Go Back</Button>
        </div>
    )
}

export function NotFound(){
    const styles = useStyles();
    const history = useHistory();
    const prevLink = useSelector(state => state.link);

    const Redirect = () => history.push(prevLink)

    return(
        <div className={styles.root}>
            <Typography variant='h1'>404</Typography>
            <Typography variant='caption'>Page Not Found</Typography>
            <Button type='submit' variant='outline' color='primary' onClick={Redirect}>Go Back</Button>
        </div>
    )
}