import { Cancel, Delete, Edit } from "@mui/icons-material";
import { FallingLines } from "react-loader-spinner";
import { Link } from "react-router-dom";
import ReactStars from "react-stars";
import { useAppState } from "../context/AppState";

const ListOfMovie = () => {
  const { data, loading, MovieRemove, setForm, setShow, currentUser } =
    useAppState();
  const userId = currentUser?.uid;

  const movieDelete = (movieId) => {
    MovieRemove(movieId);
  };

  const handleEdit = (title, image, year, description, id) => {
    setForm({
      title: title,
      year: year,
      image: image,
      description: description,
      id: id,
    });
    setShow(true);
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-[100vh]">
          <FallingLines height={35} color="#4fa94d" />
        </div>
      ) : (
        <div className="flex flex-wrap justify-center md:justify-start">
          {data.map((item) => (
            <div key={item.id}>
              {userId && item.userId === currentUser.uid && (
                <div className="text-center mt-3">
                  <Cancel
                    className="cursor-pointer mr-2"
                    onClick={() => movieDelete(item.id)}
                  />
                </div>
              )}
              <div className=" m-4">
                <img className="mr-4 blogs-img" src={item.imgUrl} alt="" />
                <div className="wrapper">
                  <div className="content">
                    <p className="font-bold text-gray-500">
                      Name: <span className="text-white">{item.title}</span>
                    </p>
                    <p className="flex items-center font-bold text-gray-500">
                      <span className="mr-1">Rating:</span>
                      <ReactStars
                        size={20}
                        half={true}
                        count={5}
                        value={item.rating}
                        edit={false}
                      />
                    </p>
                    <p className="font-bold text-gray-500">
                      Year: <span className="text-white">{item.year}</span>
                    </p>
                    <span className="meta-info">
                      <p className="author font-medium">
                        {item.author} - {item.timestamp.toDate().toDateString()}
                      </p>
                    </span>
                  </div>
                  <div className="main-icons flex gap-2 mt-2 justify-between items-center">
                    {userId && item.userId === currentUser.uid && (
                      <>
                        <div className="icons cursor-pointer">
                          <Delete onClick={() => movieDelete(item.id)} />
                        </div>
                        <div className="icons cursor-pointer">
                          <Link to="/addmovie">
                            <Edit
                              onClick={() =>
                                handleEdit(
                                  item.title,
                                  item.image,
                                  item.year,
                                  item.description,
                                  item.id
                                )
                              }
                            />
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ListOfMovie;
