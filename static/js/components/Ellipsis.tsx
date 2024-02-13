import React, { FC, useEffect, useState } from "react";

interface EllipsisProps {
  duration?: number;
}

const Ellipsis: FC<EllipsisProps> = ({ duration = 500 }) => {
  const [ellipsis, setEllipsis] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      setEllipsis((prevEllipsis) => {
        if (prevEllipsis.length < 3) {
          return prevEllipsis + ".";
        } else {
          clearInterval(interval);
          return "... OK";
        }
      });
    }, duration / 3);

    return () => clearInterval(interval);
  }, [duration]);

  return <>{ellipsis}</>;
};

export default Ellipsis;
