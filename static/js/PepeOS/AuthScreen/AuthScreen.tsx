import React, { FC, useState, useEffect } from "react";
import { AuthScreenSC, LogInBtnSC } from "./AuthScreen.styled";
import pepeosLogo from "@assets/webp/pepe-og-white.webp";
import pepecoinLogo from "@assets/pepeOS-icons/auth/pepecoin-pfp.jpeg";
import guestIcon from "@assets/pepeOS-icons/auth/guest-pepe.png";
import { useDispatch } from "react-redux";
import {
  setBootState,
  setCrtToggleState,
} from "@store/userInterface/userInterface";
import { useSelector } from "react-redux";
import { TRootState } from "@store/index";
import { EPageLoadingState } from "../../App";
import { setIsGuest } from "@store/userAccount/userAccount";
import PulseLoader from "react-spinners/PulseLoader";
import UserAvatar from "@components/UserAvatar";
import ConnectButton from "@components/ConnectButton";
import { useAddress } from "@thirdweb-dev/react";
import { shortAddress } from "@helpers/string";

enum EAccount {
  User = "user",
  Guest = "guest",
}

const AuthScreen: FC = () => {
  const [activeAccount, setActiveAccount] = useState<string | null>(null);
  const dispatch = useDispatch();
  const address = useAddress();

  const ensDataLoading = useSelector(
    (state: TRootState) => state.userAccount.isLoading
  );

  const ensName = useSelector((state: TRootState) => state.userAccount.ensName);

  const crtToggleState = useSelector(
    (state: TRootState) => state.userInterface.crtToggleState
  ) as boolean;

  const handleLogIn = () => {
    if (activeAccount === EAccount.Guest) {
      dispatch(setIsGuest(true));
    } else if (activeAccount === EAccount.User) {
      dispatch(setIsGuest(false));
    }
    dispatch(setBootState(EPageLoadingState.Desktop));
  };

  const handleAccountClick = (account: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (activeAccount === account) {
      return;
    }
    setActiveAccount(account);
  };

  const isModalOpen = () => {
    return !!document.getElementById("thirdweb-embedded-wallet-iframe");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!event.target || isModalOpen()) return;
      const target = event.target as HTMLElement;
      if (
        !target.closest(".login-screen__account") &&
        !target.closest(".connect-button-wrapper")
      ) {
        setActiveAccount(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const handleTogglePress = () => {
    dispatch(setCrtToggleState(!crtToggleState));
  };

  return (
    <AuthScreenSC>
      <div className="login-screen">
        <div className="login-screen__top"></div>
        <div className="login-screen__center">
          <div className="login-screen__instructions">
            <img src={pepeosLogo} alt="logo" />
            <span>To begin, select user</span>
          </div>
          <div className="login-screen__accounts">
            {address ? (
              <div
                tabIndex={-1}
                className={`login-screen__account ${
                  activeAccount === EAccount.User ? "active" : ""
                }`}
                onClick={(event) => handleAccountClick(EAccount.User, event)}
              >
                <div className="login-screen__account-content">
                  <div className="login-screen__account-icon">
                    <UserAvatar />
                  </div>
                  <div className="login-screen__account-details">
                    <span className="login-screen__account-name">
                      {ensDataLoading ? (
                        <PulseLoader color="#fff" size={8} />
                      ) : ensName ? (
                        ensName
                      ) : (
                        shortAddress(address as string)
                      )}
                    </span>

                    <span className="login-screen__account-description">
                      Continue with connected account
                    </span>

                    {activeAccount === EAccount.User && <ConnectButton />}
                  </div>
                </div>
                {activeAccount === EAccount.User && (
                  <LogInBtnSC
                    type="submit"
                    onClick={handleLogIn}
                    disabled={ensDataLoading}
                  >
                    <span></span>
                  </LogInBtnSC>
                )}
              </div>
            ) : (
              <div
                tabIndex={-1}
                className={`login-screen__account ${
                  activeAccount === EAccount.User ? "active" : ""
                }`}
                onClick={(event) => handleAccountClick(EAccount.User, event)}
              >
                <div className="login-screen__account-content">
                  <div
                    className="login-screen__account-icon"
                    style={{ background: "white" }}
                  >
                    <img src={pepecoinLogo} alt="metamask" />
                  </div>
                  <div className="login-screen__account-details">
                    <span className="login-screen__account-name">
                      Web3 Account
                    </span>
                    {activeAccount === EAccount.User ? (
                      <ConnectButton />
                    ) : (
                      <span className="login-screen__account-description">
                        Log in with your Web3 account
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div
              tabIndex={-1}
              className={`login-screen__account ${
                activeAccount === EAccount.Guest ? "active" : ""
              }`}
              onClick={(event) => handleAccountClick(EAccount.Guest, event)}
            >
              <div className="login-screen__account-content">
                <div className="login-screen__account-icon">
                  <img src={guestIcon} alt="Guest Avatar" />
                </div>
                <div className="login-screen__account-details">
                  <span className="login-screen__account-name">Guest</span>
                  <span className="login-screen__account-description">
                    Enter without connecting wallet
                  </span>
                </div>
              </div>
              {activeAccount === EAccount.Guest && (
                <LogInBtnSC type="submit" onClick={handleLogIn}>
                  <span></span>
                </LogInBtnSC>
              )}
            </div>
          </div>
        </div>
        <div className="login-screen__bottom">
          <div className="login-screen__turn-off" onClick={handleTogglePress}>
            <button className="login-screen__turn-off-icon"></button>{" "}
            <span>Toggle scanlines effect</span>
          </div>
          <div className="login-screen__login-info">
            <span>
              To change accounts from inside the app click Start, then click Log
              Off, <br className="mobile-hidden" />
              or go to Control Panel and click User Accounts.
            </span>
          </div>
        </div>
      </div>
    </AuthScreenSC>
  );
};

export default AuthScreen;
