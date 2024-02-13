import React, { useEffect } from "react";
import osLogo from "@assets/webp/pepe-os-wide.webp";
import navStart from "@assets/jpg/Start_256.jpg";
import navUniswap from "@assets/jpg/Uniswap_256.jpg";
import navHistory from "@assets/jpg/History_256.jpg";
import navMessenger from "@assets/jpg/Messenger_256.jpg";
import navMyFrens from "@assets/jpg/MyFrens_256.jpg";
import { PepeOSTourSC } from "./PepeOSTour.styled";
import { setExplorerNavState } from "@store/userInterface/userInterface";
import { setIsGuest } from "@store/userAccount/userAccount";
import { addAppWithSettings } from "@store/osState/pepeOSThunk";
import { EAppKeys } from "../appState/EAppKeys";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { EExplorerNavState } from "../InternetExplorer";

const PepeOSTour: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    localStorage.setItem("tourComplete", "true");
  }, []);

  const navigateToExplorerPage = (page: EExplorerNavState) => {
    dispatch(setExplorerNavState(page));
    dispatch(addAppWithSettings(EAppKeys.Explorer));
  };

  return (
    <PepeOSTourSC>
      <div className="tour_container">
        <div className="tour_content">
          <div className="intro_body">
            <img src={osLogo} alt="Pepe OS" />
            <span>
              Thank you for Installing PepeCoin's PepeOS Original Edition.
              <br />
              <br />
              Here at PepeCoin, we're dedicated to not only building cool stuff,
              but also crafting an atmosphere where creativity thrives and true
              memetic power flows through all those who participate within it.
              <br />
              <br />
              Feel free to explore PepeOS at your own pace, or embark on a
              guided tour with the options on the right. Welcome home, fren.
              <br />
              <br />
              Contract Address:
              <br />
              <a
                href="https://etherscan.io/token/0xa9e8acf069c58aec8825542845fd754e41a9489a"
                rel="noopener noreferrer"
                target="_blank"
              >
                0xa9e8acf069c58aec8825542845fd754e41a9489a
              </a>
            </span>
          </div>
          <div className="nav">
            <div>
              <button
                onClick={() => {
                  dispatch(setIsGuest(null));
                  navigateToExplorerPage(EExplorerNavState.About);
                }}
                className="nav_title"
                id="start_here"
              >
                <img src={navStart} alt="Getting Started" />
                Getting Started
              </button>
              <p>
                To get the most out of your PepeOS experience, logging in is
                recommended. However, you can explore the OS without using its
                integrated features as a Guest. To log in, select the 'Log Out'
                option from the Start Bar and choose one of the options in the
                Connect Wallet menu.
              </p>
            </div>
            <div>
              <button
                onClick={() =>
                  navigateToExplorerPage(EExplorerNavState.History)
                }
                className="nav_title"
                id="best"
              >
                <img src={navHistory} alt="History" />
                History
              </button>
              <p>
                PepeOS is powered by the PepeCoin project which was originally
                launched in 2016 by a group of OG crypto enthusiasts, miners,
                and buildooors. The project has a rich history which you can
                learn about via the Ask Pepe AI service in the Pepe Explorer
                application.
              </p>
            </div>
            <div>
              <a
                href="https://app.uniswap.org/tokens/ethereum/0xa9e8acf069c58aec8825542845fd754e41a9489a"
                className="nav_title"
                id="uniswap"
              >
                <img src={navUniswap} alt="Uniswap" />
                Uniswap
              </a>
              <p>
                Pepe&nbsp;OS is setting a new standard for memes. Demonstrating
                that memecoin lulz are compatible with true decentralization.
                The PepeOS ecosystem is powered by the PepeCoin ERC-20 token
                which can be acquired on{" "}
                <a
                  href="https://app.uniswap.org/tokens/ethereum/0xa9e8acf069c58aec8825542845fd754e41a9489a"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Uniswap
                </a>
                .
              </p>
            </div>
            <div>
              <button
                onClick={() => dispatch(addAppWithSettings(EAppKeys.Messenger))}
                className="nav_title"
                id="unlock"
              >
                <img src={navMessenger} alt="Messenger" />
                Messenger
              </button>
              <p>
                PepeCoin's live messenger is a decentralized chat application
                that blends secure messaging with SocialFi/NFTs in a way that
                puts a unique twist on the concept of digital meme ownership.
                Access via the desktop or start menu.
              </p>
            </div>
          </div>
        </div>
        <footer>
          &copy; 2016-{new Date().getFullYear()} PepeCoin.
          <br /> All rights reserved.
        </footer>
      </div>
    </PepeOSTourSC>
  );
};

export default PepeOSTour;
