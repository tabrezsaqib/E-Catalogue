import { useShow } from "../../components/context/ShowProvider";
import ShowCard from "../../components/ShowCard";
import uuid from "react-uuid";
import { CircularProgress } from "@mui/material";

const Bookmark = ({ category }) => {
  const { bookmark, data, loading } = useShow();

  const bookmarkedCollection = data.filter((item) =>
    bookmark.some((item2) => item.title === item2.title)
  );

  const bookmarked = bookmarkedCollection.filter(
    (item) => item.category === category
  );

  return (
    <article>
      <h1 className="padding-inline fs-l-primary-heading fw-light">
        Bookmarked {category === "Movie" ? "Movies" : "TV Series"}
      </h1>
      {bookmarked.length > 0 ? (
        loading ? (
          <div style={{ display: "grid", placeContent: "center" }}>
            <CircularProgress
              sx={{
                color: "red",
              }}
            />
          </div>
        ) : (
          <div
            className={`showCardContainer ${
              bookmarked.length <= 3 && "alignCard"
            } | padding-inline padding-block-top padding-block-bottom`}
          >
            {bookmarked.map((item) => (
              <ShowCard show={item} key={uuid()} />
            ))}
          </div>
        )
      ) : (
        <p
          className="fs-m-primary-heading fw-light"
          style={{
            display: "grid",
            placeContent: "center",
            placeItems: "center",
            gridAutoRows: "15vh",
          }}
        >
          No bookmarked {category === "Movie" ? "Movies" : "TV series"}
        </p>
      )}
    </article>
  );
};

export default Bookmark;
