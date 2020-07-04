import React from 'react'
import { Grid, makeStyles, Paper, CssBaseline } from '@material-ui/core'
import Login from './Login';

//used solely for styling 
const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
  }));

//Renders the login page and its components
export default function LoginPage(){
    const styles = useStyles();

    return(
      <Grid container component="main" className={styles.root}>
        <CssBaseline />
        {/*If you don't want to have the image and just the login component then just delete the Grid item below*/}
        <Grid item xs={false} sm={4} md={7} className={styles.image} />
        {/*Then change the grid scalings below to 12*/}
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Login />
        </Grid>
      </Grid>
    )
}