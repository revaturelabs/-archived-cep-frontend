import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Link to="/batch">
            <Button variant="contained" color="primary">
              Batches
            </Button>
          </Link>
          <Link to="/intervention">
            <Button variant="contained" color="primary">
              Request Talent
            </Button>
          </Link>
          <Link to="/batchDetails">
            <Button variant="contained" color="primary">
              Batch Progress
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </>
  );
}
