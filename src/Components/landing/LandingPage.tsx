import React, { ReactElement } from "react";
import { Grid, makeStyles, Paper, CssBaseline, StyleRules } from "@material-ui/core";
import { useSelector } from "react-redux";
import Login from "./Login";
import pic from "../../assets/GmapsRevature.png";
import Register from "./Register";

//used solely for styling
const useStyles: Function = makeStyles((theme): StyleRules => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${pic})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  toggleBtn: {
    marginLeft: "41%",
    color: "#F26925",
    backgroundColor: "transparent",
    borderColor: "transparent",
    alignSelf: "center",
    cursor: "pointer"
  }
}));

interface styleINF {
  root: string,
  image: string,
  toggleBtn: string
}
//Renders the login page and its components
export default function LandingPage(): ReactElement {

  const [filter, setFilter] = React.useState(true);
  const isLoggedIn: boolean = useSelector((state: any) => state.credReducer.isLoggedIn);

  const styles: styleINF = useStyles();
  if (isLoggedIn) {
    return (
      <Grid container component="main" className={styles.root}>
        <CssBaseline />
        {/*If you don't want to have the image and just the login component then just delete the Grid item below*/}
        <Grid item xs={false} sm={4} md={7} className={styles.image} />
        {/*Then change the grid scalings below to 12*/}
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Login />
        </Grid>
      </Grid>
    );
  } else if (filter) {
    return (
      <Grid container component="main" className={styles.root}>
        <CssBaseline />
        {/*If you don't want to have the image and just the login component then just delete the Grid item below*/}
        <Grid item xs={false} sm={4} md={7} className={styles.image} />
        {/*Then change the grid scalings below to 12*/}
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Login />
          <button onClick={() => { setFilter(false) }} className={styles.toggleBtn}>Register New Client</button>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Grid container component="main" className={styles.root}>
        <CssBaseline />
        {/*If you don't want to have the image and just the login component then just delete the Grid item below*/}
        <Grid item xs={false} sm={4} md={7} className={styles.image} />
        {/*Then change the grid scalings below to 12*/}
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Register />
          <button onClick={() => { setFilter(true) }} className={styles.toggleBtn}> Return to Login</button>
        </Grid>
      </Grid>
    );
  }

}
