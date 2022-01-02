import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import ListIcon from "@mui/icons-material/List";
import { Link, useNavigate } from "react-router-dom";

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    left: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Link className="link" to="/">
          <ListItem button key={"Users"} >
            <ListItemIcon>
              <PeopleAltIcon />
            </ListItemIcon>
            <ListItemText primary={"Users"} />
          </ListItem>
        </Link>

        <Link className="link" to="/about">
          <ListItem button key={"About"} >
            <ListItemIcon>
              <MenuBookIcon />
            </ListItemIcon>
            <ListItemText primary={"About"} />
          </ListItem>
        </Link>

      </List>
     
    </Box>
  );

  return (
    <div className="header">
      <React.Fragment key={"left"}>
        <Button id="menu-btn" onClick={toggleDrawer("left", true)}>
          <ListIcon className="menu-icon" /> Menu
        </Button>
        <Drawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    
    </div>
  );
}
