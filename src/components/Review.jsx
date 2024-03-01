import { Delete } from "@mui/icons-material";
import {
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-stars";
import { toast } from "react-toastify";
import { useAppState } from "../context/AppState";
import { db, reviewsRef } from "../firebase/firebase";

const Review = ({ id, prevRating, userRated }) => {
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [form, setForm] = useState("");
  const [data, setData] = useState([]);
  const movieAuth = useAppState();
  const navigate = useNavigate();
  const [newAdded, setNewAdded] = useState(0);

  const sendReview = async () => {
    setLoading(true);
    try {
      if (movieAuth.isLogedIn) {
        const currentUserName = movieAuth.currentUser.displayName;

        await addDoc(reviewsRef, {
          movieid: id,
          name: currentUserName,
          rating: rating,
          thought: form,
          timestamp: new Date().getTime(),
        });

        const ref = doc(db, "movies", id);
        await updateDoc(ref, {
          rating: prevRating + rating,
          rated: userRated + 1,
        });

        setRating(0);
        setForm("");
        setNewAdded(newAdded + 1);
        toast.success("Review Sent");
      } else {
        navigate("/");
        toast.info("Please log in first!");
      }
    } catch (error) {
      toast.error(`${error.message}`);
    }
    setLoading(false);
  };

  useEffect(() => {
    const getData = async () => {
      setReviewsLoading(true);
      try {
        let quer = query(reviewsRef, where("movieid", "==", id));
        const querySnapshot = await getDocs(quer);
        const reviewsData = [];
        querySnapshot.forEach((doc) => {
          const review = { ...doc.data(), id: doc.id };
          reviewsData.push(review);
        });
        setData(reviewsData);
        setReviewsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [newAdded, id]);

  const deleteReview = async (reviewId) => {
    try {
      await deleteDoc(doc(reviewsRef, reviewId));
      toast.success("Review Deleted");
      // After deleting, update the reviews data
      const newData = data.filter((item) => item.id !== reviewId);
      setData(newData);
    } catch (error) {
      toast.error("Failed to delete review");
    }
  };

  return (
    <div className="mt-2 border-t-2 border-gray-700 w-full">
      <ReactStars
        value={rating}
        size={30}
        half={true}
        onChange={(rate) => setRating(rate)}
      />
      <input
        type="text"
        placeholder="Share Your thoughts.."
        className="header w-full outline-none p-2"
        value={form}
        onChange={(e) => setForm(e.target.value)}
      />
      <button
        onClick={sendReview}
        className="bg-green-600 w-full p-2 flex justify-center mt-2"
      >
        {loading ? <TailSpin height={20} color="white" /> : "Share"}
      </button>
      {reviewsLoading ? (
        <div className="mt-6 flex justify-center">
          <ThreeDots height={10} color="white" />
        </div>
      ) : (
        <div className="mt-4">
          {data.map((item, i) => (
            <div
              key={i}
              className="p-2 w-full border-b border-gray-600 bg-opacity-50 mt-2"
            >
              <div className="flex items-center">
                <p className="text-blue-500">{item.name}</p>
                <p className="ml-3 text-xs">
                  ({new Date(item.timestamp).toLocaleString()})
                </p>
              </div>
              <ReactStars
                size={15}
                half={true}
                value={item.rating}
                edit={false}
              />
              <div className="flex cursor-pointer">
                <p className="">{item.thought}</p>
                <div className="icons">
                  <button type="button" onClick={() => deleteReview(item.id)}>
                    <Delete />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Review;
