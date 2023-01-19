import Image from "next/image";
import React from "react";

import openseaBtn from "../../../public/opensea.png";
import connectWalletBtn from "../../../public/connect-wallet.png";

export const OpenseaBtn = () => {
  return (
    <a
      href={OPENSEA_URL}
      target="_blank"
      rel="noreferrer"
    >
      <div className="opensea-btn">
        <Image
          src={openseaBtn}
          alt="opensea button"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </a>
  );
};

export const ConnectWalletBtn = ({ connectWallet }) => {
  return (
    <div
      className="connect-btn"
      onClick={() => {
        connectWallet();
      }}
    >
      <Image
        src={connectWalletBtn}
        alt="opensea button"
        layout="fill"
        objectFit="contain"
      />
    </div>
  );
};
