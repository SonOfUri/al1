import React, { FC, useState } from "react";
import { PepemailListSC } from "../Pepemail.styled";
import { emailData } from "../emailData";

const PepemailList: FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <PepemailListSC>
      <div className="header">
        <span>From</span>
        <span>Subject</span>
        <span>Received</span>
      </div>
      <div className="mail-list-body inset-border">
        {emailData.inbox.map((email, index) => (
          <div
            key={index}
            className={`list-item ${selectedIndex === index ? "selected" : ""}`}
            onClick={() => handleItemClick(index)}
          >
            <span className="list-item__from">{email.from}</span>
            <span className="list-item__subject">{email.subject}</span>
            <span className="list-item__received">{email.received}</span>
          </div>
        ))}
      </div>
    </PepemailListSC>
  );
};

export default PepemailList;
