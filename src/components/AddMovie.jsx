import { addDoc, serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppState } from "../context/AppState";
import { moviesRef } from "../firebase/firebase";
// import { moviesRef } from "...";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const storage = getStorage();

const AddMovie = () => {
  const { form, setForm, UpdateMovie, show, setShow, currentUser } =
    useAppState();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("");

  const [progress, setProgress] = useState(null);
  const navigate = useNavigate();
  const movieAuth = useAppState();

  //   AddMove

  const addMove = async () => {
    setForm({
      title: "",
      year: "",
      description: "",
      file,
    });
    setShow(false);
    try {
      if (!form.title || !form.year || !form.description) {
        toast.info("Please fill in all mandatory fields!");
        return;
      }
      setLoading(true);
      await addDoc(moviesRef, {
        ...form,
        author: currentUser.displayName,
        userId: currentUser.uid,
        timestamp: serverTimestamp(),
      });
      navigate("/");
      toast.success("Successfully Added");
    } catch (error) {
      toast.error(`${error.message}`);
      setLoading(false);
    }
  };

  const UpdateDocument = async () => {
    setLoading(true);
    try {
      await UpdateMovie(form.id);
      setShow(true);
      toast.success("Movie Updated");
    } catch (error) {
      console.error("Error updating movie:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (movieAuth.isLogedIn) {
      // navigate("/");
    } else {
      navigate("/");
    }
  }, [navigate, movieAuth]);

  // storage

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            toast.info("Image upload to firebase successfully");
            setForm((prev) => ({ ...prev, imgUrl: downloadUrl }));
          });
        }
      );
    };

    file && uploadFile();
  }, [setForm, file]);

  return (
    <div>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-8 mb-4">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-xl font-medium title-font mb-4 text-white">
              {show ? "Update Movie" : "Add Movie"}
            </h1>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="leading-7 text-sm text-gray-300"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    className="w-full rounded border border-gray-300 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-300"
                  >
                    Year
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                    className="w-full rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="leading-7 text-sm text-gray-300"
                  >
                    Description
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    className="w-full rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    defaultValue={""}
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-300"
                  >
                    Image
                  </label>
                  <input
                    type="file"
                    id="email"
                    name="email"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="w-full rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                {!show ? (
                  <button
                    className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg"
                    onClick={addMove}
                    disabled={progress !== null && progress < 100}
                  >
                    {loading ? (
                      <TailSpin height={25} color="white" />
                    ) : (
                      "Submit"
                    )}
                  </button>
                ) : (
                  <button
                    className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg"
                    onClick={() => UpdateDocument()}
                  >
                    {loading ? (
                      <TailSpin height={25} color="white" />
                    ) : (
                      "Update"
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddMovie;
