import { createContext, useContext, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { getFirestore, doc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuth } from "./AuthProvider";
import { updateUser } from "../../lib/db";

const ShowContext = createContext();

export default function ShowProvider({ children, data }) {
  const { userId } = useAuth();
  const [docData, loading, error] = useDocument(
    doc(db, "users", userId ? userId : "No user")
  );
  const bookmarkData =
    docData && docData.exists() ? docData.data().bookmark : [];
  const bookmarked = bookmarkData.filter((item) => item.bookmarkStatus);

  function handleBookmark(title) {
    if (userId && docData && docData.exists()) {
      const exist =
        bookmarkData.length !== 0
          ? bookmarkData.filter((item) => item.title === title)
          : [];

      if (exist.length === 0) {
        const [showItem] = data
          .filter((item) => item.title === title)
          .map((item) => {
            return { title: item.title, bookmarkStatus: true };
          });
        const showData = {
          bookmark: arrayUnion(showItem),
        };
        updateUser(userId, showData);
      } else {
        const [showItemOld] = exist;
        const [showItem] = exist.map((item) => {
          return {
            ...item,
            bookmarkStatus: !item.bookmarkStatus,
          };
        });
        const showData = {
          bookmark: arrayUnion(showItem),
        };
        updateUser(userId, showData);
        updateUser(userId, {
          bookmark: arrayRemove(showItemOld),
        });
      }
    }
  }

  return (
    <ShowContext.Provider
      value={{
        bookmark: bookmarked,
        onBookmarked: handleBookmark,
        data: data,
        loading,
        docData: bookmarkData,
      }}
    >
      {children}
    </ShowContext.Provider>
  );
}

export const useShow = () => useContext(ShowContext);
