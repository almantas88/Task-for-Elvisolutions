import React, { useState, useContext } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createNewUser } from "../../services/userServices";
import { MessageContext } from "../../context/messageContext";

export default function AddUserForm(props) {
  const [message, severity, showMessageBox, handleMessageShow, closeError] =
    useContext(MessageContext);

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const { data } = await createNewUser(values);
      handleMessageShow("A user was created!", "success");
      console.log(data);
      props.setUsersList([
        {
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
        },
        ...props.usersList,
      ]);
    } catch (error) {
      console.log(error.response.data);
      handleMessageShow(error.response.data.msg, "error");
    }
  };

  return (
    <div className="addUserContainer">
      <Container
        sx={{
          width: 500,
          height: 350,
          marginTop: "110px",
          backgroundColor: "#F5F5F5",
          borderRadius: "1%",
        }}
      >
        <Grid container spacing={2} justify="center">
          <Grid item xs={10}>
            <h2>Add a user</h2>
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
              label="FirstName"
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
              Add
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
