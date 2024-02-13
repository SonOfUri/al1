import { API_FETCH_THROTTLE } from "./constants";
import { memoizeThrottle } from "./functions";
import { AlchemyProvider } from "ethers";

export type TETHAddress = `0x${string}`;

const provider = new AlchemyProvider(
  "mainnet",
  process.env.REACT_APP_ALCHEMY_KEY
);

export const truncate = (str: string | undefined, length: number): string => {
  if (!str) {
    return "";
  }
  if (str.length > length) {
    return `${str.substring(0, length - 3)}...`;
  }
  return str;
};

export const formatDate = (d: Date | undefined): string =>
  d ? d.toLocaleDateString("en-US") : "";

export const formatTime = (d: Date | undefined): string =>
  d
    ? d
        .toLocaleTimeString(undefined, {
          hour12: true,
          hour: "numeric",
          minute: "2-digit",
        })
        // ICU 72.1 may use different unicode space characters
        .replace(/\u202f|\u2009/g, " ")
    : "";

const getMinimumNameLength = (suffixes: string[]) =>
  suffixes.reduce((result, suffix) => Math.min(result, suffix.length), 0);

// ENS names can use domains TLDs
export const isEnsName = (value: string): boolean => {
  // value must have a minimum length and contain a dot
  if (value.length < 3 || !value.includes(".")) {
    return false;
  }
  return true;
};

// export const throttledFetchEnsAddress = memoizeThrottle(
//   fetchEnsAddress,
//   API_FETCH_THROTTLE,
//   undefined,
//   ({ name }) => name
// );

export const throttledFetchEnsAddress = memoizeThrottle(
  async ({ name }) => await provider.resolveName(name),
  API_FETCH_THROTTLE,
  undefined,
  ({ name }) => name
);

// export const throttledFetchEnsName = memoizeThrottle(
//   fetchEnsName,
//   API_FETCH_THROTTLE,
//   undefined,
//   ({ address }) => address
// );

export const throttledFetchEnsName = memoizeThrottle(
  async ({ address }) => await provider.lookupAddress(`${address as string}`),
  API_FETCH_THROTTLE,
  undefined,
  ({ address }) => address
);

// export const throttledFetchEnsAvatar = memoizeThrottle(
//   fetchEnsAvatar,
//   API_FETCH_THROTTLE,
//   undefined,
//   ({ name }) => name
// );

const fetchAddressName = async (address: TETHAddress) => {
  let name = await throttledFetchEnsName({ address });
  return name;
};

export const throttledFetchAddressName = memoizeThrottle(
  fetchAddressName,
  API_FETCH_THROTTLE
);

export const isValidLongWalletAddress = (
  address: string
): address is TETHAddress => address.startsWith("0x") && address.length === 42;

export const isValidRecipientAddressFormat = (address: string) =>
  isEnsName(address) || isValidLongWalletAddress(address);

export const shortAddress = (address: string): string =>
  isValidLongWalletAddress(address)
    ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
    : address;
