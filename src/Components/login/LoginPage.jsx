import React from 'react'
import { Container, Grid, makeStyles, CssBaseline } from '@material-ui/core'
import Login from './Login';
//used solely for styling 
const useStyles = makeStyles((theme) => ({
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
          theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    right: {
        backgroundColor: 'Lime'
    },
}));

export default function LoginPage(){
    const styles = useStyles();

    return(
        <div>
            <Container maxWidth="sm">
                <CssBaseline />
                <Grid container>
                <Grid item xs={false} sm={4} md={7} className={styles.image} />
                    <Grid item xs={12} sm={8} md={5} elevation={6} square>
                        <Login />
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}