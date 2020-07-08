import React from "react";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
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
import { useStyles } from "./DrawerStyle";
import "./Drawer.css";
import { Link } from "react-router-dom";

//To add a link to your page, add a <ListItem>, <ListItemIcon> and <ListItemText>
//under <Drawer><List>


export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
            color="primary"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
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
                <HomeIcon />
              </Link>
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <Link to="/my_batches">
                {/* TODO: Make it a nice icon */}
                <SchoolIcon />
              </Link>
            </ListItemIcon>
            <ListItemText>My Batches</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <Link to="/intervention">
                <ListIcon />
              </Link>
            </ListItemIcon>
            <ListItemText>Make Request</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <Link to="/getinterventions">
                <ViewListIcon />
              </Link>
            </ListItemIcon>
            <ListItemText>Requests</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <Link to="/associates">
                <ViewListIcon />
              </Link>
            </ListItemIcon>
            <ListItemText>Associates</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <a href="/Logout">
                <ViewListIcon />
              </a>
            </ListItemIcon>
            <ListItemText>Log Out</ListItemText>
          </ListItem>

          {/* TODO: Remove this for production */}
          {/* <ListItem></ListItem>
          <ListItem></ListItem>
          <ListItem></ListItem>
          <ListItem></ListItem>
          <ListItem></ListItem>
          <ListItem></ListItem>
          <ListItem></ListItem>
          <ListItem></ListItem>
          <ListItem></ListItem>
          <ListItem></ListItem>
          <ListItem></ListItem>
          <ListItem></ListItem>
          <ListItem></ListItem>
          <ListItem></ListItem>
          <ListItem></ListItem>
          <ListItem></ListItem>
          <ListItem></ListItem>
          <ListItem></ListItem>
          <ListItem></ListItem>
          <ListItem></ListItem>
          <ListItem></ListItem> */}
        </List>
        <Divider />
      </Drawer>
      {/* <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph style={{ textAlign: "left" }}>
          <h2 style={{ textAlign: "left" }}>
            Theresa's group Associates' information
          </h2>
          This area will have information about the different associates in a
          specific batch
        </Typography>
        <Typography paragraph style={{ textAlign: "left" }}>
          <h2 style={{ textAlign: "left" }}>Request Talent</h2>A form requesting
          talent will be here. Followed by the batches progress.
        </Typography>
      </main> */}
    </div>
  );
}
