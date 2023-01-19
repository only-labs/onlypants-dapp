import { BigNumber, ethers } from "ethers";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import mintBtn from "../../../public/mint.png";
import emptyBox from "../../../public/mint_button_empty.png";
import emptyBoxGray from "../../../public/mint_button_empty_grey.png";

import If from "../../components/If";
import { CONTRACT_ADDRESS } from "../../constants";
import useContract from "../../hooks/useContract";
import useWallet from "../../hooks/useWallet";

const BUTTON_TEXT = {
  MINT: "MINT",
  MINT_SALE: "Mint for ",
  EXCEEDS: "Token exceeds limit",
  TRANSACTION: "Confirm Transaction",
  MINTING: "Minting...",
  SOLD_OUT: "Sold Out",
  PRESALE_NOT_ALLOWED: "Not Allowed to Buy",
  NO_SALE: "Coming Soon",
};

const Mint = ({ provider, signer, user, incrementSupply }) => {
  const [contract] = useContract(CONTRACT_ADDRESS, provider);

  const [maxPurchase, setMaxPurchase] = useState(10);
  const [noOfTokens, setNoOfTokens] = useState(null);
  const [disabledMintInput, setDisabledMintInput] = useState(false);
  const [saleType, setSaleType] = useState(0);
  const [price, setPrice] = useState("0");
  const [buttonText, setButtonText] = useState(BUTTON_TEXT.MINT);
  const [disabledMintButton, setDisabledMintButton] = useState(false);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const isPresale = await contract.callStatic.isPresaleActive();
        const isSale = await contract.callStatic.isSaleActive();
        console.log({ isSale, isPresale });

        if (isPresale) {
          setSaleType(1);
          const presalePrice = await contract.callStatic.presalePrice();
          setPrice(presalePrice);
          const mPurchase = await contract.callStatic.presaleMaxHolding();
          setMaxPurchase(mPurchase);
        } else {
          if (isSale) {
            setSaleType(2);
            const salePrice = await contract.callStatic.price();
            setPrice(salePrice);
            const mPurchase = await contract.callStatic.maxPurchase();
            setMaxPurchase(mPurchase);
          } else {
            setSaleType(0);
          }
        }
      } catch (err) {
        console.log(err, "error in fetching sale info");
      }
    };
    if (contract) {
      try {
        getDetails();
      } catch (err) {
        console.log(err);
      }
    }
  }, [contract]);

  const resetMint = () => {
    setButtonText(BUTTON_TEXT.MINT);
    setDisabledMintInput(false);
    setDisabledMintButton(false);
    setNoOfTokens("");
  };

  useEffect(() => {
    if (noOfTokens) {
      const tokensCount = parseInt(noOfTokens);

      if (tokensCount > 0) {
        if (tokensCount <= maxPurchase) {
          setDisabledMintButton(false);
          setButtonText(BUTTON_TEXT.MINT);
        } else {
          setDisabledMintButton(true);
          //   setButtonText(BUTTON_TEXT.EXCEEDS);
        }
      } else {
        setDisabledMintButton(true);
        setButtonText(BUTTON_TEXT.MINT);
      }
    } else {
      setDisabledMintButton(true);
      setButtonText(BUTTON_TEXT.MINT);
    }
  }, [noOfTokens, maxPurchase]);

  useEffect(() => {
    if (saleType === 0) {
      setButtonText(BUTTON_TEXT.NO_SALE);
    } else {
      setButtonText(BUTTON_TEXT.MINT);
    }
  }, [saleType]);

  const handleMint = async (e) => {
    if (disabledMintButton) {
      return;
    }
    e.preventDefault();
    setButtonText(BUTTON_TEXT.TRANSACTION);
    setDisabledMintButton(true);
    setDisabledMintInput(true);
    try {
      let transaction;
      if (saleType === 1) {
        transaction = await contract
          ?.connect(signer)
          ?.presaleBuy([], user, parseInt(noOfTokens), {
            value: BigNumber.from(noOfTokens).mul(price),
          });
      }
      if (saleType === 2) {
        transaction = await contract
          ?.connect(signer)
          ?.buy(user, parseInt(noOfTokens), {
            value: BigNumber.from(noOfTokens).mul(price),
          });
      }
      setButtonText(BUTTON_TEXT.MINTING);
      transaction
        .wait()
        .then((tx: any) => {
          incrementSupply(parseInt(noOfTokens));
          resetMint();
          toast(
            `🎉 Succesfully minted ${noOfTokens} Bootypix!//${tx.transactionHash}`
          );
        })
        .catch((err: any, tx: any) => {
          resetMint();
          toast(`❌ Something went wrong! Please Try Again`);
        });
    } catch (err) {
      console.log({ err });
      if (err.message.includes("out of buying limit")) {
        toast(`❌ You have exceeded your buying limit`);
      } else if (err.code === "INSUFFICIENT_FUNDS") {
        toast(`❌ Insufficient Funds in you wallet!`);
      } else {
        toast(`❌ Something went wrong! Please Try Again`);
      }
      resetMint();
    }
  };

  return (
    <div className="mint-container">
      <If
        condition={saleType > 0}
        then={
          <div className="mint-input-bg">
            <input
              className="mint-input"
              type="number"
              onWheel={(e) => {
                // @ts-ignore
                e.target?.blur();
              }}
              placeholder={`Number of Tokens. ${
                maxPurchase ? `(Max. ${maxPurchase})` : ""
              }`}
              value={noOfTokens}
              onChange={(e) => setNoOfTokens(e.target.value)}
              min={1}
              max={maxPurchase ?? 10}
              disabled={disabledMintInput}
            />
            <Image
              src={disabledMintInput ? emptyBoxGray : emptyBox}
              alt="emptyBox for input"
              layout="fill"
              className="bg-box"
            />
          </div>
        }
      />
      <If
        condition={saleType > 0 && noOfTokens > 0}
        then={
          <div className="total-info">
            <If
              condition={parseInt(noOfTokens) <= maxPurchase}
              then={
                <h5>{`Total ${
                  noOfTokens
                    ? ethers.utils.formatUnits(
                        BigNumber.from(noOfTokens).mul(price).toString()
                      )
                    : ""
                } ETH`}</h5>
              }
              else={
                <h5 className="error">{`Cannot mint more than ${maxPurchase} tokens`}</h5>
              }
            />
          </div>
        }
      />
      <div className="mint-btn" onClick={handleMint}>
        <h2>{buttonText}</h2>
        <Image
          src={disabledMintButton ? emptyBoxGray : emptyBox}
          alt="mint button"
          layout="fill"
          className="bg-box"
        />
      </div>
    </div>
  );
};

export default Mint;
