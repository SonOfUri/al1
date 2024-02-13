import React, { FC } from "react";
import { PepemailItemSC } from "../Pepemail.styled";
import { emailData } from "../emailData";

const EmailComponent: FC<{ text: string }> = ({ text }) => {
  const renderEmailText = () => {
    const urlRegex = /(http:\/\/\S+)/g;
    return text.replace(urlRegex, (url) => {
      const link = `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
      return link;
    });
  };

  return <div dangerouslySetInnerHTML={{ __html: renderEmailText() }} />;
};

const PepemailItem: FC = () => {
  return (
    <PepemailItemSC>
      <div className="header">
        <span>
          <strong>From: </strong>
          {emailData.inbox[0].from}
          <br />
          <strong>Subject: </strong>
          {emailData.inbox[0].subject}
        </span>
      </div>
      <div className="mail-item-body inset-border">
        <h1 style={{ marginBottom: "0.5rem" }}>{emailData.inbox[0].subject}</h1>
        <h3>
          <strong>{emailData.inbox[0].from}</strong>
        </h3>
        <h3>{emailData.inbox[0].received}</h3>
        <ul style={{ marginTop: "0.5rem" }}>
          <li>Previous message: N/A</li>
        </ul>
        <hr />
        <p>
          <EmailComponent text={emailData.inbox[0].email.text ?? ""} />
        </p>

        {/* <p>{emailData.inbox[0].email.text}</p> */}
        <hr />
        <ul>
          <li>Previous message: N/A</li>
        </ul>
      </div>
    </PepemailItemSC>
  );
};

export default PepemailItem;
