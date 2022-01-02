import React, { useState, useEffect, useRef, useContext } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SearchIcon from "@mui/icons-material/Search";
import UsersTable from "./usersTable";
import { UsersContext } from "../../context/usersContext";
import MenuItem from "@mui/material/MenuItem";


export default function UsersSearch(props) {
  const usersContext =
    useContext(UsersContext);

  const [allRowsForShowing, setAllRowsForShowing] = useState(props.usersList);
  const [searchTextFirstName, setSearchTextFirstName] = useState("");
  const [searchTextEmail, setSearchTextEmail] = useState("");
  const [searchTextLastName, setSearchTextLastName] = useState("");
console.log(props.usersList);
  const childRef = useRef();

  const handleSearchButton = () => {
    var filteredRows = usersContext.allUserslist;

    filteredRows = filteredRows.filter((row) => {
      return row.email.toLowerCase().includes(searchTextEmail.toLowerCase());
    });

    filteredRows = filteredRows.filter((row) => {
      return row.lastName
        .toLowerCase()
        .includes(searchTextLastName.toLowerCase());
    });

    filteredRows = filteredRows.filter((row) => {
      return row.firstName
        .toLowerCase()
        .includes(searchTextFirstName.toLowerCase());
    });

    console.log(filteredRows);
    setAllRowsForShowing(filteredRows);
    childRef.current.setToFirstPage();
  };

  const handleClearButton = () => {
    setSearchTextFirstName("");
    setSearchTextLastName("");
    setSearchTextEmail("");
    setAllRowsForShowing(usersContext.allUserslist);
    childRef.current.setToFirstPage();
  };

  const handleChangeFirstName = (text) => {
    setSearchTextFirstName(text);
  };

  const handleChangeLastName = (text) => {
    setSearchTextLastName(text);
  };

  const handleChangeId = (text) => {
    setSearchTextEmail(text);
  };

  useEffect(() => {
    usersContext.setAllUsersList(usersContext.allUserslist);
    setAllRowsForShowing(usersContext.allUserslist);
  }, [usersContext.allUserslist]);

  return (
    <>
      <Container sx={{ overflow: "hidden", width: "95%" }}>
        <h2>Search:</h2>
        <Grid container spacing={2}>
          
          <Grid item xs={4}>
            <TextField
              fullWidth
              value={searchTextFirstName}
              onChange={(event) => {
                handleChangeFirstName(event.target.value);
              }}
              label="Firstname"
              variant="outlined"
              autoComplete="disabled"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              value={searchTextLastName}
              onChange={(event) => {
                handleChangeLastName(event.target.value);
              }}
              label="Lastname"
              variant="outlined"
              autoComplete="disabled"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              value={searchTextEmail}
              onChange={(event) => {
                handleChangeId(event.target.value);
              }}
              label="Email"
              variant="outlined"
              autoComplete="disabled"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} justifyContent="flex-end" sx ={{marginTop: 1}}>
          <Grid alignItems={'right'} item xs={3}>
            <Button
              sx={{
                height: "100%",
              }}
              fullWidth
              autoComplete="disabled"
              variant="contained"
              size="large"
              startIcon={<SearchIcon />}
              onClick={() => {
                handleSearchButton();
              }}
            >
              Search
            </Button>
          </Grid>

          <Grid item xs={3}>
            <Button
              sx={{
                height: "100%",
              }}
              variant="contained"
              size="large"
              fullWidth
              startIcon={<DeleteOutlineIcon />}
              onClick={() => {
                handleClearButton();
              }}
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </Container>

      <UsersTable
        ref={childRef}
        allRows={usersContext.allUserslist}
        allRowsForShowing={allRowsForShowing}
        handleShowUserInfo={props.handleChange}
        isLoading={props.isLoading}
      />
    </>
  );
}
