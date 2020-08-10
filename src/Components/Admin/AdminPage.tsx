import React, { useEffect, ReactElement } from 'react'
import AdminList from './AdminList'
import ClientList from './../Common/clientInterList'
import { makeStyles, Container } from '@material-ui/core'
import { useSelector,useDispatch } from 'react-redux';
import { dispatchLink } from '../../redux/actions/redirectAction'
import conditionalRole from "./../../redux/actions/roleTypes"

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
    const role = useSelector((state: any) => state.credReducer.role);

    useEffect(():void => {
        dispatch(dispatchLink('/admin'));
    }, [])

    if(role===conditionalRole.ROLE_ADMIN){ 
        return(
            <div>
                <Container>
                    <AdminList/>
                </Container>
            </div>
        )
    } else if(role===conditionalRole.ROLE_CLIENT){
        return(
            <div>
                <Container>
                    <ClientList/>
                </Container>
            </div>
        )
    } else{
        return(
            <div>
                <Container>
                </Container>
            </div>
        )
    }
    
}