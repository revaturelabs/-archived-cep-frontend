import React, { useEffect, ReactElement } from "react";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import ViewListIcon from "@material-ui/icons/ViewList";
import SchoolIcon from "@material-ui/icons/School";
import ListIcon from "@material-ui/icons/List";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useStyles } from "./DrawerStyle";
import "./Drawer.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { dispatchLoggedOut } from "../../../redux/actions/userAction";

//To add a link to your page, add a <ListItem>, <ListItemIcon> and <ListItemText>
//under <Drawer><List>

export default function MiniDrawer(props: any): ReactElement {
  interface useStylesINF {
    root: string,
    appBar: string,
    appBarShift: string,
    menuButton: string,
    hide: string,
    drawer: string,
    drawerOpen: string,
    drawerClose: string,
    toolbar: string,
    content: string
  }
  const classes: useStylesINF = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleDrawerOpen = ():void => {
    setOpen(true);
  };

  const handleDrawerClose = ():void => {
    setOpen(false);
  };

  function logOut(): void {
    dispatch(dispatchLoggedOut());
    //window.location.reload();
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        id="appBar"
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
            style={{ color: "#474C55" }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            <img
              id="image"
              src="https://3g4d13k75x47q7v53surz1gi-wpengine.netdna-ssl.com/wp-content/themes/revature/imgs/logo.png"
              alt="Revature logo"
            />
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem>
            <ListItemIcon>
              <Link to="/">
                <HomeIcon style={{ color: "#474C55" }} />
              </Link>
            </ListItemIcon>
            <ListItemText style={{ color: "#474C55" }}>Home</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <Link to="/my_batches">
                {/* TODO: Make it a nice icon */}
                <SchoolIcon style={{ color: "#474C55" }} />
              </Link>
            </ListItemIcon>
            <ListItemText style={{ color: "#474C55" }}>My Batches</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <Link to="/intervention">
                <ListIcon style={{ color: "#474C55" }} />
              </Link>
            </ListItemIcon>
            <ListItemText style={{ color: "#474C55" }}>
              Make Request
            </ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <Link to="/admin">
                <ViewListIcon style={{ color: "#474C55" }} />
              </Link>
            </ListItemIcon>
            <ListItemText style={{ color: "#474C55" }}>Admin</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <a href="/">
                <ExitToAppIcon style={{ color: "#474C55" }} onClick={logOut} />
              </a>
            </ListItemIcon>
            <ListItemText style={{ color: "#474C55" }}>Log Out</ListItemText>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
    </div>
  );
}
