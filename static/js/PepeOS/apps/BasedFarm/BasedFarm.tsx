import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import {
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import basedAbi from "./basedAbi.json";
import { ethers } from "ethers";
import { useBalance } from "@thirdweb-dev/react";
import { BasedFarmSC } from "./BasedFarm.styled";
import pepecoinAbi from "./pepecoinAbi.json";
import ConnectButton from "@components/ConnectButton";

const stakingCA = "0xA6B816010Ab51e088C4F19c71ABa87E54b422E14";

const pepecoinCA = "0xA9E8aCf069C58aEc8825542845Fd754e41a9489A";

const pid = 0;

const formatBalance = (balance?: { displayValue: string }) => {
  if (!balance) return "Loading...";
  const value = Number(balance.displayValue);
  return value.toFixed(2);
};

const useInterval = (callback: () => void, delay: number) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current();
    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
};

const BasedFarm: FC = () => {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [depositLoading, setDepositLoading] = useState(false);
  const [rewardAmountInPool, setRewardAmountInPool] = useState("0");
  const [stakedAmountInPool, setStakedAmountInPool] = useState("0");
  const [dummyState, setDummyState] = useState(0);
  const [balanceUpdateKey, setBalanceUpdateKey] = useState(0);
  const [activeTab, setActiveTab] = useState<"stake" | "about">("stake");
  const address = useAddress();

  const { data: pepecoinBalance, isLoading: pepecoinBalanceLoading } =
    useBalance("0xa9e8acf069c58aec8825542845fd754e41a9489a");

  const { data: basedBalance, isLoading: basedBalanceLoading } = useBalance(
    "0x44971abf0251958492fee97da3e5c5ada88b9185"
  );

  const { contract } = useContract(stakingCA, basedAbi);
  const pepeCoinContract = useContract(pepecoinCA, pepecoinAbi);
  const {
    mutateAsync: deposit,
    isLoading: isDepositLoading,
    error: depositError,
  } = useContractWrite(contract, "deposit");
  const {
    mutateAsync: withdraw,
    isLoading: isWithdrawLoading,
    error: withdrawError,
  } = useContractWrite(contract, "withdraw");
  const {
    mutateAsync: claimReward,
    isLoading: isClaimRewardLoading,
    error: claimRewardError,
  } = useContractWrite(contract, "claimReward");
  const {
    mutateAsync: approve,
    isLoading: isApproveLoading,
    error: approveError,
  } = useContractWrite(pepeCoinContract.contract, "approve");

  const { data: totalRewardData, isLoading: totalRewardDataLoading } =
    useContractRead(contract, "getTotalRewardByPoolId", [pid, address]);

  const { data: stakedAmount, isLoading: stakedAmountIsLoading } =
    useContractRead(contract, "userInfo", [pid, address]);

  useEffect(() => {
    if (totalRewardData && totalRewardData._hex) {
      // Convert the hex string to a BigInt
      const rewardBigInt = BigInt(totalRewardData._hex);
      // Format the BigInt as ether
      setRewardAmountInPool(ethers.formatUnits(rewardBigInt, "ether"));
    }
  }, [totalRewardData, address, dummyState]);

  useEffect(() => {
    if (stakedAmount && stakedAmount.amount) {
      // Convert the hex string to a BigInt
      const stakedBigInt = BigInt(stakedAmount.amount);
      // Format the BigInt as ether
      setStakedAmountInPool(ethers.formatUnits(stakedBigInt, "ether"));
    }
  }, [stakedAmount, address, dummyState]);

  const { data: allowance } = useContractRead(
    pepeCoinContract.contract,
    "allowance",
    [address, stakingCA]
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDummyState((prev) => prev + 1);
    }, 15000);

    return () => clearInterval(intervalId);
  }, []);

  const handleDeposit = async () => {
    setDepositLoading(true);
    try {
      const validNumber = /^\d+(\.\d{1,18})?$/;
      if (!validNumber.test(depositAmount)) {
        console.error("Invalid deposit amount");
        return;
      }

      // Convert depositAmount to a BigNumber using ethers
      const depositAmountBN = ethers.parseUnits(depositAmount, "ether");

      // Check if the user has approved the contract to spend their tokens
      if (allowance && allowance.lt(depositAmountBN)) {
        try {
          // Prompt the user to approve the contract
          await approve({
            args: [stakingCA, ethers.MaxUint256],
          });
          // Update the allowance state after approval
          setDummyState((prev) => prev + 1);

          // Increment the balanceUpdateKey to trigger a refetch of the balance
          setBalanceUpdateKey((prev) => prev + 1);
        } catch (error) {
          console.error("Approval Failed: ", error);
          return;
        }
      }

      // Once approved, initiate the deposit transaction
      await deposit({
        args: [pid, depositAmountBN],
      });
      // Update the user's staked balance and claimable rewards
      setDummyState((prev) => prev + 1);
    } catch (error) {
      console.error("Deposit Failed: ", error);
    } finally {
      setDepositAmount("");
      setDepositLoading(false);
    }
  };

  const handleWithdraw = async () => {
    try {
      const validNumber = /^\d+(\.\d{1,18})?$/;
      if (!validNumber.test(withdrawAmount)) {
        console.error("Invalid withdrawal amount");
        return;
      }
      // Once the withdrawal is successful, update the balance
      await withdraw({
        args: [pid, ethers.parseUnits(withdrawAmount, "ether")],
      });

      // Increment the balanceUpdateKey to trigger a refetch of the balance
      setBalanceUpdateKey((prev) => prev + 1);
    } catch (error) {
      console.error("Withdraw Failed: ", error);
    } finally {
      setWithdrawAmount("");
    }
  };
  const handleClaimReward = async () => {
    try {
      await claimReward({ args: [pid] });
    } catch (error) {
      console.error("Claim Reward Failed: ", error);
    }
  };

  const refreshRewards = useCallback(() => {
    setDummyState((prev) => prev + 1);
  }, []);

  useInterval(refreshRewards, 15000);

  useEffect(() => {
    if (address) {
      // Fetch balances and rewards when the address changes
      setDummyState((prev) => prev + 1);
    } else {
      // Reset state when the address is disconnected
      setRewardAmountInPool("N/A");
      setStakedAmountInPool("N/A");
    }
  }, [address]);

  return (
    <BasedFarmSC>
      <div className="banner">
        <h3>
          BasedAI
          <br />
          Farm
        </h3>
      </div>
      <menu role="tablist">
        <button
          aria-selected={activeTab === "stake"}
          aria-controls="stake"
          onClick={() => setActiveTab("stake")}
        >
          Stake PepeCoins
        </button>
        <button
          aria-selected={activeTab === "about"}
          aria-controls="about"
          onClick={() => setActiveTab("about")}
        >
          About BasedAI
        </button>
      </menu>
      <article role="tabpanel" id="stake" hidden={activeTab === "about"}>
        <p style={{ marginBottom: "1rem" }}>
          Stake your PepeCoins and earn $BasedAI tokens.
        </p>
        <div className="sections">
          <fieldset key={balanceUpdateKey}>
            <legend>User Information</legend>
            {address ? (
              <>
                <p>
                  Connected Address:{" "}
                  {address?.slice(0, 8) + "..." + address?.slice(-6)}
                </p>
                <p>PepeCoin Balance: {formatBalance(pepecoinBalance)}</p>
                <p>BasedAI Balance: {formatBalance(basedBalance)}</p>
              </>
            ) : (
              <ConnectButton />
            )}
          </fieldset>
          <fieldset>
            <legend>Deposit PepeCoin</legend>
            <div className="controls">
              <div>
                <input
                  type="text"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  placeholder="Amount to deposit"
                />
                <button
                  disabled={isDepositLoading || depositLoading}
                  onClick={handleDeposit}
                >
                  {isDepositLoading || depositLoading
                    ? "Depositing..."
                    : "Deposit"}
                </button>
              </div>
              <button
                className="unstyled"
                disabled={pepecoinBalanceLoading}
                onClick={() =>
                  setDepositAmount(pepecoinBalance?.displayValue as string)
                }
              >
                Max
              </button>
            </div>
          </fieldset>
          <fieldset>
            <legend>Withdraw PepeCoin</legend>
            <div className="controls">
              <div>
                <input
                  type="text"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="Amount to withdraw"
                />
                <button disabled={isWithdrawLoading} onClick={handleWithdraw}>
                  {isWithdrawLoading ? "Withdrawing..." : "Withdraw"}
                </button>
              </div>

              <button
                className="unstyled"
                disabled={basedBalanceLoading}
                onClick={() => setWithdrawAmount(stakedAmountInPool as string)}
              >
                Max
              </button>
            </div>
            {address ? (
              <p>
                {stakedAmountIsLoading ? (
                  "Loading..."
                ) : (
                  <>
                    PepeCoin staked:{" "}
                    {parseFloat(stakedAmountInPool).toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 4,
                    })}
                  </>
                )}
              </p>
            ) : (
              "No wallet connected"
            )}
          </fieldset>
          <fieldset>
            <legend>Claim Rewards</legend>
            {address ? (
              <div className="controls">
                <label>
                  {totalRewardDataLoading ? (
                    "Loading..."
                  ) : (
                    <>
                      You have{" "}
                      {parseFloat(rewardAmountInPool).toLocaleString(
                        undefined,
                        {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 4,
                        }
                      )}{" "}
                      BasedAI to claim
                    </>
                  )}
                </label>
                <button
                  disabled={isClaimRewardLoading}
                  onClick={handleClaimReward}
                >
                  {isClaimRewardLoading ? "Claiming..." : "Claim BasedAI"}
                </button>
              </div>
            ) : (
              "No wallet connected"
            )}
          </fieldset>
        </div>
      </article>
      <article role="tabpanel" hidden={activeTab === "stake"} id="about">
        <p style={{ marginBottom: "1rem" }}>
          BasedAI is a custom engineered Layer 1 network being developed by the
          gigabrains at PepeCoin. BasedAI weaves the decentralized storage and
          computation of open source AI models directly into it's consensus
          mechanism.
          <br />
          <br />
          For the layman, BasedAI is a decentralized AI network that
          democratizes the use and monetization of AI models, ushering in a new
          era of AI freedom that is free of the shackles imposed on traditional
          models by centralized tech overlords.
          <br />
          <br />
          Validators stake BasedAI tokens and earn BasedAI for performing two
          tasks a) storing LLM models, and b) contributing GPU resources to the
          network for processing.
          <br />
          <br />
          BasedAI is currently undergoing a private testnet phase, and will be
          transitioning into it's public phase in the coming weeks.
          <br />
          <br />
          We look forward to you all joining us on this journey.
          <br />
          <br />
          CA: 0x44971abf0251958492fee97da3e5c5ada88b9185
        </p>
      </article>

      <section className="field-row" style={{ justifyContent: "flex-end" }}>
        {/* <button
          onClick={() =>
            window.open(
              "https://app.uniswap.org/#/swap?outputCurrency=0xa9e8acf069c58aec8825542845fd754e41a9489a",
              "_blank"
            )
          }
        >
          Buy BasedAI
        </button> */}
        <button
          onClick={() =>
            window.open(
              "https://www.dextools.io/app/en/ether/pair-explorer/0xfa4a4c553733f2e0c54f1c4b0ddc1fa2f5f10ce6",
              "_blank"
            )
          }
        >
          $BasedAI Chart
        </button>
      </section>
    </BasedFarmSC>
  );
};

export default BasedFarm;
