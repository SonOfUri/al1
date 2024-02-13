import React, { FC, useEffect, useState } from "react";
import { AskPepeSC } from "./AskPepe.styled";
import askPepeLogo from "@assets/webp/ask_pepe.webp";
import axios from "axios";
import {
  aboutPepeCoin,
  basedStaking,
  pepecoinHistory,
  pepecoinUtility,
  promptInfo,
  realPepe,
} from "./prompt_bg";
import { setExplorerNavState } from "@store/userInterface/userInterface";
import { EExplorerNavState } from "../InternetExplorer";
import askIcon from "@assets/svg/ask-pepe-text.svg";
import { addAppWithSettings } from "@store/osState/pepeOSThunk";
import { EAppKeys } from "../appState/EAppKeys";
import { useAppDispatch } from "@hooks/useAppDispatch";

enum ESuggestedQuestions {
  Tokenomics = "Tokenomics",
  Price = "Price",
  About = "About",
  History = "History",
  HowToBuy = "How to buy",
  ContractAddress = "Contract address",
  Utility = "Utility",
  Staking = "Staking",
}

const suggestions = [
  ESuggestedQuestions.Tokenomics,
  ESuggestedQuestions.Price,
  ESuggestedQuestions.About,
  ESuggestedQuestions.Utility,
  ESuggestedQuestions.History,
  ESuggestedQuestions.HowToBuy,
  ESuggestedQuestions.ContractAddress,
];

