import React from 'react'
import AdminList from './AdminList'
import { makeStyles, Container } from '@material-ui/core'

const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: 'Aqua'
    },
}));

//Displays components for Admin
export default function AdminPage(){
    const styles = useStyles();
    
    return(
        <div>
            <Container>
                <AdminList/>
            </Container>
        </div>
    )
}