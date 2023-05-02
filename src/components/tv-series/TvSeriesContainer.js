import { useShow } from "../../components/context/ShowProvider";
import ShowCard from "../../components/ShowCard";
import uuid from "react-uuid";

const TvSeriesContainer = () => {
  const { data } = useShow();
  const seriesCollection = data.filter((item) => item.category === "TV Series");

  return (
    <div className="showListContainer">
      <div class="sectionWrapper">
        <h1 className="padding-inline fs-l-primary-heading fw-light">
          TV Series
        </h1>
        <div className="showCardContainer | padding-inline padding-block-top padding-block-bottom">
          {seriesCollection.map((item) => (
            <ShowCard show={item} key={uuid()} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TvSeriesContainer;
