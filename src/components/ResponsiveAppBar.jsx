import { Add } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppState } from "../context/AppState";

function ResponsiveAppBar() {
  const movieAuth = useAppState();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      sx={{ backgroundColor: "#15161a" }}
      position="sticky"
      className="top-0 z-10 bg-red-400  border-b-2 border-gray-500 "
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
          className="container max-auto"
        >
          <Link to="/">
            <Typography
              // variant="h6"
              noWrap
              // component="a"
              // href="#app-bar-with-responsive-menu"
            >
              <span className="text-3xl text-red-500 font-bold p-3">
                Filmy
                <span className="text-white">Verse</span>
              </span>
            </Typography>
          </Link>
          {movieAuth.isLogedIn ? (
            <>
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link to="/listofmovie">
                      <Typography textAlign="center">Movies</Typography>
                    </Link>
                  </MenuItem>
                </Menu>
              </Box>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <Link to="/listofmovie">
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    Movies
                  </Button>
                </Link>
              </Box>
              <Link to="/addmovie">
                <h1 className="text-lg flex items-center cursor-pointer">
                  <Button className="text-white">
                    <Add className="mr-1" color="secondary" />
                    <span className="text-white">Add New</span>
                  </Button>
                </h1>
              </Link>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      sx={{ height: "35px", width: "35px" }}
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <Typography variant="body2">
                        {movieAuth.currentUser.displayName}
                      </Typography>
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <h3 onClick={() => movieAuth.Logout()}>LogOut</h3>
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </>
          ) : (
            <Link to="/login" className="text-lg bg-green-500 cursor-pointer">
              <Button>
                <span className="text-white font-medium capitalize">Login</span>
              </Button>
            </Link>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
