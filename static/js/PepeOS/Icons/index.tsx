import React, {
  useState,
  useRef,
  useEffect,
  FC,
  MouseEventHandler,
} from "react";
import styled from "styled-components";

type TIndividualIconProps = {
  title: string;
  onMouseDown?: (id: number) => void;
  onDoubleClick?: (component: React.FC<any>) => void;
  icon: string;
  className?: string;
  id: number;
  component: React.FC<any>;
  measure?: (rect: TRect) => void;
  isFocus?: boolean;
  displayFocus?: boolean;
  url?: string;
  mobileHidden?: boolean;
};

type TIconGroupProps = {
  icons: TIndividualIconProps[];
  onMouseDown: (id: number) => void;
  onDoubleClick: (component: React.FC<any>) => void;
  displayFocus: boolean;
  mouse: { docX: number; docY: number };
  selecting: { x: number; y: number } | null;
  setSelectedIcons: (selectedIds: number[]) => void;
};

type TRect = {
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
};

const useDoubleTap = (onDoubleTap: () => void, delay: number = 300) => {
  const [tap, setTap] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (tap) {
      timer = setTimeout(() => {
        setTap(false);
      }, delay);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [tap, delay]);

  return () => {
    if (!tap) {
      setTap(true);
    } else {
      onDoubleTap();
      setTap(false);
    }
  };
};

const Icons: FC<TIconGroupProps> = ({
  icons,
  onMouseDown,
  onDoubleClick,
  displayFocus,
  mouse,
  selecting,
  setSelectedIcons,
}) => {
  const [iconsRect, setIconsRect] = useState<TRect[]>([]);
  function measure(rect: TRect) {
    if (iconsRect.find((r) => r.id === rect.id)) return;
    setIconsRect((iconsRect) => [...iconsRect, rect]);
  }
  useEffect(() => {
    if (!selecting) return;
    const sx = Math.min(selecting.x, mouse.docX);
    const sy = Math.min(selecting.y, mouse.docY);
    const sw = Math.abs(selecting.x - mouse.docX);
    const sh = Math.abs(selecting.y - mouse.docY);
    const selectedIds = iconsRect
      .filter((rect) => {
        const { x, y, w, h } = rect;
        return x - sx < sw && sx - x < w && y - sy < sh && sy - y < h;
      })
      .map((icon) => icon.id);
    setSelectedIcons(selectedIds);
  }, [iconsRect, setSelectedIcons, selecting, mouse.docX, mouse.docY]);
  return (
    <IconsContainer>
      {icons.map((icon) => (
        <StyledIcon
          key={icon.id}
          {...icon}
          displayFocus={displayFocus}
          onMouseDown={onMouseDown}
          onDoubleClick={onDoubleClick}
          measure={measure}
        />
      ))}
    </IconsContainer>
  );
};

const Icon: FC<TIndividualIconProps> = ({
  title,
  onMouseDown,
  onDoubleClick,
  icon,
  className,
  id,
  component,
  measure,
  url,
  mobileHidden,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const _onMouseDown: MouseEventHandler<HTMLDivElement> = () => {
    if (onMouseDown) {
      onMouseDown(id);
    }
  };
  const onDoubleTap = useDoubleTap(() => {
    if (url) {
      window.open(url, "_blank");
    } else if (onDoubleClick) {
      onDoubleClick(component);
    }
  });

  const _onDoubleClick: MouseEventHandler<HTMLDivElement> = () => {
    if (onDoubleClick) {
      if (url) {
        const newWindow = window.open(url, "_blank");
        if (newWindow) newWindow.opener = null;
      } else {
        onDoubleClick(component);
      }
    }
  };

  useEffect(() => {
    const target = ref.current;
    if (!target || !measure) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const posX = left + window.scrollX;
    const posY = top + window.scrollY;
    measure({ id, x: posX, y: posY, w: width, h: height });
  }, [id, measure]);
  return (
    <div
      className={className}
      onMouseDown={_onMouseDown}
      onDoubleClick={_onDoubleClick}
      onTouchEnd={onDoubleTap}
      ref={ref}
      id={mobileHidden ? "hide-mobile" : ""}
    >
      <div className={`${className}__img__container`}>
        <img src={icon} alt={title} className={`${className}__img`} />
      </div>
      <div className={`${className}__text__container`}>
        <div className={`${className}__text`}>{title}</div>
      </div>
    </div>
  );
};

const IconsContainer = styled.div`
  position: absolute;
  margin-top: 40px;
  margin-left: 40px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 95%;
  @media (max-width: 800px) {
    display: flex;
    top: 24px;
    margin-top: 12px;
    margin-left: 12px;
  }
`;

const StyledIcon = styled(Icon)`
  width: 100px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__text__container {
    width: 100%;
    font-size: 0.8rem;
    color: white;
    text-shadow: 0 1px 1px black;
    margin-top: 5px;
    display: flex;
    justify-content: center;

    &:before {
      content: "";
      display: block;
      flex-grow: 1;
    }
    &:after {
      content: "";
      display: block;
      flex-grow: 1;
    }
  }
  &__text {
    padding: 0 3px 2px;
    text-align: center;
    flex-shrink: 1;
    background-color: ${({ isFocus, displayFocus }) =>
      isFocus && displayFocus ? "#0b61ff" : "transparent"};

    @media only screen and (max-width: 800px) {
      background-color: ${({ theme }) => theme.desktopIconTextBackground};
    }
  }
  &__img__container {
    filter: ${({ isFocus, displayFocus }) =>
      isFocus && displayFocus ? "drop-shadow(0 0 blue)" : ""};
  }
  &__img {
    width: 40px;
    height: 40px;
    opacity: ${({ isFocus, displayFocus }) =>
      isFocus && displayFocus ? 0.5 : 1};
  }

  @media (max-width: 800px) {
    width: 80px;

    &#hide-mobile {
      display: none;
    }

    &__text__container {
      font-size: 0.65rem;
    }
    &__img {
      width: 35px;
      height: 35px;
    }
  }
`;

export default Icons;
