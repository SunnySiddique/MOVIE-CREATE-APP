import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";
import ReactStars from "react-stars";
import { useAppState } from "../context/AppState";

const Cards = () => {
  const { data, loading } = useAppState();

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center h-screen">
        <ThreeDots height={40} color="white" />
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 px-3 mt-2">
      {data.map((e) => (
        <>
          <Link to={`/detail/${e.id}`}>
            <div
              key={e.id}
              className="card font-medium shadow-lg  hover:-translate-y-3 cursor-pointer mt-6 transition-all duration-500"
            >
              <img className="blogs-img" src={e.imgUrl} />
              <div className="mt-4 ml-2 mb-2">
                <h1 className="text-gray-500">
                  Name: <span className="text-white">{e.title}</span>
                </h1>
                <h1 className="flex items-center">
                  <span className="text-gray-500 mr-1">Rating:</span>
                  <ReactStars
                    size={20}
                    half={true}
                    value={e.rating / e.rated}
                    edit={false}
                  />
                </h1>
                <h1>
                  <span className="text-gray-500">Year:</span>{" "}
                  <span className="text-white">{e.year}</span>
                </h1>
              </div>
            </div>
          </Link>
        </>
      ))}
    </div>
  );
};

export default Cards;
