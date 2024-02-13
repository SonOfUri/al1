import type { TRecipientState } from "@store/xmtp/xmtp.slice";

export const getRecipientInputSubtext = (
  recipientInput: string,
  recipientAddress: string | null,
  recipientState: TRecipientState,
  recipientOnNetwork: boolean
) => {
  if (!recipientInput) {
    return "messages.address_field_prompt";
  }

  // valid address, but not on network
  if (recipientAddress && !recipientOnNetwork) {
    return "messages.address_field_not_on_network";
  }

  switch (recipientState) {
    case "invalid":
      return "messages.address_field_invalid";
    case "loading":
      return "messages.address_field_loading";
    // no default
  }
  return undefined;
};
