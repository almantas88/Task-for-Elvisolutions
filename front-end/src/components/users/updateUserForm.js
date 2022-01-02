import React, { useState, useContext, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { MessageContext } from "../../context/messageContext";
import { getOneUser, updateOneUser } from "../../services/userServices";
import CircularProgress from "@mui/material/CircularProgress";
import { UsersContext } from "../../context/usersContext";


export default function UpdateUserForm(props) {

  const usersContext =
    useContext(UsersContext);
  const [message, severity, showMessageBox, handleMessageShow, closeError] =
    useContext(MessageContext);

  const [isLoading, setIsLoading] = useState(false);

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    _id: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const fetchUser = async (ID) => {
    try {
      const { data } = await getOneUser({ID});
      setValues({
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        email: data.user.email,
        _id: ID
      });
    } catch (error) {
      handleMessageShow(error.response.data.msg, "error");
    }
  };

  useEffect(() => {

    setIsLoading(true);
    try {
      fetchUser(props.userInfo._id);
    } catch (error) {
      handleMessageShow(error.response.data.msg, "error");
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = async () => {
    try {
      const { data } = await updateOneUser(values);  
      usersContext.handleUpdateUserContext(props.userInfo._id, values);
      handleMessageShow("User was edited!", "success");
    } catch (error) {
      handleMessageShow(error.response.data.msg, "error");
    }
  };

  return (
    <div className="addUserContainer">
      <Container
        sx={{
          width: 500,
          height: 350,
          marginTop: "120px",
          backgroundColor: "#F5F5F5",
          borderRadius: "1%",
        }}
      >
        {isLoading ? (
          <CircularProgress sx={{ display: "flex", margin: "auto", padding: 15 }} />
        ) : (
          <Grid container spacing={2} justify="center">
            <Grid item xs={10}>
              <h2>Edit user</h2>
            </Grid>
            <Grid item xs={2} onClick={props.handleChange}>
              <CloseIcon sx={{ fontSize: 40, color: "#252525", padding: 1 }} />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="firstName"
                value={values.firstName}
                onChange={handleInputChange}
                fullWidth
                required
                autoComplete="disabled"
                label="Firstname"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="lastName"
                value={values.lastName}
                onChange={handleInputChange}
                fullWidth
                required
                autoComplete="disabled"
                label="LastName"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                value={values.email}
                onChange={handleInputChange}
                fullWidth
                required
                autoComplete="disabled"
                label="Email"
                variant="outlined"
              />
            </Grid>
            
            <Grid align="center" item xs={12}>
              <Button
                onClick={handleSubmit}
                size="large"
                variant="contained"
                sx={{ padding: 1, width: "50%", margin: "20px 0" }}
              >
                Redaguoti
              </Button>
            </Grid>
          </Grid>
        )}
      </Container>
    </div>
  );
}
