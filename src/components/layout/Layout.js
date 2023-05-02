import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import SearchResults from "./SearchResults";
import SearchBar from "./SearchBar";
import styles from "../../styles/Layout.module.css";
import AlertProvider from "../context/AlertProvider";
import AlertCard from "../AlertCard";
import ShowProvider from "../context/ShowProvider";
// import data from "../../../data.json";

const Layout = ({ children }) => {
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);

  useEffect(
    () => {
        fetch("http://localhost:3001/products")
        .then((resp) => {
                        return resp.json();
                      })
                      .then((det) => {
                        setData(det);
                        // checkDuplicates();
                        // dispatch({ type: "USERDETAILS", value: data });
                      });
    },[]
  )

  return (
    <AlertProvider>
      <ShowProvider data={data}>
        <main className={styles.layoutContainer}>
          <AlertCard />
          <NavBar />
          <SearchBar
            searchValue={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onBack={() => setSearchValue("")}
          />
          {searchValue === "" ? (
            children
          ) : (
            <SearchResults searchValue={searchValue} />
          )}
        </main>
      </ShowProvider>
    </AlertProvider>
  );
};

export default Layout;
