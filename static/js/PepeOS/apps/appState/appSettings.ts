// appSettings.ts
import winamp from "@assets/windowsIcons/winamp.png";
import { isMobile } from "@PepeOS/constants";
import myPepesIcon from "@assets/pepeOS-icons/Computer.png";
import uniswapLogo from "@assets/svg/uniswap.svg";
import pepeExplorerIcon from "@assets/pepeOS-icons/Pepe_Explorer.png";
import cncIcon from "@assets/games/pokemon_clover.webp";
import Pepemail from "@PepeOS/apps/Pepemail";
import pepemailIcon from "@assets/pepeOS-icons/Mail.png";
import paintLarge from "@assets/pepeOS-icons/paint.png";
import notepad from "@assets/pepeOS-icons/notepepe.png";
import messengerIcon from "@assets/webp//messenger_ui/pepe_messenger.webp";
import mine from "@assets/pepeOS-icons/memesweeper.png";
import froggerIcon from "@assets/games/frogger.png";
import error from "@assets/windowsIcons/897(16x16).png";
import dextoolsIcon from "@assets/png/dextools.png";
import zumaIcon from "@assets/games/zuma.webp";
import GtaIcon from "@assets/games/gta1.jpeg";
import { EAppKeys } from "./EAppKeys";
import basedIcon from "@assets/webp/pepe_black.webp";
import kekbotLogo from "@assets/webp/kekbot.webp";
import claimsLogo from "@assets/webp/christmas/green_gift.webp";
import computerIcon from "@assets/pepeOS-icons/Computer.png";
// Utility function to generate unique IDs
const gen = () => {
  let id = -1;
  return () => {
    id += 1;
    return id;
  };
};

const genId = gen();
const genIndex = gen();

