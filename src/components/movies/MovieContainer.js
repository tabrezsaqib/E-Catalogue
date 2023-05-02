import { useShow } from "../../components/context/ShowProvider";
import ShowCard from "../../components/ShowCard";
import uuid from "react-uuid";

const MovieContainer = () => {
  const { data } = useShow();
  const movieCollection = data.filter((item) => item.category === "Movie");

  return (
    <div className="showListContainer">
      <div class="sectionWrapper">
        <h1 className="padding-inline fs-l-primary-heading fw-light">Movies</h1>
        <div className="showCardContainer | padding-inline padding-block-top padding-block-bottom">
          {movieCollection.map((item) => (
            <ShowCard show={item} key={uuid()} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieContainer;
