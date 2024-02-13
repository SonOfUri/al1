export const Links = [
  {
    type: "menu",
    text: "New",
    position: {
      left: "calc(100% - 4px)",
      top: "-3px",
    },
    items: [
      {
        type: "item",
        text: "Window",
        hotkey: "Ctrl+N",
      },
      { type: "separator" },
      {
        type: "item",
        text: "Message",
      },
      {
        type: "item",
        text: "Post",
      },
      {
        type: "item",
        text: "Contact",
      },
      {
        type: "item",
        text: "Internet Call",
      },
    ],
  },
];

const Help = [
  {
    type: "item",
    text: "Contents and Index",
  },
  {
    type: "item",
    text: "Tip of the Day",
  },
  {
    type: "item",
    text: "For Netscape Users",
  },
  {
    type: "item",
    text: "Online Support",
  },
  {
    type: "item",
    text: "Send Feedback",
  },
  {
    type: "separator",
  },
];
export default { Links, Help };
