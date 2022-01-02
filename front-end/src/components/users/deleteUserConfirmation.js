import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { deleteUser } from "../../services/userServices";
import { MessageContext } from "../../context/messageContext";
import { UsersContext } from "../../context/usersContext";

export default function DeleteUser(props) {
  const usersContext =
    useContext(UsersContext);

    const [message, severity, showMessageBox, handleMessageShow, closeError] =
    useContext(MessageContext);

  const handleDeleteUser = async () => {
    try {
      console.log(props.userInfo);
      const userID = props.userInfo._id;
      console.log({userID});
      const { data } = await deleteUser({userID});
      usersContext.handleDeleteUserContext(userID);
      handleMessageShow("User was deleted!", "success");
      props.closeConfirmation();
    } catch (error) {
      console.log(error.response.data);
      handleMessageShow(error.response.data.msg, "error");
    }
  };

  return (
    <div className="addUserContainer">
      <Container
        className="addUserForm"
        sx={{
          width: 500,
          height: 320,
          marginTop: "120px",
          backgroundColor: "#F5F5F5",
          borderRadius: "1%",
        }}
      >
        <Grid container spacing={3} justify="center">
          <Grid item xs={12}>
            <h2 className="centerHeader">
              Are you sure you want to delete this user?
            </h2>
          </Grid>
          <Grid item xs={12}>
            <h2 className="centerHeader">
              {props.userInfo.firstName} {props.userInfo.lastName}
            </h2>
            <h3 className="centerHeader">
              {props.userInfo.email}
            </h3>
          </Grid>
          <Grid align="right" item xs={6}>
            <Button
              size="large"
              color="error"
              variant="contained"
              onClick={handleDeleteUser}
            >
              Delete
            </Button>
          </Grid>
          <Grid align="left" item xs={6}>
            <Button
              size="large"
              variant="contained"
              onClick={props.handleChange}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
