import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../context/AuthProvider";
import styles from "../../styles/UserProfile.module.css";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase";
import { useAlert } from "../context/AlertProvider";

const UserProfile = ({ showAccount, setShowAccount }) => {
  const { userId } = useAuth();
  const { onOpen } = useAlert();
  const [signOut, loading, error] = useSignOut(auth);

  async function handleLogout() {
    const success = await signOut();
    if (success) {
      onOpen("success", "Logout successful!");
    } else {
      onOpen("error", "Logout failed!");
    }
    setShowAccount();
  }

  const imgSrc = userId ? "/assets/image-avatar.png" : "/assets/no-profile.png";

  return (
    <div className={styles.profileContainer}>
      <Image
        src={imgSrc}
        className={styles.photo}
        width={25}
        height={25}
        alt="profile-picture"
        onClick={setShowAccount}
      />
      {showAccount &&
        (userId ? (
          <div className={`${styles.accountContainer} ${styles.logout}`}>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className={styles.accountContainer}>
            <Link href="/sign-up">Sign-up</Link>
            <Link href="/login">Login</Link>{" "}
          </div>
        ))}
    </div>
  );
};

export default UserProfile;
