import React, { useEffect } from 'react'
import AdminList from './AdminList'
import { Container } from '@material-ui/core'
import { useDispatch } from 'react-redux';
import { dispatchLink } from '../../redux/actions/redirectAction'

//Displays a page of components for the admin view
export default function AdminPage(){
    const dispatch = useDispatch();

    //Used for redirection back to this page from an error page
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