export const boolify = (x: string) => {
  if (x.toLowerCase() === "true") return true;
  else return false;
};

export const CONTRACT_ADDRESS = `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`;
export const OPENSEA_URL = process.env.NEXT_PUBLIC_OPENSEA_URL;

export const NETWORK: string = boolify(
  `${process.env.NEXT_PUBLIC_TEST_NETWORK}`
)
  ? "goerli"
  : "mainnet";

export const CHAIN_ID: string = boolify(
  `${process.env.NEXT_PUBLIC_TEST_NETWORK}`
)
  ? "5"
  : "1";

export const getEtherscanUrl = () => {
  if (NETWORK === "goerli") {
    return `https://goerli.etherscan.io/address/${CONTRACT_ADDRESS}`;
  } else {
    return `https://etherscan.io/address/${CONTRACT_ADDRESS}`;
  }
};

export const LOGO_IMG = process.env.NEXT_PUBLIC_LOGO_IMAGE;
export const USE_MUSIC = boolify(process.env.NEXT_PUBLIC_USE_MUSIC);

export const SALE_PAUSED = process.env.NEXT_PUBLIC_SALE_PAUSED === "true";
export const MAX_TOKENS = `${process.env.NEXT_PUBLIC_MAX_TOKENS}`;
export const TOKEN_PRICE = "0.004";

export const numberize = (num) => {

};
