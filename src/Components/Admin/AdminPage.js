import React, { useEffect } from 'react'
import AdminList from './AdminList'
import { makeStyles, Container } from '@material-ui/core'
import { useDispatch } from 'react-redux';
import { dispatchLink } from '../../redux/actions/redirectAction'

const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: 'Aqua'
    },
}));

//Displays components for Admin
//Might might not even need this component
export default function AdminPage(){
    const styles = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
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