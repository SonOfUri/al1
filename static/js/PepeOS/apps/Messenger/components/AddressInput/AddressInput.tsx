import React, { FC } from "react";
import { AddressInputSC } from "./AddressInput.styled";
import { useTranslation } from "react-i18next";
import { TRootState } from "@store/index";
import { useSelector } from "react-redux";

type TAddressInput = {
  /**
   * What, if any, resolved address is there?
   */
  resolvedAddress?: {
    displayAddress: string;
    walletAddress?: string;
  };
  /**
   * What, if any, subtext is there?
   */
  subtext?: string;
  /**
   * What are the props associated with the avatar?
   */
  avatarUrlProps?: {
    // Is the avatar url loading?
    isLoading?: boolean;
    // What's the address of this wallet?
    address?: string;
  };
  /**
   * What happens on a submit?
   */
  onChange?: (value: string) => void;
  /**
   * Upon submit, has there been an error?
   */
  isError?: boolean;
  /**
   * Upon submit, is something loading?
   */
  isLoading?: boolean;
  /**
   * Is there a tooltip click event that needs to be handled?
   */
  onTooltipClick?: () => void;
  /**
   * Input Value
   */
  value?: string;
  /**
   * Is there a left icon click event that needs to be handled?
   */
  onLeftIconClick?: () => void;

  onStartChat?: () => void;
};

const AddressInput: FC<TAddressInput> = ({
  onChange,
  value,
  onStartChat,
  isLoading,
}) => {
  const { t } = useTranslation();

  const recipientState = useSelector(
    (state: TRootState) => state.xmtpSlice.recipientState
  );

  return (
    <AddressInputSC>
      <form onSubmit={(e) => e.preventDefault()}>
        <h4>{t("common.input_label")}:</h4>
        <div className="input__search">
          <input
            tabIndex={0}
            id="address"
            type="search"
            spellCheck="false"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            placeholder="Search user by 0x wallet or ENS name"
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            onChange={(e) =>
              onChange && onChange((e.target as HTMLInputElement).value)
            }
            value={value}
          />
          <button
            type="submit"
            onClick={onStartChat}
            disabled={recipientState !== "valid"}
          >
            {isLoading ? "Checking" : "Create Chat"}
          </button>
        </div>
      </form>
    </AddressInputSC>
  );
};

export default AddressInput;
