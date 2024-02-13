import empty from "@assets/empty.png";
import keyboard from "@assets/windowsIcons/58(16x16).png";
import cmd from "@assets/windowsIcons/56(16x16).png";
import calculator from "@assets/windowsIcons/74(16x16).png";
import utility from "@assets/windowsIcons/119(16x16).png";
import volume from "@assets/windowsIcons/120(16x16).png";
import wordPad from "@assets/windowsIcons/153(16x16).png";
import winExplorer from "@assets/windowsIcons/156(16x16).png";
import MSN from "@assets/windowsIcons/159(16x16).png";
import sync from "@assets/windowsIcons/182(16x16).png";
import security from "@assets/windowsIcons/214(16x16).png";
import accessibility from "@assets/windowsIcons/238(16x16).png";
import connection from "@assets/windowsIcons/309(16x16).png";
import notepad from "@assets/pepeOS-icons/notepepe.png";
import menu from "@assets/windowsIcons/358(16x16).png";
import transfer from "@assets/windowsIcons/367(16x16).png";
import catalog from "@assets/windowsIcons/392(16x16).png";
import info from "@assets/windowsIcons/505(16x16).png";
import address from "@assets/windowsIcons/554(16x16).png";
import painter from "@assets/pepeOS-icons/paint.png";
import sound from "@assets/windowsIcons/690(16x16).png";
import recent from "@assets/windowsIcons/716(16x16).png";
import compatibility from "@assets/windowsIcons/747(16x16).png";
import magnifier from "@assets/windowsIcons/817(16x16).png";
import mediaPlayer from "@assets/pepeOS-icons/Pepe_DJ1.png";
import tour from "@assets/windowsIcons/853(32x32).png";
import outlook from "@assets/pepeOS-icons/Mail.png";
import ie from "@assets/pepeOS-icons/Pepe_Explorer.png";
import messenger from "@assets/webp//messenger_ui/pepe_messenger.webp";
import narrator from "@assets/windowsIcons/narrator.ico";
import mine from "@assets/pepeOS-icons/memesweeper.png";
import { TMenuItem } from "@components/SubMenu";
import gamesIcon from "@assets/pepeOS-icons/Games_2.png";
import RedAlert from "@assets/games/pokemon_clover.webp";

// game icons

import froggerIcon from "@assets/games/frogger.png";

export const MyRecentDocuments = [
  {
    type: "item",
    icon: empty,
    text: "(Empty)",
  },
];
export const ConnectTo = [
  {
    type: "item",
    icon: MSN,
    text: "MSN",
  },
  {
    type: "item",
    icon: connection,
    text: "Show all connections",
  },
];
export const AllPrograms: TMenuItem[] = [
  // {
  //   type: "item",
  //   icon: access,
  //   text: "Set Program Access and Defaults",
  // },
  {
    type: "item",
    icon: catalog,
    text: "Pepe Catalog",
  },
  // {
  //   type: "item",
  //   icon: update,
  //   text: "Pepe Update",
  // },
  {
    type: "separator",
  },
  {
    type: "menu",
    icon: menu,
    text: "Accessories",
    items: [
      // {
      //   type: "menu",
      //   icon: menu,
      //   text: "Accessibility",
      //   bottom: "initial",
      //   items: [
      //     {
      //       type: "item",
      //       icon: accessibility,
      //       text: "Accessibility Wizard",
      //     },
      //     {
      //       type: "item",
      //       icon: magnifier,
      //       text: "Magnifier",
      //     },
      //     {
      //       type: "item",
      //       icon: narrator,
      //       text: "Narrator",
      //     },
      //     {
      //       type: "item",
      //       icon: keyboard,
      //       text: "On-Screen Keyboard",
      //     },
      //     {
      //       type: "item",
      //       icon: utility,
      //       text: "Utility Manager",
      //     },
      //   ],
      // },
      {
        type: "menu",
        icon: menu,
        text: "Entertainment",
        bottom: "initial",
        items: [
          {
            type: "item",
            icon: sound,
            text: "Sound Recorder",
          },
          {
            type: "item",
            icon: volume,
            text: "Volume Control",
          },
          // {
          //   type: "item",
          //   icon: mediaPlayer,
          //   text: "Pepe.DJ",
          // },
        ],
      },
      {
        type: "menu",
        icon: menu,
        text: "PepeCoin Tools",
        bottom: "initial",
        items: [
          {
            type: "item",
            icon: transfer,
            text: "Files and Settings Transfer Wizard",
          },
          {
            type: "item",
            icon: recent,
            text: "Scheduled Tasks",
          },
          {
            type: "item",
            icon: security,
            text: "Security Center",
          },
          {
            type: "item",
            icon: info,
            text: "System Information",
          },
        ],
      },
      {
        type: "item",
        icon: address,
        text: "Address Book",
      },
      {
        type: "item",
        icon: cmd,
        text: "Command Prompt",
      },
      {
        type: "item",
        icon: notepad,
        text: "Notepepe",
      },
      {
        type: "item",
        icon: painter,
        text: "Pepe Paint",
      },
      {
        type: "item",
        icon: compatibility,
        text: "Mint Eligibility Wizard",
      },
      {
        type: "item",
        icon: tour,
        text: "Tour Pepe 16",
      },
    ],
  },
  {
    type: "menu",
    icon: gamesIcon,
    text: "Games",
    items: [
      {
        type: "item",
        icon: mine,
        text: "Memesweeper",
      },
      {
        type: "item",
        icon: froggerIcon,
        text: "Frogger",
        mobileHidden: true,
      },

      // {
      //   type: "item",
      //   icon: RedAlert,
      //   text: "Pokémon Clover",
      //   mobileHidden: true,
      // },
    ],
  },
  {
    type: "item",
    icon: ie,
    text: "Pepe Explorer",
  },
  {
    type: "item",
    icon: outlook,
    text: "Pepemail",
  },
  // {
  //   type: "item",
  //   icon: mediaPlayer,
  //   text: "Pepe.DJ",
  // },
  {
    type: "item",
    icon: messenger,
    text: "Pepe Messenger",
  },
];

export default {
  AllPrograms,
};
