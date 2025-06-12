"use client";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import {
  checkUserSession,
  footballPositions,
  leagueOptions,
  nationalityOptions,
  playingStyleOptions,
  preferredFootOptions,
} from "@/app/utils";
import { genderOptions } from "@/app/utils";
import Dropdown from "@/components/dropdown/page";
import { useEffect, useState } from "react";
import colors from "../../../../../theme";
import arrow from "../../../../public/arrow.svg";
import questionMark from "../../../../public/questionMark.svg";
import PopupWindow from "@/components/popupWindow/page";
import { Range } from "react-range";
import supabase from "../../../../../supabase";
import InputField from "@/components/inputField/page";
import AuthCheck from "@/components/authCheck/page";

const StyledCreateAutomationPage = styled.div`
  background-color: ${colors.background};
  width: 100vw;
  min-height: 100vh;
  padding: 64px;
`;

const StyledCreateAutomationHeader = styled.h1`
  color: ${colors.text};
  text-align: center;
  font-size: 60px;
`;

const StyledInputLabel = styled.p`
  color: ${colors.text};
  font-size: 30px;
  font-weight: bold;
  padding-bottom: 20px;
`;

const StyledDropDownMenuSection = styled.div<{ required: boolean }>`
  position: relative;
  background-color: ${colors.text};
  color: ${colors.background};
  border-radius: 13px;
  width: 30%;
  margin-bottom: 80px;
  overflow: visible;
  &:hover {
    background-color: ${colors.primary};
  }
  background-color: ${({ required }) => (required ? colors.text : "gray")};
`;

const StyledDropDownMenuButton = styled.button<{
  isOpen: boolean;
}>`
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

const StyledPositionsDropdownSection = styled.div`
  position: relative;
`;
const StyledPositionsInfoTextSection = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
  color: ${colors.text};
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.1) 35%,
    rgba(255, 255, 255, 0.1) 100%
  );
  height: 100%;
  width: 60%;
  right: 0;
  top: 0;
`;
const StyledPositionsInfoText = styled.p`
  padding: 25px 25px 25px 150px;
  font-size: 25px;
`;
const StyledPositionInfoQuestionTextSection = styled.div`
  padding-left: 150px;
  color: ${colors.text};
  font-weight: 200;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 30px;
  text-decoration: underline;
  text-underline-offset: 4px;
  font-size: 15px;
  &:hover {
    cursor: pointer;
  }
  p {
    font-size: 25px;
    font-weight: bold;
  }
`;

const StyledBoldText = styled.span`
  font-weight: bold;
`;

const StyledFinalSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: start;
  gap: 30px;
  height: 50vh;
`;
const StyledApplyButton = styled.button`
  padding: 8px 64px;
  font-size: 24px;
  font-weight: bold;
  background-color: ${colors.text};
  color: ${colors.background};
  border: 4px solid ${colors.text};
  border-radius: 13px;
  &:hover {
    background-color: ${colors.primary};
    border: 4px solid ${colors.primary};
  }
`;
const StyledCancelButton = styled.button`
  padding: 8px 64px;
  font-size: 24px;
  background-color: ${colors.background};
  color: ${colors.text};
  border: 4px solid ${colors.text};
  border-radius: 13px;
  &:hover {
    background-color: ${colors.red};
    border: 4px solid ${colors.red};
  }
`;

const StyledErrortext = styled.p`
  font-size: 24px;
  color: ${colors.red};
`;

const Slug = (id: any) => {
  const router = useRouter();
  const [userUuid, setUserUuid] = useState<string>("");
  const [errorText, setErrorText] = useState("");
  const [positionsGuidePopupOpen, setPositionsGuidePopup] = useState(false);
  const [firstPositionDropdownOpen, setFirstPositionDropdownOpen] =
    useState(false);
  const [genderDropdownOpen, setGenderDropdownOpen] = useState(false);
  const [altPositionDropdownOpen, setAltPositionDropdownOpen] = useState(false);
  const [preferredFootDropdownOpen, setPreferredFootDropdownOpen] =
    useState(false);
  const [playingStyleDropdownOpen, setPlayingStyleDropdownOpen] =
    useState(false);
  const [nationalityDropdownOpen, setNationalityDropdownOpen] = useState(false);
  const [leagueDropdownOpen, setLeagueDropdownOpen] = useState(false);

  const [firstPosition, setFirstPosition] = useState("");
  const [gender, setGender] = useState("");
  const [altPosition, setAltPosition] = useState("");
  const [preferredFoot, setPreferredFoot] = useState("");
  const [playingStyle, setPlayingStyle] = useState("");
  const [nationality, setNationality] = useState("");
  const [league, setLeague] = useState("");
  const [automationName, setAutomationName] = useState("Automation");

  const [ageRange, setAgeRange] = useState([18, 32]);
  const [weightRange, setWeightRange] = useState([72, 80]);
  const [heightRange, setHeightRange] = useState([170, 180]);
  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(32);
  const [minWeight, setMinWeight] = useState(72);
  const [maxWeight, setMaxWeight] = useState(80);
  const [minHeight, setMinHeight] = useState(170);
  const [maxHeight, setMaxHeight] = useState(180);

  useEffect(() => {
    console.log(id.params.slug);
  }, [id]);

  if (id.params.slug === "create") {
    return <>create</>;
  } else {
    return <>edit</>;
  }
};
export default Slug;
