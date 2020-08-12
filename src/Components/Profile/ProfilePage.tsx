import React, { useEffect, ReactElement } from 'react';
import { makeStyles, Container } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { dispatchLink } from '../../redux/actions/redirectAction';
import ProfileList from './ProfileList'

const useStyles: Function = makeStyles((): any => ({
    root: {
        backgroundColor: 'Aqua'
    },
}));
//Displays components for Admin
//Might might not even need this component
export default function ProfilePage(): ReactElement {
    const styles: Object = useStyles();
    const dispatch: Function = useDispatch();

    useEffect((): void => {
        dispatch(dispatchLink('/profile'));
    }, [])

    return (
        <div>
            <Container>
                <ProfileList />
            </Container>
        </div>
    )
}