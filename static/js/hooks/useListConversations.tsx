import { useConversations } from "@xmtp/react-sdk";
import { useEffect } from "react";

import { setLoadingConversations } from "../store/xmtp/xmtp.slice";
import { useDispatch, useSelector } from "react-redux";
import { TRootState } from "@store/index";

const useListConversations = () => {
  const dispatch = useDispatch();
  const isLoadingConversations = useSelector(
    (state: TRootState) => state.xmtpSlice.loadingConversations
  );

  useEffect(() => {
    if (
      "Notification" in window &&
      window.Notification.permission === "default"
    ) {
      void window.Notification.requestPermission();
    }
  }, []);

  const { conversations, isLoaded, isLoading, error } = useConversations();

  useEffect(() => {
    dispatch(setLoadingConversations(isLoading));
  }, [isLoading, dispatch]);

  return {
    conversations,
    error,
    isLoaded,
    isLoading: isLoadingConversations,
  };
};

export default useListConversations;
