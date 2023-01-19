import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import BootyPixPage from "../src/containers/bootypix";
import HomeContainer from "../src/containers/home";

const Home: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Bootypix | Mint Here</title>
        <link
          rel="shortcut icon"
          href="https://blockapelads.com/wp-content/uploads/2022/02/cropped-BAL_logo_Cap_black-32x32.png"
        />
      </Head>
      <BootyPixPage />
    </React.Fragment>
  );
};

export default Home;
