import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppState } from "../context/AppState";

const Header = () => {


  // ********************************************** //
  // this header not relatade this app 
  // ********************************************** //

  const movieAuth = useAppState();
  console.log(movieAuth.currentUser.displayName);

  return (
    <>
      <div className="sticky top-0 z-10 header flex justify-between items-center text-3xl text-red-500 font-bold p-3 border-b-2 border-gray-500">
        <Link to="/">
          <span>
            Filmy
            <span className="text-white">Verse</span>
          </span>
        </Link>
        {movieAuth.isLogedIn ? (
          <>
            <Link to="/addmovie">
              <h1 className="text-lg flex items-center cursor-pointer">
                <Button className="text-white">
                  <Add className="mr-1" color="secondary" />{" "}
                  <span className="text-white">Add New</span>
                </Button>
              </h1>
            </Link>

            <Link to="/listofmovie" className="text-white text-xl">
              <Button variant="contained">List of Movie</Button>
            </Link>
            {/* <div className="">
              <Button onClick={handleLogout} variant="contained">
                LogOut
              </Button>
            </div>
            <p>{movieAuth.currentUser.displayName}</p> */}
          </>
        ) : (
          <Link to="/login" className="text-lg bg-green-500 cursor-pointer">
            <Button>
              <span className="text-white font-medium capitalize">Login</span>
            </Button>
          </Link>
        )}
      </div>
    </>
  );
};

export default Header;
