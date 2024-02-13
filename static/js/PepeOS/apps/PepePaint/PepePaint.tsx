import React, { FC, useState } from "react";
import dancingPepe from "@assets/gif/dancing-pepe.gif";
import { PepePaintSC } from "./PepePaint.styled";

interface PaintProps {
  onClose: () => void;
  isFocus: boolean;
}

const Paint: FC<PaintProps> = ({ onClose, isFocus }) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <PepePaintSC>
      {isLoading && (
        <div className="loader">
          <img src={dancingPepe} alt="dancingpepe" />
          <h4>Pepe Paint is loading...</h4>
        </div>
      )}
      <iframe
        src="https://paint.pepecoin.io"
        frameBorder="0"
        title="paint"
        allow="clipboard-read; clipboard-write"
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          backgroundColor: "rgb(192,192,192)",
        }}
        onLoad={() => setIsLoading(false)}
      />
      {!isFocus && (
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            left: 0,
            top: 0,
          }}
        />
      )}
    </PepePaintSC>
  );
};

export default Paint;
