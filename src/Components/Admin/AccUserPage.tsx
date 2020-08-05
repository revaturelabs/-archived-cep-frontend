import React, { useEffect, ReactElement } from 'react'
import AccUserList from './AccUserList'
import { makeStyles, Container } from '@material-ui/core'
import { useDispatch } from 'react-redux';
import { dispatchLink } from '../../redux/actions/redirectAction'

const useStyles:Function = makeStyles(():any => ({
    root: {
        backgroundColor: 'Aqua'
    },
}));
//Displays components for Admin
//Might might not even need this component
export default function AccUserPage():ReactElement{
    const styles:Object = useStyles();
    const dispatch:Function = useDispatch();

    useEffect(():void => {
        dispatch(dispatchLink('/acceptuser'));
    }, [])

    return(
        <div>
            <Container>
                <AccUserList/>
            </Container>
        </div>
    )
}