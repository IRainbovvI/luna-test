import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, Outlet } from "react-router-dom";
import { Container } from "@mui/material";

const Home = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Link
            to="/"
            style={{ textDecoration: "none", color: "white", flexGrow: 1 }}
          >
            <Typography variant="h6" component="div">
              Luna Test
            </Typography>
          </Link>
          <Button
            component={Link}
            to="/"
            color="inherit"
            style={{ textTransform: "none" }}
          >
            Home
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Outlet />
      </Container>
    </div>
  );
};

export default Home;