const AskPepe: FC = () => {
  const [questionInput, setQuestionInput] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Pepe is thinking");
  const dispatch = useAppDispatch();

  const timeoutIds = React.useRef<number[]>([]);

  useEffect(() => {
    let i = 0;
    const dots = [".", "..", "..."];
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingText(`Pepe is thinking${dots[i % dots.length]}`);
        i++;
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  useEffect(() => {
    askQuestion(ESuggestedQuestions.History);
  }, []);

  const askQuestion = async (question: string) => {
    // Clear all timeouts
    timeoutIds.current.forEach(clearTimeout);
    timeoutIds.current = [];

    setAnswer("");
    setIsLoading(true);
    const lowerCaseQuestion = question.toLowerCase();
    try {
      let fullAnswer: string[];

      if (
        lowerCaseQuestion.includes("tokenomics") ||
        lowerCaseQuestion.includes("supply")
      ) {
        fullAnswer =
          `The ticker is $PEPECOIN, the contract address is 0xa9e8acf069c58aec8825542845fd754e41a9489a, and the total supply is 133,769,420 PEPECOIN.`.split(
            " "
          );
      } else if (
        lowerCaseQuestion.includes("price") ||
        lowerCaseQuestion.includes("market cap") ||
        lowerCaseQuestion.includes("mcap") ||
        lowerCaseQuestion.includes("value")
      ) {
        const responsePrice = await axios.get("/api/cmc-data");
        const data = responsePrice.data.data[`24835`];
        const price = data.quote.USD.price;
        const marketCap = Math.floor(price * 133769420);
        fullAnswer = `The current price of PepeCoin is $${price.toFixed(
          4
        )} and its market cap is $${marketCap.toLocaleString("en-US")}.`.split(
          " "
        );
      } else if (lowerCaseQuestion.includes("about")) {
        fullAnswer = aboutPepeCoin.split(" ");
      } else if (
        lowerCaseQuestion.includes("$PEPE") ||
        lowerCaseQuestion.includes("pepe.vip")
      ) {
        fullAnswer = realPepe.split(" ");
      } else if (lowerCaseQuestion.includes("history")) {
        fullAnswer = pepecoinHistory.split(" ");
      } else if (lowerCaseQuestion.includes("how to buy")) {
        fullAnswer =
          "You can buy PepeCoin on Uniswap.org using the token's contract address 0xa9e8acf069c58aec8825542845fd754e41a9489a".split(
            " "
          );
      } else if (
        lowerCaseQuestion.includes("staking") ||
        lowerCaseQuestion.includes("stake")
      ) {
        fullAnswer = basedStaking.split(" ");
      } else if (
        lowerCaseQuestion.includes("based") ||
        lowerCaseQuestion.includes("basedAI")
      ) {
        fullAnswer = basedStaking.split(" ");
      } else if (lowerCaseQuestion.includes("contract address")) {
        fullAnswer =
          "The contract address is 0xa9e8acf069c58aec8825542845fd754e41a9489a".split(
            " "
          );
      } else if (lowerCaseQuestion.includes("utility")) {
        fullAnswer = pepecoinUtility.split(" ");
      } else {
        const responseDefault = await axios.get("/api/ai-response", {
          params: {
            promptInfo: promptInfo,
            question: question,
          },
        });
        fullAnswer = responseDefault.data.choices[0].message.content.split(" ");
      }

      fullAnswer = fullAnswer.filter((word) => word !== undefined);

      const addWordWithDelay = (word: string, index: number) => {
        const id = window.setTimeout(() => {
          setAnswer((prevAnswer) =>
            prevAnswer ? prevAnswer + " " + word : word
          );
          if (index === fullAnswer.length - 1) {
            setIsLoading(false);
          }
        }, index * 50);
        timeoutIds.current.push(id);
      };

      fullAnswer.forEach(addWordWithDelay);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setQuestionInput("");
    }
  };
  return (
    <AskPepeSC>
      <div className="ask-pepe__header">
        <button
          onClick={() => dispatch(setExplorerNavState(EExplorerNavState.About))}
        >
          Home
        </button>
        <button
          onClick={() =>
            dispatch(setExplorerNavState(EExplorerNavState.History))
          }
        >
          History
        </button>
        <button
          onClick={() => dispatch(setExplorerNavState(EExplorerNavState.Team))}
        >
          My Frens
        </button>
      </div>
      <div className="ask-pepe__body">
        <div className="ask-pepe__suggestions-wrapper">
          <div className="ask-pepe__suggestions">
            <h4>May I Suggest?</h4>
            {suggestions.map((suggestion) => (
              <button
                onClick={() => {
                  askQuestion(suggestion);
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
        <img
          src={askPepeLogo}
          alt="Ask Pepe"
          className="ask-pepe__img desktop"
        />
        <div className="ask-pepe__content">
          <div className="ask-pepe__content__header">
            <img
              src={askPepeLogo}
              alt="Ask Pepe"
              className="ask-pepe__img mobile"
            />
            <h1>
              Have a<br /> <span className="large">Question?</span>
              <br />
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <span className="small">
                  Just type it in
                  <br /> and click
                </span>{" "}
                <span className="large">Ask Pepe!</span>
              </div>
            </h1>
          </div>
          <div className="ask-pepe__input-group">
            <input
              type="text"
              placeholder="Curious about PepeCoin or something else? Just ask!"
              value={questionInput}
              onChange={(e) => setQuestionInput(e.target.value)}
            />
            <button
              className="ask-pepe__button"
              onClick={() => askQuestion(questionInput)}
              disabled={isLoading}
            >
              <img src={askIcon} alt="Ask" />
            </button>
          </div>

          <div className="field-row-stacked">
            <label htmlFor="answerBox">Pepe{"'"}s Answer:</label>
            <textarea
              id="answerBox"
              placeholder="Pepe's answer will appear here."
              rows={6}
              readOnly
              value={isLoading ? loadingText : answer}
            ></textarea>
          </div>
          <p style={{ marginTop: 0 }}>
            Pepe is able to answer most questions about PepeCoin and other
            topics, but he is using AI software that is still relatively new and
            may not always answer correctly. But in case you don't get the
            information you're looking for, you can contact a PepeCoin
            contributor on{" "}
            <a
              href="https://t.me/pepecoins"
              target="_blank"
              rel="noopener noreferrer"
            >
              Telegram
            </a>{" "}
            or{" "}
            <a
              href="https://x.com/pepecoins"
              target="_blank"
              rel="noopener noreferrer"
            >
              X (Formerly Twitter)
            </a>
            , or even via{" "}
            <span
              style={{ color: "blue", textDecoration: "underline" }}
              onClick={() => dispatch(addAppWithSettings(EAppKeys.Messenger))}
            >
              Pepe Messenger!
            </span>
          </p>
        </div>
      </div>
      <div className="ask-pepe__footer">
        <p>&copy; {new Date().getFullYear()} Enterprise PepeCoin Alliance</p>
        <p>All dank memes reserved.</p>
      </div>
    </AskPepeSC>
  );
};

export default AskPepe;
