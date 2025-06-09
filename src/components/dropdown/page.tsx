"use client";

import React, { useState } from "react";
import styled from "styled-components";
import arrow from "../../../public/arrow.svg";
import colors from "../../../theme";

interface PositionOption {
  label: string;
  value?: string;
  availableToChoose: boolean;
  options?: PositionOption[];
}

type DropdownProps = {
  options: PositionOption[];
  depth?: number;
};

const StyledDropdownSection = styled.div<{ $depth?: number }>`
  ${({ $depth }) =>
    $depth === 0
      ? `
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: ${colors.text};
    color: ${colors.background};
    border-radius: 0 0 13px 13px;
    z-index: 10;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  `
      : `
    position: relative;
    background-color: ${colors.text};
    color: ${colors.background};
    // no absolute positioning!
  `}
`;

const StyledDropdownButton = styled.button<{ isOpen?: boolean }>`
  width: 100%;
  border: none;
  padding: 12px 24px;
  font-size: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ isOpen }) => (isOpen ? colors.secondary : "transparent")};
  color: ${({ isOpen }) => (isOpen ? colors.background : "inherit")};
  cursor: pointer;

  img {
    height: 20px;
    width: 20px;
    transition: transform 0.3s ease;
  }
`;

const StyledLabelOnly = styled.div`
  padding: 12px 24px;
  font-size: 24px;
  opacity: 0.6;
`;

const Dropdown: React.FC<DropdownProps> = ({ options, depth = 0 }) => {
  return (
    <StyledDropdownSection $depth={depth}>
      {options.map((option, index) => (
        <DropdownItem option={option} key={index} depth={depth + 1} />
      ))}
    </StyledDropdownSection>
  );
};

const DropdownItem: React.FC<{ option: PositionOption; depth: number }> = ({
  option,
  depth,
}) => {
  const [open, setOpen] = useState(false);

  const hasChildren = option.options && option.options.length > 0;

  return (
    <div style={{ position: "relative" }}>
      {hasChildren ? (
        <>
          <StyledDropdownButton onClick={() => setOpen(!open)}>
            <p>{option.label}</p>
            <img
              src={arrow.src}
              alt=""
              style={{
                height: "20px",
                width: "20px",
                transform: open ? "rotate(270deg)" : "rotate(90deg)",
                transition: "transform 0.3s ease",
              }}
            />
          </StyledDropdownButton>
          {open && option.options && (
            <Dropdown options={option.options} depth={depth} />
          )}
        </>
      ) : option.availableToChoose ? (
        <StyledDropdownButton
          onClick={() => alert(`Selected: ${option.label}`)}
          style={{ cursor: "pointer" }}
        >
          <p>{option.label}</p>
        </StyledDropdownButton>
      ) : (
        <span>{option.label}</span>
      )}
    </div>
  );
};

export default Dropdown;
