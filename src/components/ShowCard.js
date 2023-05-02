import { useShow } from "./context/ShowProvider";
import styles from "../styles/ShowCard.module.css";
import { CircularProgress } from "@mui/material";
import { useAuth } from "./context/AuthProvider";
import { useAlert } from "./context/AlertProvider";

const ShowCard = ({ show: currentShow, container }) => {
  const { bookmark, onBookmarked, loading } = useShow();
  const { userId } = useAuth();
  const { onOpen } = useAlert();

  let isBookmarked;
  if (bookmark.length !== 0) {
    const [status] = bookmark.filter(
      (item) => item.title === currentShow.title
    );
    isBookmarked = status && status.bookmarkStatus;
  } else {
    isBookmarked = false;
  }

  const resolutionSelector =
    container === "trending" ? (
      <img
        srcSet={`${currentShow.thumbnail.trending.small} 480w, ${currentShow.thumbnail.trending.large} 940w`}
        sizes="(max-width: 600px) 480px, 940px"
        src={currentShow.thumbnail.trending.large}
        alt="thumbnail"
        className={`${styles.thumbnail} ${styles.trendingCard}`}
      />
    ) : (
      <img
        srcSet={`${currentShow.thumbnail.regular.small} 328w, ${currentShow.thumbnail.regular.medium} 440w, ${currentShow.thumbnail.regular.large} 560w`}
        sizes="(max-width: 600px) 328px, (max-width: 800px) 440px, 560px"
        src={currentShow.thumbnail.regular.large}
        alt="thumbnail"
        className={styles.thumbnail}
      />
    );

  const categoryIcon =
    currentShow.category === "Movie" ? (
      <svg
        className={styles.categoryIcon}
        width="12"
        height="12"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10.173 0H1.827A1.827 1.827 0 0 0 0 1.827v8.346C0 11.183.818 12 1.827 12h8.346A1.827 1.827 0 0 0 12 10.173V1.827A1.827 1.827 0 0 0 10.173 0ZM2.4 5.4H1.2V4.2h1.2v1.2ZM1.2 6.6h1.2v1.2H1.2V6.6Zm9.6-1.2H9.6V4.2h1.2v1.2ZM9.6 6.6h1.2v1.2H9.6V6.6Zm1.2-4.956V2.4H9.6V1.2h.756a.444.444 0 0 1 .444.444ZM1.644 1.2H2.4v1.2H1.2v-.756a.444.444 0 0 1 .444-.444ZM1.2 10.356V9.6h1.2v1.2h-.756a.444.444 0 0 1-.444-.444Zm9.6 0a.444.444 0 0 1-.444.444H9.6V9.6h1.2v.756Z" />
      </svg>
    ) : (
      <svg
        className={styles.categoryIcon}
        viewBox="0 0 20 20"
        width="15"
        height="15"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20 4.481H9.08l2.7-3.278L10.22 0 7 3.909 3.78.029 2.22 1.203l2.7 3.278H0V20h20V4.481Zm-8 13.58H2V6.42h10v11.64Zm5-3.88h-2v-1.94h2v1.94Zm0-3.88h-2V8.36h2v1.94Z" />
      </svg>
    );

  const bookmarkIcon = !isBookmarked ? (
    <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z"
        strokeWidth="1.5"
        fill="none"
        stroke="#FFFF"
        className={styles.bookmarkIcon}
      />
    </svg>
  ) : (
    <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.61 0c.14 0 .273.028.4.083a1.03 1.03 0 0 1 .657.953v11.928a1.03 1.03 0 0 1-.656.953c-.116.05-.25.074-.402.074-.291 0-.543-.099-.756-.296L5.833 9.77l-4.02 3.924c-.218.203-.47.305-.756.305a.995.995 0 0 1-.4-.083A1.03 1.03 0 0 1 0 12.964V1.036A1.03 1.03 0 0 1 .656.083.995.995 0 0 1 1.057 0h9.552Z"
        fill="#fff"
      />
    </svg>
  );

  function handleBookmark() {
    if (!userId) {
      onOpen("warning", "Sign-up or login to bookmark");
    } else {
      onBookmarked(currentShow.title);
    }
  }

  return loading ? (
    <div style={{ display: "grid", placeContent: "center" }}>
      <CircularProgress
        sx={{
          color: "red",
        }}
      />
    </div>
  ) : (
    <article
      className={`${styles.showCard} ${
        container === "trending" && styles.trendingCard
      }`}
    >
      <button className={styles.bookmarkButton} onClick={handleBookmark}>
        {bookmarkIcon}
      </button>
      <div
        className={`${styles.thumbnailContainer} ${
          container === "trending" && styles.trendingCard
        }`}
      >
        {resolutionSelector}
        <button className={styles.playButton}>
          <div className={styles.textWrapper}>
            <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15 0C6.713 0 0 6.713 0 15c0 8.288 6.713 15 15 15 8.288 0 15-6.712 15-15 0-8.287-6.712-15-15-15Zm-3 21V8l9 6.5-9 6.5Z"
                fill="#FFF"
              />
            </svg>
            Play
          </div>
        </button>
      </div>
      <div
        className={`${styles.infoContainer} ${
          container === "trending" && styles.trendingCard
        } `}
      >
        <p
          className={`${
            container === "trending" ? "fs-m-body" : "fs-s-body"
          } fw-light`}
        >
          {currentShow.year}{" "}
          <span className={styles.inlineSpan}>
            •{categoryIcon}
            {currentShow.category}
          </span>
          <span className={styles.inlineSpan}>• {currentShow.rating}</span>
        </p>
        <h2
          className={`${
            container === "trending"
              ? "fs-s-secondary-heading"
              : "fs-xs-secondary-heading"
          } fw-regular`}
        >
          {currentShow.title}
        </h2>
      </div>
    </article>
  );
};

export default ShowCard;
