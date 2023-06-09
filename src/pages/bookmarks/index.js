import Head from "next/head";
import Layout from "../../components/layout/Layout";
import Bookmark from "../../components/bookmarks/Bookmark";
import { useAuth } from "../../components/context/AuthProvider";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";

export default function Bookmarks() {
  const { userId } = useAuth();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Bookmarks | EntertainHub</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/favicon.png" />
      </Head>
      <Layout>
        <div className="showListContainer">
          {!userId ? (
            <p className="padding-block-top padding-inline fs-m-primary-heading fw-light">
              You don&apos;t have access to this page. Login or Signup to
              access.
            </p>
          ) : (
            <>
              <Bookmark category="Movie" />
              <Bookmark category="TV Series" />{" "}
            </>
          )}
        </div>
      </Layout>
    </>
  );
}
