import React, { FC, useState, useEffect, useRef } from "react";
import pepeHistoryAnimation from "@assets/video/pepe-wing.mp4";
import { HistorySC } from "./History.styled";
import zeroPepeLogo from "@assets/webp/zero-pepe-logo.webp";

const StartScreen: FC<{ onStart: () => void; onCredits: () => void }> = ({
  onStart,
  onCredits,
}) => {
  return (
    <div className="start-screen">
      <img src={zeroPepeLogo} alt="Zero Pepe Logo" />
      <div className="button-group">
        <button onClick={onStart}>Start Video</button>
        <button onClick={onCredits}>Credits</button>
      </div>

      <p>
        <span> ORIGINAL EDITION</span>
        <br />
        <br />
        <span> &copy; PEPECOIN EST. 2016</span>
      </p>
    </div>
  );
};

const History: FC = () => {
  const [state, setState] = useState<"start" | "playing" | "credits">("start");
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (state === "playing" && videoRef.current) {
      const video = videoRef.current;
      video.play();

      const handleVideoEnd = () => {
        video.currentTime = 0; // reset the video
        setState("start"); // change state back to start
      };

      video.addEventListener("ended", handleVideoEnd);

      // Cleanup function to remove the event listener
      return () => {
        video.removeEventListener("ended", handleVideoEnd);
      };
    }
  }, [state]);

  const startVideo = () => {
    setState("playing");
  };

  return (
    <HistorySC>
      {state === "start" && (
        <StartScreen
          onStart={startVideo}
          onCredits={() => setState("credits")}
        />
      )}
      {state === "playing" && (
        <video
          id="pepeVideo"
          ref={videoRef}
          src={pepeHistoryAnimation}
          muted={false}
        />
      )}
      {state === "credits" && (
        <div className="credits">
          <img src={zeroPepeLogo} alt="Zero Pepe Logo" />
          <p>
            <span>
              PepeCoin was originally launched in 2016 by a group of gigabrained
              crypto O.G's. Originally it was launched using its own
              Proof-of-Work blockchain network.
            </span>{" "}
            <a
              href="https://x.com/pepecoins/status/711919122012053504?s=20"
              rel="noopener norefferer"
              target="_blank"
            >
              click here
            </a>{" "}
            <span>
              to see the project's original launch tweet from 2016
              <br />
              <br />
              Due to controversy surrounding the Pepe the Frog meme after the
              2016 presidential election, some cucked exchanges decided to list
              the PepeCoin project under the name "Memetic" in order to avoid
              offending anyone.
              <br />
              <br />
              At the time the project was the only other memecoin except for
              Dogecoin and quickly grew in popularity.
              <br />
              <br />
              In 2017 it even attracted the attention of Vitalik Buterin
              himself.{" "}
            </span>
            <a
              href="https://twitter.com/VitalikButerin/status/841882612704653312"
              rel="noopener norefferer"
              target="_blank"
            >
              click here
            </a>{" "}
            <span>
              to see for yourself.
              <br />
              <br />
              After several years of operating it's own blockchain network, the
              PepeCoin project decided to migrate to the Ethereum blockchain to
              take advantage of EVM smart contracts.
              <br />
              <br />
              A nefarous project with the ticker $PEPE saw PepeCoin's
              announcement and frontran the project by launching their own PEPE
              token, even stealing the original PepeCoin logo, until they were
              forced to remove due to copyright.
              <br />
              <br />
              The one true PepeCoin has always been PepeCoin - and now the world
              is awakening to this fact.
            </span>
          </p>
          <button onClick={() => setState("start")}>Back to Start</button>
        </div>
      )}
    </HistorySC>
  );
};

export default History;
