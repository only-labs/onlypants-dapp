import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { LOGO_IMG } from "../src/constants";
import BootyPixPage from "../src/containers/bootypix";

const Home: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Bootypix | Mint Here</title>
        <link rel="shortcut icon" href={LOGO_IMG} />
      </Head>
      <BootyPixPage />
    </React.Fragment>
  );
};

export default Home;
