import { useEffect } from "react";
import { useCanMessage } from "@xmtp/react-sdk";
import debounce from "lodash/debounce";
import {
  TETHAddress,
  isEnsName,
  isValidLongWalletAddress,
  throttledFetchEnsAddress,
  throttledFetchEnsName,
} from "../helpers";

import {
  setRecipientAddress,
  setRecipientAvatar,
  setRecipientName,
  setRecipientOnNetwork,
  setRecipientState,
} from "../store/xmtp/xmtp.slice";
import { TRootState } from "@store/index";
import { useDispatch, useSelector } from "react-redux";

/**
 * Hook to manage the state of the recipient address input
 *
 * DO NOT RENDER THIS HOOK MORE THAN ONCE
 */
export const useAddressInput = () => {
  const { canMessage } = useCanMessage();
  const dispatch = useDispatch();
  const recipientInput = useSelector(
    (state: TRootState) => state.xmtpSlice.recipientInput
  );
  const recipientAddress = useSelector(
    (state: TRootState) => state.xmtpSlice.recipientAddress
  );
  const recipientName = useSelector(
    (state: TRootState) => state.xmtpSlice.recipientName
  );
  const recipientAvatar = useSelector(
    (state: TRootState) => state.xmtpSlice.recipientAvatar
  );
  const recipientOnNetwork = useSelector(
    (state: TRootState) => state.xmtpSlice.recipientOnNetwork
  );

  /**
   * When the recipient address is updated with a valid address, fetch the
   * recipient's name and avatar if necessary, then verify the address is
   * on the network
   */
  useEffect(() => {
    const fetchAddressIdentity = async () => {
      // must have a valid recipient address
      if (recipientAddress) {
        // no name
        if (!recipientName) {
          dispatch(setRecipientState("loading"));
          // check for name
          const name = await throttledFetchEnsName({
            address: recipientAddress,
          });
          dispatch(setRecipientName(name));
        }
        // no avatar
        if (!recipientAvatar && recipientName) {
          dispatch(setRecipientState("loading"));
          const avatar = `https://effigy.im/a/${recipientName}.svg`;
          dispatch(setRecipientAvatar(avatar));
        }
        // make sure we can message the recipient
        if (!recipientOnNetwork) {
          dispatch(setRecipientState("loading"));

          const validRecipient = await canMessage(recipientAddress);

          if (validRecipient) {
            dispatch(setRecipientOnNetwork(true));
          } else {
            dispatch(setRecipientOnNetwork(false));
          }
        }
        dispatch(setRecipientState("valid"));
      }
    };
    void fetchAddressIdentity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipientAddress]);

  /**
   * When the recipient input changes, check for a valid ETH address, ENS name,
   * and update the recipient address accordingly
   */
  useEffect(() => {
    const validateAddress = debounce(async () => {
      try {
        // input is a valid ETH address
        if (isValidLongWalletAddress(recipientInput)) {
          // Ensure the address starts with '0x'
          const address: TETHAddress = recipientInput.startsWith("0x")
            ? recipientInput
            : `0x${recipientInput}`;

          dispatch(setRecipientAddress(address));
        } else if (isEnsName(recipientInput)) {
          dispatch(setRecipientState("loading"));
          // fetch ens address
          const address = await throttledFetchEnsAddress({
            name: recipientInput,
          });
          if (address) {
            // Ensure the address starts with '0x'
            const ethAddress: TETHAddress = (
              address.startsWith("0x") ? address : `0x${address}`
            ) as TETHAddress;

            dispatch(setRecipientAddress(ethAddress));
            dispatch(setRecipientName(recipientInput));
          }
        }
      } catch {
        dispatch(setRecipientState("error"));
      }
    }, 500);
    void validateAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipientInput]);
};
