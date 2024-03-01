import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, db } from "../firebase/firebase";

export const AppStates = createContext();

export const useAppState = () => useContext(AppStates);

export const AppState = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const navigate = useNavigate();
  const [loadings, setLoadings] = useState(true);
  // movies State
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  // form state
  const [form, setForm] = useState({
    title: "",
    year: "",
    description: "",
    id: "",
    rated: 0,
    rating: 0,
  });

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setLoadings(false);
      } else {
        setCurrentUser(null);
        setLoadings(false);
      }
    });
    return unsubcribe;
  }, []);

  const SignUpPage = async (email, password, username) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: username,
      });
      const user = auth.currentUser;
      setCurrentUser({
        ...user,
      });
      toast.success("Successfully signed up.");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("The email provided is already in use.");
      }
    }
  };

  const LoginPage = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Successfully login.");
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        toast.error("User not located.");
      }
    }
  };

  const Logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const isLogedIn = currentUser ? true : false;

  // get Movies form firebase

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const unsubscribe = onSnapshot(collection(db, "movies"), (snapshot) => {
          const snapshotData = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setData(snapshotData);
          setLoading(false);
        });

        return () => unsubscribe();
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  // update movies

  const UpdateMovie = async (id) => {
    try {
      const movieUpdateRef = doc(db, "movies", id);
      await updateDoc(movieUpdateRef, {
        title: form.title,
        year: form.year,
        description: form.description,
        id: form.id,
      });
      navigate("/");
      setForm({
        title: "",
        year: "",
        description: "",
        image: "",
      });
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  // delete movie

  const MovieRemove = async (id) => {
    try {
      setLoading(true);
      const movieRef = doc(db, "movies", id);
      await deleteDoc(movieRef);
      navigate("/");
      setLoading(false);
      toast.success("Movie Deleted!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppStates.Provider
      value={{
        SignUpPage,
        LoginPage,
        isLogedIn,
        Logout,
        currentUser,
        data,
        loading,
        MovieRemove,
        form,
        setForm,
        UpdateMovie,
        show,
        setShow,
      }}
    >
      {!loadings && children}
    </AppStates.Provider>
  );
};

export default AppState;