// Function to initialize app settings with dynamically imported components
export const initializeAppSettings = async () => {
  const [
    PepeOSTour,
    Messenger,
    MyComputer,
    Uniswap,
    Error,
    Winamp,
    Paint,
    Notepad,
    MineSweeper,
    Frogger,
    InternetExplorer,
    RedAlert,
    Zuma,
    GTA1,
    BasedFarm,
    ChristmasClaims,
    UserPreferences,
  ] = await Promise.all([
    import("@PepeOS/apps/Tour").then((mod) => mod.default),
    import("@PepeOS/apps/Messenger").then((mod) => mod.default),
    import("@PepeOS/apps/MyPepes").then((mod) => mod.default),
    import("@PepeOS/apps/Uniswap").then((mod) => mod.default),
    import("@PepeOS/apps/ErrorBox/ErrorBox").then((mod) => mod.default),
    import("@PepeOS/apps/Wenpamp").then((mod) => mod.default),
    import("@PepeOS/apps/PepePaint").then((mod) => mod.default),
    import("@PepeOS/apps/Notepepe").then((mod) => mod.default),
    import("@PepeOS/apps/Minesweeper").then((mod) => mod.default),
    import("@PepeOS/apps/Frogger").then((mod) => mod.default),
    import("@PepeOS/apps/InternetExplorer").then((mod) => mod.default),
    import("@PepeOS/apps/RedAlert").then((mod) => mod.default),
    import("../Zuma").then((mod) => mod.default),
    import("../GTA1/GTA1").then((mod) => mod.default),
    import("@PepeOS/apps/BasedFarm").then((mod) => mod.default),
    import("@PepeOS/apps/ChristmasClaims").then((mod) => mod.default),
    import("@PepeOS/apps/UserPreferences").then((mod) => mod.default),
  ]);

  return {
    [EAppKeys.Tour]: {
      header: {
        icon: pepeExplorerIcon,
        title: "Tour PepeOS",
      },
      defaultSize: {
        width: isMobile ? "100%" : 1000,
        height: 620,
      },
      defaultOffset: {
        x: 0,
        y: 0,
      },
      resizable: true,
      minimized: false,
      maximized: window.innerWidth < 1000,
      multiInstance: true,
      id: genId(),
      zIndex: genIndex(),
      component: PepeOSTour,
    },
    [EAppKeys.Messenger]: {
      header: {
        icon: messengerIcon,
        title: "Pepe Messenger",
      },
      defaultSize: {
        width: isMobile ? "100%" : 460,
        height: 640,
      },
      defaultOffset: {
        x: 0,
        y: 0,
      },
      resizable: false,
      minimized: isMobile ? true : false,
      maximized: false,
      multiInstance: false,
      id: genId(),
      zIndex: genIndex(),
      component: Messenger,
    },
    [EAppKeys.Explorer]: {
      header: {
        icon: pepeExplorerIcon,
        title: "Pepe Explorer",
      },
      defaultSize: {
        width: isMobile ? "100%" : 1000,
        height: 720,
      },
      defaultOffset: {
        x: 0,
        y: 0,
      },
      resizable: true,
      minimized: false,
      maximized: window.innerWidth < 1000,
      multiInstance: true,
      id: genId(),
      zIndex: genIndex(),
      component: InternetExplorer,
    },
    [EAppKeys.BasedFarm]: {
      header: {
        icon: basedIcon,
        title: "Based AI Farm",
      },
      defaultSize: {
        width: isMobile ? "100%" : 550,
        height: 635,
      },
      defaultOffset: {
        x: 0,
        y: 0,
      },
      resizable: true,
      minimized: false,
      maximized: window.innerWidth < 1000,
      multiInstance: true,
      id: genId(),
      zIndex: genIndex(),
      component: BasedFarm,
    },
    [EAppKeys.ChristmasClaims]: {
      header: {
        icon: claimsLogo,
        title: "Merry Kekmas",
      },
      defaultSize: {
        width: isMobile ? 350 : 797,
        height: isMobile ? 225 : 476,
      },
      defaultOffset: {
        x: 0,
        y: 0,
      },
      resizable: false,
      minimized: false,
      maximized: false,
      multiInstance: false,
      id: genId(),
      zIndex: genIndex(),
      component: ChristmasClaims,
    },
    [EAppKeys.Memesweeper]: {
      header: {
        icon: mine,
        title: "Memesweeper",
      },
      defaultSize: {
        width: 169,
        height: 253,
      },
      defaultOffset: {
        x: 40,
        y: 40,
      },
      resizable: false,
      minimized: false,
      maximized: false,
      multiInstance: true,
      id: genId(),
      zIndex: genIndex(),
      component: MineSweeper,
      className: "memesweeper-container",
    },
    [EAppKeys.Error]: {
      header: {
        icon: error,
        title: "C:\\",
        buttons: ["close"],
        noFooterWindow: true,
      },
      defaultSize: {
        width: 380,
        height: 0,
      },
      defaultOffset: {
        x: 0,
        y: 0,
      },
      resizable: false,
      minimized: false,
      maximized: false,
      multiInstance: true,
      id: genId(),
      zIndex: genIndex(),
      component: Error,
    },
    [EAppKeys.Pepemail]: {
      header: {
        icon: pepemailIcon,
        title: "Inbox - Pepemail",
      },
      defaultSize: {
        width: isMobile ? "100%" : 1000,
        height: 620,
      },
      defaultOffset: {
        x: 0,
        y: 0,
      },
      resizable: true,
      minimized: false,
      maximized: window.innerWidth < 1000,
      multiInstance: false,
      id: genId(),
      zIndex: genIndex(),
      component: Pepemail,
    },
    [EAppKeys.Wallet]: {
      header: {
        icon: myPepesIcon,
        title: "My Pepes (Wallet)",
      },
      defaultSize: {
        width: isMobile ? "100%" : 1000,
        height: 620,
      },
      defaultOffset: {
        x: 0,
        y: 0,
      },
      resizable: true,
      minimized: false,
      maximized: window.innerWidth < 1000,
      multiInstance: false,
      id: genId(),
      zIndex: genIndex(),
      component: MyComputer,
    },
    [EAppKeys.Notepepe]: {
      header: {
        icon: notepad,
        title: "Untitled - Notepepe",
      },
      defaultSize: {
        width: 660,
        height: 500,
      },
      defaultOffset: {
        x: 0,
        y: 0,
      },
      resizable: true,
      minimized: false,
      maximized: isMobile,
      multiInstance: true,
      id: genId(),
      zIndex: genIndex(),
      component: Notepad,
    },
    [EAppKeys.Wenpamp]: {
      header: {
        icon: winamp,
        title: "Wenpamp",
        invisible: true,
      },
      defaultSize: {
        width: 0,
        height: 0,
      },
      defaultOffset: {
        x: 50,
        y: 50,
      },
      resizable: false,
      minimized: false,
      maximized: false,
      multiInstance: false,
      id: genId(),
      zIndex: genIndex(),
      component: Winamp,
    },
    [EAppKeys.PepePaint]: {
      header: {
        icon: paintLarge,
        title: "Untitled - Pepe Paint",
      },
      defaultSize: {
        width: 660,
        height: 500,
      },
      defaultOffset: {
        x: 0,
        y: 0,
      },
      resizable: true,
      minimized: false,
      maximized: isMobile,
      multiInstance: true,
      id: genId(),
      zIndex: genIndex(),
      component: Paint,
    },
    [EAppKeys.Uniswap]: {
      header: {
        icon: uniswapLogo,
        title: "Uniswap",
      },
      defaultSize: {
        width: isMobile ? "100%" : 500,
        height: 600,
      },
      defaultOffset: {
        x: 0,
        y: 0,
      },
      resizable: true,
      minimized: false,
      maximized: isMobile,
      multiInstance: true,
      id: genId(),
      zIndex: genIndex(),
      component: Uniswap,
    },
    [EAppKeys.Dextools]: {
      header: {
        icon: dextoolsIcon,
        title: "Dextools",
      },
      defaultSize: {
        width: isMobile ? "100%" : 500,
        height: 600,
      },
      defaultOffset: {
        x: 0,
        y: 0,
      },
      resizable: true,
      minimized: false,
      maximized: isMobile,
      multiInstance: true,
      id: genId(),
      zIndex: genIndex(),
      component: Uniswap,
    },
    [EAppKeys.KekBot]: {
      header: {
        icon: kekbotLogo,
        title: "Kek Bot",
      },
      defaultSize: {
        width: isMobile ? "100%" : 500,
        height: 600,
      },
      defaultOffset: {
        x: 0,
        y: 0,
      },
      resizable: true,
      minimized: false,
      maximized: isMobile,
      multiInstance: true,
      id: genId(),
      zIndex: genIndex(),
      component: Uniswap,
    },
    [EAppKeys.Frogger]: {
      header: {
        icon: froggerIcon,
        title: "Frogger",
      },
      defaultSize: {
        width: isMobile ? "100%" : 625,
        height: 530,
      },
      defaultOffset: {
        x: 0,
        y: 0,
      },
      resizable: true,
      minimized: false,
      maximized: isMobile,
      multiInstance: false,
      id: genId(),
      zIndex: genIndex(),
      component: Frogger,
    },
    [EAppKeys.Zuma]: {
      header: {
        icon: zumaIcon,
        title: "Zuma Deluxe",
      },
      defaultSize: {
        width: isMobile ? "100%" : 730,
        height: 560,
      },
      defaultOffset: {
        x: 0,
        y: 0,
      },
      resizable: true,
      minimized: false,
      maximized: isMobile,
      multiInstance: false,
      id: genId(),
      zIndex: genIndex(),
      component: Zuma,
    },
    // [EAppKeys.RedAlert]: {
    //   header: {
    //     icon: cncIcon,
    //     title: "Pokémon Clover",
    //   },
    //   defaultSize: {
    //     width: isMobile ? "100%" : 605,
    //     height: 500,
    //   },
    //   defaultOffset: {
    //     x: 0,
    //     y: 0,
    //   },
    //   resizable: true,
    //   minimized: false,
    //   maximized: false,
    //   multiInstance: false,
    //   id: genId(),
    //   zIndex: genIndex(),
    //   component: RedAlert,
    // },
    [EAppKeys.GTA1]: {
      header: {
        icon: GtaIcon,
        title: "Grand Theft Auto 1",
      },
      defaultSize: {
        width: isMobile ? "100%" : 605,
        height: 500,
      },
      defaultOffset: {
        x: 0,
        y: 0,
      },
      resizable: true,
      minimized: false,
      maximized: false,
      multiInstance: false,
      id: genId(),
      zIndex: genIndex(),
      component: GTA1,
    },
    [EAppKeys.UserPreferences]: {
      header: {
        icon: computerIcon,
        title: "User Preferences",
      },
      defaultSize: {
        width: isMobile ? "100%" : 500,
        height: isMobile ? 480 : 530,
      },
      defaultOffset: {
        x: 0,
        y: 0,
      },
      resizable: false,
      minimized: false,
      maximized: false,
      multiInstance: false,
      id: genId(),
      zIndex: genIndex(),
      component: UserPreferences,
    },
  };
};
