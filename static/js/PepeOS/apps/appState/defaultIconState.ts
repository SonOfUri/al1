import InternetExplorer from "../InternetExplorer";
import Minesweeper from "../Minesweeper";
import ErrorBox from "../ErrorBox/ErrorBox";
import MyComputer from "../MyPepes";
import Notepad from "../Notepepe";
import Winamp from "../Wenpamp";
import Paint from "../PepePaint";
import mine from "@assets/pepeOS-icons/memesweeper.png";
import error from "@assets/windowsIcons/897(16x16).png";
import pepemailIcon from "@assets/pepeOS-icons/Mail.png";
import notepad from "@assets/pepeOS-icons/notepepe.png";
import notepadLarge from "@assets/pepeOS-icons/notepepe.png";
import winamp from "@assets/windowsIcons/winamp.png";
import paintLarge from "@assets/pepeOS-icons/paint.png";
import Pepemail from "../Pepemail";
import pepeExplorerIcon from "@assets/pepeOS-icons/Pepe_Explorer.png";
import messengerIcon from "@assets/webp//messenger_ui/pepe_messenger.webp";
import myPepesIcon from "@assets/pepeOS-icons/Computer.png";
import uniswapLogo from "@assets/svg/uniswap.svg";
import Uniswap from "../Uniswap";
import Frogger from "../Frogger/Frogger";

import dextoolsIcon from "@assets/png/dextools.png";
import twitterLogo from "@assets/webp/x.webp";
import telegramLogo from "@assets/png/telegram.png";
import froggerIcon from "@assets/games/frogger.png";

import cncIcon from "@assets/games/pokemon_clover.webp";
import Messenger from "../Messenger";
import RedAlert from "../RedAlert";
import Zuma from "../Zuma";
import zumaIcon from "@assets/games/zuma.webp";
import GTA1 from "../GTA1";
import GtaIcon from "@assets/games/gta1.jpeg";
import BasedFarm from "../BasedFarm";
import basedIcon from "@assets/webp/pepe_black.webp";
import kekbotLogo from "@assets/webp/kekbot.webp";

const gen = () => {
  let id = -1;
  return () => {
    id += 1;
    return id;
  };
};

const genId = gen();

export const defaultIconState = [
  {
    icon: pepeExplorerIcon,
    title: "Pepe Explorer",
    component: InternetExplorer,
    isFocus: false,
  },
  {
    icon: messengerIcon,
    title: "Pepe Messenger",
    component: Messenger,
    isFocus: false,
  },
  // {
  //   icon: myPepesIcon,
  //   title: "My Pepes",
  //   component: MyComputer,
  //   isFocus: false,
  // },
  {
    icon: basedIcon,
    title: "Based Farm",
    component: BasedFarm,
    isFocus: false,
  },
  // {
  //   icon: claimsLogo,
  //   title: "Merry Kekmas",
  //   component: ChristmasClaims,
  //   isFocus: false,
  // },
  {
    icon: kekbotLogo,
    title: "Kek Bot",
    component: Uniswap,
    isFocus: false,
    url: "https://kek.bot",
  },
  {
    icon: dextoolsIcon,
    title: "Dextools",
    component: Uniswap,
    isFocus: false,
    url: "https://www.dextools.io/app/en/ether/pair-explorer/0xddd23787a6b80a794d952f5fb036d0b31a8e6aff",
  },
  {
    icon: uniswapLogo,
    title: "Uniswap",
    component: Uniswap,
    isFocus: false,
    url: "https://app.uniswap.org/tokens/ethereum/0xa9e8acf069c58aec8825542845fd754e41a9489a",
  },
  {
    icon: twitterLogo,
    title: "X.com",
    component: Uniswap,
    isFocus: false,
    url: "https://x.com/pepecoins",
  },
  {
    icon: telegramLogo,
    title: "Telegram",
    component: Uniswap,
    isFocus: false,
    url: "https://t.me/pepecoins",
  },
  {
    icon: pepemailIcon,
    title: "Pepemail",
    component: Pepemail,
    isFocus: false,
  },
  {
    icon: notepadLarge,
    title: "Notepepe",
    component: Notepad,
    isFocus: false,
  },
  {
    icon: winamp,
    title: "Wenpamp",
    component: Winamp,
    isFocus: false,
  },
  {
    icon: paintLarge,
    title: "Pepe Paint",
    component: Paint,
    isFocus: false,
  },
  {
    icon: mine,
    title: "Memesweeper",
    component: Minesweeper,
    isFocus: false,
  },
  {
    icon: zumaIcon,
    title: "Zuma Deluxe",
    component: Zuma,
    isFocus: false,
    mobileHidden: false,
  },
  {
    icon: froggerIcon,
    title: "Frogger",
    component: Frogger,
    isFocus: false,
    mobileHidden: true,
  },

  // {
  //   icon: cncIcon,
  //   title: "Pokémon Clover",
  //   component: RedAlert,
  //   isFocus: false,
  //   mobileHidden: true,
  // },
  {
    icon: GtaIcon,
    title: "Grand Theft Auto 1",
    component: GTA1,
    isFocus: false,
    mobileHidden: true,
  },
].map((item) => ({ ...item, id: genId() }));
