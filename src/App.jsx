import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddMovie from "./components/AddMovie";
import Cards from "./components/Cards";
import Detail from "./components/Detail";
import ListOfMovie from "./components/LIstOfMovie";
import Login from "./components/Login";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import SignUp from "./components/SignUp";

const App = () => {
  return (
    <div className="App relative ">
      {/* <Header /> */}
      <ResponsiveAppBar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/addmovie" element={<AddMovie />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/listofmovie" element={<ListOfMovie />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default App;
