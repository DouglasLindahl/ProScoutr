import styled from "styled-components";
import colors from "../../../theme";
import exit from "../../../public/exit.svg";
import { ReactNode } from "react";

const StyledPopupWindow = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 80%;
  z-index: 10;
  background-color: ${colors.background};
  padding: 56px 96px;
  overflow-y: auto;
  border-radius: 20px;
  border: 2px solid ${colors.text};
  color: ${colors.text};

  img.exit-icon {
    position: absolute;
    top: 30px;
    right: 30px;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
  h1 {
    font-size: 36px;
    text-align: center;
    padding-bottom: 24px;
  }
  h2 {
    padding-top: 24px;
  }
  h3 {
    padding-top: 24px;
    font-weight: normal;
  }
  li {
    margin-left: 20px;
  }
`;

const StyledDarkBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: black;
  width: 100vw;
  height: 100vh;
  opacity: 90%;
  z-index: 5;
`;

type PopupWindowProps = {
  setPopupOpen: (open: boolean) => void;
  children: ReactNode;
  header?: string;
};

export default function PopupWindow({
  setPopupOpen,
  children,
  header,
}: PopupWindowProps) {
  return (
    <>
      <StyledDarkBackground onClick={() => setPopupOpen(false)} />
      <StyledPopupWindow>
        <img
          className="exit-icon"
          src={exit.src}
          alt="Exit Button"
          onClick={() => setPopupOpen(false)}
        />
        {header && <h1>{header}</h1>}
        {children}
      </StyledPopupWindow>
    </>
  );
}
