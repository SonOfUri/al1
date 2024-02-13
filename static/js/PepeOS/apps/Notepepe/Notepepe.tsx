import React, { useState, KeyboardEvent, ChangeEvent } from "react";
import styled from "styled-components";
import WindowDropDowns from "@components/WindowDropDowns";
import dropDownData from "./dropDownData";

interface NotepadProps {
  onClose: () => void;
}

const Notepepe: React.FC<NotepadProps> = ({ onClose }) => {
  const [docText, setDocText] = useState<string>("");
  const [wordWrap, setWordWrap] = useState<boolean>(false);

  const onClickOptionItem = (item: string) => {
    switch (item) {
      case "Exit":
        onClose();
        break;
      case "Word Wrap":
        setWordWrap(!wordWrap);
        break;
      case "Time/Date":
        const date = new Date();
        setDocText(
          `${docText}${date.toLocaleTimeString()} ${date.toLocaleDateString()}`
        );
        break;
      default:
    }
  };

  const onTextAreaKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      setDocText(`${docText.substring(0, start)}\t${docText.substring(end)}`);
      requestAnimationFrame(() => {
        if (start !== null) {
          e.currentTarget.selectionStart = start + 1;
          e.currentTarget.selectionEnd = start + 1;
        }
      });
    }
  };

  const onTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDocText(e.target.value);
  };

  return (
    <Div>
      <section className="np__toolbar">
        <WindowDropDowns items={dropDownData} onClickItem={onClickOptionItem} />
      </section>
      <StyledTextarea
        wordWrap={wordWrap}
        value={docText}
        onChange={onTextChange}
        onKeyDown={onTextAreaKeyDown}
        spellCheck={false}
      />
    </Div>
  );
};

export default Notepepe;

type TStyledTextareaProps = {
  wordWrap: boolean;
};

const Div = styled.div`
  height: 100%;
  background: linear-gradient(to right, #edede5 0%, #ede8cd 100%);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  .np__toolbar {
    position: relative;
    height: 21px;
    flex-shrink: 0;
    border-bottom: 1px solid white;
  }
`;

const StyledTextarea = styled.textarea<TStyledTextareaProps>`
  flex: auto;
  outline: none;
  font-family: "Lucida Console", monospace;
  font-size: 13px;
  line-height: 14px;
  resize: none;
  padding: 2px;
  ${(props) =>
    props.wordWrap ? "" : "white-space: nowrap; overflow-x: scroll;"}
  overflow-y: scroll;
  border: 1px solid #96abff;
`;
