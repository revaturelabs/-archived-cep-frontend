import React, { useEffect, ReactElement } from 'react'
import AdminList from './AdminList'
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
export default function AdminPage():ReactElement{
    const styles:Object = useStyles();
    const dispatch:Function = useDispatch();

    useEffect(():void => {
        dispatch(dispatchLink('/admin'));
    }, [])

    return(
        <div>
            <Container>
                <AdminList/>
            </Container>
        </div>
    )
}