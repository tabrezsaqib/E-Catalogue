import AuthLayout from "../../components/auth/AuthLayout";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../../styles/FormField.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase";
import { useAlert } from "../../components/context/AlertProvider";
import { CircularProgress } from "@mui/material";

const errorCode = {
  notFound: "auth/user-not-found",
  wrongPassword: "auth/wrong-password",
};

const AuthLogin = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const { onOpen } = useAlert();
  const [focus, setFocus] = useState({
    email: true,
    password: true,
  });

  function resetFocus() {
    Object.keys(focus).forEach((item) => {
      setFocus((prev) => {
        return { ...prev, [item]: false };
      });
    });
  }

  function handleSubmit(values) {
    resetFocus();
    formik.handleSubmit(values);
  }

  function handleFocus(e) {
    setFocus((prev) => {
      return { ...prev, [e.target.name]: true };
    });
  }

  function handleBlur(e) {
    setFocus((prev) => {
      return { ...prev, [e.target.name]: false };
    });
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      const success = signInWithEmailAndPassword(values.email, values.password);
    },
  });

  useEffect(() => {
    if (!loading && (user || error)) {
      let message;
      const type = error === undefined ? "success" : "error";
      if (error) {
        switch (error.code) {
          case errorCode.notFound:
            message = "User not found";
            break;
          case errorCode.wrongPassword:
            message = "Incorrect password";
            break;
          default:
            message = "Login Successful";
        }
      } else {
        message = "Login successful!";
      }

      if (type === "success") {
        formik.handleReset();
      }
      onOpen(type, message);
    }
  }, [user, error]);

  return (
    <AuthLayout type="Login" onSubmit={handleSubmit}>
      {user && (
        <div
          className={` ${styles.errorMessage} ${styles.fsError} text-accent fw-light`}
        >
          {user.email}
        </div>
      )}
      <label htmlFor="email" className={styles.inputFieldContainer}>
        <input
          type="email"
          id="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`${styles.inputField} | ${styles.fsInput} ${
            formik.errors.email && !focus.email && styles.errorField
          } bg-primary-600 text-neutral-100 fw-light`}
          placeholder="Email address"
        />
        {formik.errors.email && !focus.email ? (
          <div
            className={` ${styles.errorMessage} ${styles.fsError} text-accent fw-light`}
          >
            {formik.errors.email}
          </div>
        ) : null}
      </label>
      <label htmlFor="password" className={styles.inputFieldContainer}>
        <input
          type="password"
          id="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`${styles.inputField}  | ${styles.fsInput} ${
            !focus.password && formik.errors.password && styles.errorField
          } bg-primary-600 text-neutral-100 fw-light`}
          placeholder="Password"
        />
        {!focus.password && formik.errors.password ? (
          <div
            className={` ${styles.errorMessage} ${styles.fsError} text-accent fw-light`}
          >
            {formik.errors.password}
          </div>
        ) : null}
      </label>
      <button
        type="submit"
        className={`${styles.submitButton} | ${styles.fsInput} fw-light`}
      >
        {loading ? (
          <CircularProgress
            size={18}
            sx={{
              color: "black",
            }}
          />
        ) : (
          " Login to your account"
        )}
      </button>
      <p className={`${styles.fsInput} ${styles.para} fw-light`}>
        Don&apos;t have an account?{" "}
        <Link className="text-accent" href="/sign-up">
          Sign Up
        </Link>
      </p>
    </AuthLayout>
  );
};

export default AuthLogin;
