"use client";
import styled from "styled-components";
import { footballPositions } from "@/app/utils";
import { genderOptions } from "@/app/utils";
import Dropdown from "@/components/dropdown/page";
import { useState } from "react";
import colors from "../../../../theme";
import arrow from "../../../../public/arrow.svg";

const StyledCreateAutomationPage = styled.div`
  background-color: ${colors.background};
  width: 100vw;
  min-height: 100vh;
  padding: 64px;
`;

const StyledCreateAutomationHeader = styled.h1`
  color: ${colors.text};
`;

const StyledInputLabel = styled.p`
  color: ${colors.text};
`;

const StyledDropDownMenuSection = styled.div`
  position: relative;
  background-color: ${colors.text};
  color: ${colors.background};
  border-radius: 13px;
  width: 30%;
  margin-bottom: 24px;
  overflow: visible;
  &:hover {
    background-color: ${colors.primary};
  }
`;

const StyledDropDownMenuButton = styled.button<{ isOpen: boolean }>`
  padding: 12px 24px;
  font-size: 24px;
  border-radius: 13px 13px 0 0;
  width: 100%;
  border: none;
  background: ${({ isOpen }) => (isOpen ? colors.primary : "transparent")};
  color: ${({ isOpen }) => (isOpen ? colors.background : colors.background)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
    transition: transform 0.3s ease;
  }
`;

export default function CreateAutomation() {
  const [firstPositionDropdownOpen, setFirstPositionDropdownOpen] =
    useState(false);
  const [genderDropdownOpen, setGenderDropdownOpen] = useState(false);

  return (
    <StyledCreateAutomationPage>
      <StyledCreateAutomationHeader>
        Create automation
      </StyledCreateAutomationHeader>

      <StyledInputLabel>1st position</StyledInputLabel>
      <StyledDropDownMenuSection>
        <StyledDropDownMenuButton
          isOpen={firstPositionDropdownOpen}
          onClick={() =>
            setFirstPositionDropdownOpen(!firstPositionDropdownOpen)
          }
        >
          Select (required)
          <img
            src={arrow.src}
            alt=""
            style={{
              transform: firstPositionDropdownOpen
                ? "rotate(270deg)"
                : "rotate(90deg)",
            }}
          />
        </StyledDropDownMenuButton>

        {firstPositionDropdownOpen && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              width: "100%",
              backgroundColor: colors.background,
              borderRadius: "0 0 13px 13px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              zIndex: 20,
            }}
          >
            <Dropdown options={footballPositions} depth={0} />
          </div>
        )}
      </StyledDropDownMenuSection>

      <StyledInputLabel>Gender</StyledInputLabel>
      <StyledDropDownMenuSection>
        <StyledDropDownMenuButton
          isOpen={genderDropdownOpen}
          onClick={() => setGenderDropdownOpen(!genderDropdownOpen)}
        >
          Select (required)
          <img
            src={arrow.src}
            alt=""
            style={{
              transform: genderDropdownOpen
                ? "rotate(270deg)"
                : "rotate(90deg)",
            }}
          />
        </StyledDropDownMenuButton>

        {genderDropdownOpen && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              width: "100%",
              backgroundColor: colors.background,
              borderRadius: "0 0 13px 13px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              zIndex: 20,
            }}
          >
            <Dropdown options={genderOptions} depth={0} />
          </div>
        )}
      </StyledDropDownMenuSection>
    </StyledCreateAutomationPage>
  );
}
