import React, { useEffect, useRef, FC } from "react";
import Webamp from "webamp";
import { initialTracks } from "./config";
import "./Wenpamp.css";

declare const butterchurn: any;
declare const butterchurnPresets: any;

interface WenpampProps {
  onClose: () => void;
  onMinimize: () => void;
}

const Wenpamp: FC<WenpampProps> = ({ onClose, onMinimize }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const webamp = useRef<Webamp | null>(null);

  useEffect(() => {
    const target = ref.current;
    if (!target) {
      return undefined;
    }

  webamp.current = new Webamp({
    initialTracks,
    __butterchurnOptions: {
      importButterchurn: () => Promise.resolve(butterchurn),
      getPresets: () => {
        const presets = butterchurnPresets.getPresets();
        return Object.keys(presets).map(name => ({
          name,
          butterchurnPresetObject: presets[name],
        }));
      },
      butterchurnOpen: true,
    },
    __initialWindowLayout: {
      main: { position: { x: 0, y: 0 } },
      equalizer: { position: { x: 0, y: 116 } },
      playlist: { position: { x: 0, y: 232 }, size: [0, 4] },
      milkdrop: { position: { x: 275, y: 0 }, size: [7, 12] }
    }
  } as any);
    webamp.current.renderWhenReady(target).then(() => {
      target.appendChild(document.querySelector("#webamp") as Node);
    });
    return () => {
      const webampElement = document.querySelector("#webamp");
      if (webamp.current && webampElement && webampElement.parentNode) {
        webamp.current.dispose();
        webamp.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (webamp.current) {
      webamp.current.onClose(onClose);
      webamp.current.onMinimize(onMinimize);
    }
  }, [onClose, onMinimize]);

  return (
    <div
      style={{ position: "fixed", left: 0, top: 0, right: 0, bottom: 0 }}
      ref={ref}
    />
  );
};

export default Wenpamp;
