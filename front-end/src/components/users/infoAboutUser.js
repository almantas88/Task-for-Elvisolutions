import * as React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function InfoUser(props) {
  return (
    <div className="addUserContainer">
      <Container
        className="addUserForm"
        sx={{
          marginTop: 10,
          width: 500,
          height: 300,
          backgroundColor: "#F5F5F5",
          borderRadius: 2
        }}
      >
        <Grid
          container
          spacing={2}
          justify="center"
        >
          <Grid item xs={10}>
            <h2>Info about a user</h2>
          </Grid>
          <Grid item xs={2} onClick={props.handleChange}>
            <CloseIcon sx={{ fontSize: 40, color: "#252525", padding: 1 }} />
          </Grid>
          <Grid item xs={12}>
            <h3>Email: {props.userInfo.email}</h3>
            <h3>{props.userInfo.firstName} {props.userInfo.lastName}</h3>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
