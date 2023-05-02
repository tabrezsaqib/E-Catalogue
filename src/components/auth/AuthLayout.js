import { Alert } from "@mui/material";
import Link from "next/link";
import AlertCard from "../AlertCard";
import AlertProvider from "../context/AlertProvider";
import styles from "../../styles/AuthLayout.module.css";

const AuthLayout = ({ type, children, onSubmit }) => {
  return (
    <>
      <AlertCard />
      <main className={styles.loginContainer}>
        <Link className={styles.logo} href="/" data-tab="home">
          <svg width="33" height="27" xmlns="http://www.w3.org/2000/svg">
            <path
              d="m26.463.408 3.2 6.4h-4.8l-3.2-6.4h-3.2l3.2 6.4h-4.8l-3.2-6.4h-3.2l3.2 6.4h-4.8l-3.2-6.4h-1.6a3.186 3.186 0 0 0-3.184 3.2l-.016 19.2a3.2 3.2 0 0 0 3.2 3.2h25.6a3.2 3.2 0 0 0 3.2-3.2V.408h-6.4Z"
              fill="#FC4747"
            />
          </svg>
        </Link>
        <form
          className={`${styles.formContainer} bg-primary-600`}
          onSubmit={onSubmit}
          noValidate
        >
          <h1 className={`${styles.fsHeading} fw-light`}>{type}</h1>
          {children}
        </form>
      </main>
    </>
  );
};

export default AuthLayout;
