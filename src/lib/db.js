import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function createUser(uid, data) {
  try {
    await setDoc(doc(db, "users", uid), data);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function updateUser(uid, data) {
  try {
    const bookmarkRef = doc(db, "users", uid);
    await updateDoc(bookmarkRef, data);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}

export const formatUser = (user) => {
  return {
    email: user.email,
    provider: user.providerId,
    bookmark: [],
  };
};
