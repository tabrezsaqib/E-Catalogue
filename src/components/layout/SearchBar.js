import { useRouter } from "next/router";
import styles from "../../styles/SearchBar.module.css";

const SearchBar = ({ searchValue, onChange, onBack }) => {
  const router = useRouter();
  let searchPlaceholder;

  switch (router.pathname) {
    case "/":
      searchPlaceholder = "movies or TV series";
      break;
    case "/movies":
      searchPlaceholder = "movies";
      break;
    case "/tv-series":
      searchPlaceholder = "TV series";
      break;
    case "/bookmarks":
      searchPlaceholder = "bookmarked shows";
      break;
    default:
      searchPlaceholder = "movies or TV series";
  }

  return (
    <section className={`${styles.searchContainer} | padding-inline `}>
      {searchValue !== "" && (
        <button onClick={onBack} className="bg-primary-900">
          <svg
            width="32"
            height="32"
            xmlns="http://www.w3.org/2000/svg"
            enable-background="new 0 0 24 24"
            viewBox="0 0 24 24"
          >
            <path
              fill="#FFFFFF"
              d="M8.5,12.8l5.7,5.6c0.4,0.4,1,0.4,1.4,0c0,0,0,0,0,0c0.4-0.4,0.4-1,0-1.4l-4.9-5l4.9-5c0.4-0.4,0.4-1,0-1.4c-0.2-0.2-0.4-0.3-0.7-0.3c-0.3,0-0.5,0.1-0.7,0.3l-5.7,5.6C8.1,11.7,8.1,12.3,8.5,12.8C8.5,12.7,8.5,12.7,8.5,12.8z"
            />
          </svg>
        </button>
      )}

      <label htmlFor="search" className={styles.searchIcon}>
        <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M27.613 25.72 23.08 21.2a10.56 10.56 0 0 0 2.253-6.533C25.333 8.776 20.558 4 14.667 4S4 8.776 4 14.667c0 5.89 4.776 10.666 10.667 10.666A10.56 10.56 0 0 0 21.2 23.08l4.52 4.533a1.333 1.333 0 0 0 1.893 0 1.333 1.333 0 0 0 0-1.893ZM6.667 14.667a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z"
            fill="#FFF"
          />
        </svg>
      </label>
      <input
        id="search"
        value={searchValue}
        onChange={onChange}
        placeholder={`Search for ${searchPlaceholder}`}
        className={`${styles.searchBar} | bg-primary-900 text-neutral-100 fs-m-primary-heading fw-light`}
      />
    </section>
  );
};

export default SearchBar;
