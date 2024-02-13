import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { EPageLoadingState } from "../../../App";
import { setBootState } from "@store/userInterface/userInterface";
import { BlinkingCursor } from "../BootScreen.styled";

const PressEnter: FC = () => {
  const dispatch = useDispatch();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined = undefined;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown(countdown - 1), 1000);
    } else {
      dispatch(setBootState(EPageLoadingState.Splash));
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [countdown, dispatch]);

  return (
    <p className="press-enter">
      Press <strong>ANY KEY</strong> to enter PEPECOIN ({countdown})
      <BlinkingCursor> _</BlinkingCursor>
    </p>
  );
};

export default PressEnter;
