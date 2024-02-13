import React, { FC } from "react";
import { DateDividerSC } from "./DateDivider.styled";
import { useTranslation } from "react-i18next";

type TDateDivider = {
  date: Date;
};

const DateDivider: FC<TDateDivider> = ({ date }) => {
  const { t } = useTranslation();
  return (
    <DateDividerSC>
      <div />
      <span>{t("{{date, long_date}}", { date })}</span>
      <div />
    </DateDividerSC>
  );
};

export default DateDivider;
