const ENCODING = "binary";

const env = "production";

export const buildLocalStorageKey = (walletAddress?: string) =>
  walletAddress ? `xmtp:${env}:keys:${walletAddress}` : "";

export const loadKeys = (walletAddress?: string): Uint8Array | undefined => {
  const val = localStorage.getItem(buildLocalStorageKey(walletAddress));
  return val ? Buffer.from(val, ENCODING) : undefined;
};

export const storeKeys = (walletAddress: string, keys: Uint8Array) => {
  localStorage.setItem(
    buildLocalStorageKey(walletAddress),
    Buffer.from(keys).toString(ENCODING)
  );
};

export const wipeKeys = (walletAddress: string) => {
  // This will clear the conversation cache + the private keys
  localStorage.removeItem(buildLocalStorageKey(walletAddress));
};
