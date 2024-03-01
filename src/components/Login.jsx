import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppState } from "../context/AppState";

const Login = () => {
  const movieAuth = useAppState();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const loginMovie = async () => {
    setLoading(true);
    try {
      if (!form.email || !form.password) {
        toast.error("Please fill in all fields.");
        setLoading(false);
        return;
      }
      if (form.password.length < 6) {
        toast.error("Password must be at least 6 characters long.");
        setLoading(false);
        return;
      }
      await movieAuth.LoginPage(form.email, form.password);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (movieAuth.isLogedIn) {
      navigate("/");
    }
  }, [navigate, movieAuth]);

  return (
    <div className="w-full flex flex-col mt-8 items-center">
      <h1 className="text-xl font-bold">Login</h1>
      <div className="p-2 w-full md:w-1/3">
        <div className="relative">
          <label htmlFor="email" className="leading-7 text-sm text-gray-300">
            Email
          </label>
          <input
            type={"email"}
            id="email"
            name="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div className="p-2 w-full md:w-1/3">
        <div className="relative">
          <label htmlFor="password" className="leading-7 text-sm text-gray-300">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div className="p-2 w-full">
        <button
          onClick={loginMovie}
          className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg"
        >
          {loading ? <TailSpin height={25} color="white" /> : "Login"}
        </button>
      </div>
      <div>
        <p>
          Do not have account?{" "}
          <Link to={"/signup"}>
            <span className="text-blue-500">Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
