import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppState } from "../context/AppState";

const SignUp = () => {
  const movieAuth = useAppState();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const CreateSignUp = async () => {
    setLoading(true);
    try {
      if (!form.name || !form.email || !form.password) {
        toast.error("Please fill in all fields.");
        setLoading(false);
        return;
      }
      if (form.password.length < 6) {
        toast.error("Password must be at least 6 characters long.");
        setLoading(false);
        return;
      }
      await movieAuth.SignUpPage(form.email, form.password, form.name);
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
    <div className="w-full flex flex-col items-center mt-8">
      <h1 className="text-xl font-bold">Sign up</h1>

      <>
        <div className="p-2  w-full md:w-1/3">
          <div className="relative">
            <label htmlFor="email" className="leading-7 text-sm text-gray-300">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>

        <div className="p-2  w-full md:w-1/3">
          <div className="relative">
            <label htmlFor="email" className="leading-7 text-sm text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.mobile}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>

        <div className="p-2  w-full md:w-1/3">
          <div className="relative">
            <label
              htmlFor="message"
              className="leading-7 text-sm text-gray-300"
            >
              Password
            </label>
            <input
              type={"password"}
              id="password"
              name="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>

        <div className="p-2 w-1/3">
          <button
            onClick={CreateSignUp}
            className="flex mx-auto text-white  bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg"
          >
            {loading ? <TailSpin height={25} color="white" /> : "Signup"}
          </button>
        </div>
      </>
      <div className="">
        <p>
          Already have an account?{" "}
          <Link to="/login">
            <span className="text-blue-500 cursor-pointer font-bold">
              Login
            </span>
          </Link>
        </p>
      </div>
      <div className="mt-2" id="recaptcha"></div>
    </div>
  );
};

export default SignUp;
