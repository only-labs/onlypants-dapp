import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { LOGO_IMG } from "../src/constants";
import HomePage from "../src/containers/HomePage";

const Home: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Onlypants | Mint Here</title>
        <link rel="shortcut icon" href={LOGO_IMG} />
      </Head>
      <HomePage />
    </React.Fragment>
  );
};

export default Home;
