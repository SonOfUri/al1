import React, { FC, useState } from "react";
import { MailFoldersSC } from "../Pepemail.styled";

const folders = ["Inbox", "Outbox", "Sent Items", "Deleted Items", "Drafts"];

const MailFolders: FC = () => {
  const [selectedFolder, setSelectedFolder] = useState(folders[0]);

  const handleFolderClick = (folder: string) => {
    setSelectedFolder(folder);
  };

  return (
    <MailFoldersSC>
      <div className="header">Folders</div>
      <div className="mail-folders-body inset-border">
        <ul className="tree-view">
          <li>
            <details open>
              <summary>Local Folders</summary>
              <ul>
                {folders.map((folder) => (
                  <li
                    key={folder}
                    onClick={() => handleFolderClick(folder)}
                    className={selectedFolder === folder ? "selected" : ""}
                  >
                    {folder}
                  </li>
                ))}
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </MailFoldersSC>
  );
};

export default MailFolders;
