import Head from "next/head";

import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useWallet } from "@solana/wallet-adapter-react";
import useCandyMachine from "../hooks/use-candy-machine";
import Header from "../components/header";
import useWalletBalance from "../hooks/use-wallet-balance";
import Countdown from "react-countdown";
import { RecaptchaButton } from "../components/recaptcha-button";

const Home = () => {
  const [balance] = useWalletBalance();
  const [isActive, setIsActive] = useState(false);
  const wallet = useWallet();

  const {
    isSoldOut,
    mintStartDate,
    isMinting,
    onMint,
    onMintMultiple,
    nftsData,
  } = useCandyMachine();

  return (
    <main className="p-5 h-full">
      <Toaster />
      <Head>
        <title>Solana Colors</title>
        <meta name="description" content="Solana blockchain Color NFT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="flex h-full">
        <div className="flex flex-col justify-center items-center flex-1 space-y-3 mt-20">
          <span className="text-gray-800 font-bold text-2xl cursor-default">
            Can you taste the ROYGBIV?
          </span>

          {!wallet.connected && (
            <span className="text-gray-800 font-bold text-2xl cursor-default">
              NOT CONNECTED, PLEASE CLICK SELECT WALLET...
            </span>
          )}

          {wallet.connected && (
            <>
              <p className="text-gray-800 font-bold text-lg cursor-default">
                Remaining: {nftsData.itemsRemaining}
              </p>
            </>
          )}

          <div className="flex flex-col justify-start items-start">
            {wallet.connected && (
              <RecaptchaButton
                actionName="mint"
                disabled={isSoldOut || isMinting || !isActive}
                onClick={onMint}
              >
                {isSoldOut ? (
                  "SOLD OUT"
                ) : isActive ? (
                  <span>MINT {isMinting && "LOADING..."}</span>
                ) : (
                  <Countdown
                    date={mintStartDate}
                    onMount={({ completed }) => completed && setIsActive(true)}
                    onComplete={() => setIsActive(true)}
                    renderer={renderCounter}
                  />
                )}
              </RecaptchaButton>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

const renderCounter = ({ days, hours, minutes, seconds }: any) => {
  return (
    <span className="text-gray-800 font-bold text-2xl cursor-default">
      Live in {days} days, {hours} hours, {minutes} minutes, {seconds} seconds
    </span>
  );
};

export default Home;
