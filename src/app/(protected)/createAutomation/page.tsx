"use client";
import styled from "styled-components";
import {
  footballPositions,
  nationalityOptions,
  playingStyleOptions,
  preferredFootOptions,
} from "@/app/utils";
import { genderOptions } from "@/app/utils";
import Dropdown from "@/components/dropdown/page";
import { useState } from "react";
import colors from "../../../../theme";
import arrow from "../../../../public/arrow.svg";
import questionMark from "../../../../public/questionMark.svg";
import PopupWindow from "@/components/popupWindow/page";
import { Range } from "react-range";
import { Mina } from "next/font/google";

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

export default function CreateAutomation() {
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

  const [firstPosition, setFirstPosition] = useState("");
  const [gender, setGender] = useState("");
  const [altPosition, setAltPosition] = useState("");
  const [preferredFoot, setPreferredFoot] = useState("");
  const [playingStyle, setPlayingStyle] = useState("");
  const [nationality, setNationality] = useState("");

  const [ageRange, setAgeRange] = useState([18, 32]);
  const [weightRange, setWeightRange] = useState([72, 80]);
  const [heightRange, setHeightRange] = useState([170, 180]);
  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(32);
  const [minWeight, setMinWeight] = useState(72);
  const [maxWeight, setMaxWeight] = useState(80);
  const [minHeight, setMinHeight] = useState(170);
  const [maxHeight, setMaxHeight] = useState(180);

  const checkInputs = () => {
    console.log("gender: " + gender);
    console.log("1st position: " + firstPosition);
    console.log("alt. position: " + altPosition);
    console.log("min age: " + minAge);
    console.log("max age: " + maxAge);
    console.log("min weight: " + minWeight);
    console.log("max weight: " + maxWeight);
    console.log("min height: " + minHeight);
    console.log("max height: " + maxHeight);
  };

  const STEP = 1;

  const sliderConfig = {
    age: { min: 16, max: 40 },
    weight: { min: 50, max: 120 },
    height: { min: 150, max: 210 },
  };

  const renderRange = (
    label: string,
    range: number[],
    setRange: React.Dispatch<React.SetStateAction<number[]>>,
    config: { min: number; max: number },
    setMin: React.Dispatch<React.SetStateAction<number>>,
    setMax: React.Dispatch<React.SetStateAction<number>>
  ) => (
    <div style={{ marginBottom: 60 }}>
      <StyledInputLabel>{label}</StyledInputLabel>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
        }}
      >
        <input
          type="number"
          value={range[0]}
          min={config.min}
          max={range[1]}
          onChange={(e) => {
            const value = Math.max(
              config.min,
              Math.min(+e.target.value, range[1])
            );
            setRange([value, range[1]]);
          }}
          style={{
            width: 70,
            aspectRatio: "1/1",
            borderRadius: "8px",
            border: "none",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "24px",
            paddingLeft: "12px",
          }}
        />
        <span
          style={{
            backgroundColor: "white",
            width: "50px",
            height: "10px",
            borderRadius: "13px",
          }}
        />
        <input
          type="number"
          value={range[1]}
          min={range[0]}
          max={config.max}
          onChange={(e) => {
            const value = Math.max(
              range[0],
              Math.min(+e.target.value, config.max)
            );
            setRange([range[0], value]);
          }}
          style={{
            width: 70,
            aspectRatio: "1/1",
            borderRadius: "8px",
            border: "none",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "24px",
            paddingLeft: "12px",
          }}
        />
        <Range
          step={STEP}
          min={config.min}
          max={config.max}
          values={range}
          onChange={(values) => {
            setRange(values);
            setMin(values[0]);
            setMax(values[1]);
          }}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                marginLeft: "30px",
                height: "6px",
                width: "100%",
                borderRadius: "13px",
                background: `linear-gradient(to right,
                ${colors.text} 0%,
                ${colors.text} ${
                  ((range[0] - config.min) / (config.max - config.min)) * 100
                }%,
                ${colors.secondary} ${
                  ((range[0] - config.min) / (config.max - config.min)) * 100
                }%,
                ${colors.secondary} ${
                  ((range[1] - config.min) / (config.max - config.min)) * 100
                }%,
                ${colors.text} ${
                  ((range[1] - config.min) / (config.max - config.min)) * 100
                }%,
                ${colors.text} 100%)`,
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "20px",
                width: "20px",
                borderRadius: "50%",
                backgroundColor: colors.secondary,
                cursor: "pointer",
              }}
            />
          )}
        />
      </div>
    </div>
  );

  return (
    <StyledCreateAutomationPage>
      <button onClick={checkInputs}>check inputs</button>
      {positionsGuidePopupOpen && (
        <PopupWindow
          setPopupOpen={setPositionsGuidePopup}
          header="A guide for our
positions matching system"
        >
          <p>
            When setting up your player automation, you'll be asked to choose a
            1st and alternative preferred position. This gives us a broader
            understanding of the types of players you're looking for - whether
            you're targeting specialists in one role or open to versatile
            options. However, it's important to understand how these position
            selections work behind the scenes.
          </p>
          <br />
          <p>
            Your selected positions are treated as a group of acceptable roles,
            not as a checklist that a single player must match completely.
          </p>
          <br />
          <p>For example, if you choose:</p>
          <ul>
            <li>
              <StyledBoldText>1st Position:</StyledBoldText> Centre-Back (CB)
            </li>
            <li>
              <StyledBoldText>Alt. Position:</StyledBoldText> Left-Back (LB)
            </li>
          </ul>
          <br />
          <p>
            The system will look for players who play in any of those roles -
            not necessarily both. That means:
          </p>
          <br />
          <ul>
            <li>A player who is only a Centre-Back may be recommended.</li>
            <li>A player who plays both CB and LB is a strong match.</li>
            <li>However, a player who is only a Midfielder will be excluded</li>
          </ul>
          <br />
          <p>
            This approach ensures you receive relevant suggestions faster by not
            filtering too narrowly. It also allows us to include versatile
            players who cover more of your selected roles, and ensures you don’t
            miss out on strong candidates just because they don’t match all
            three positions exactly.
          </p>
          <br />
          <p>
            Once we've filtered players by your selected positions, our system
            evaluates:
          </p>
          <ul>
            <li>
              Whether the player has experience in both of the selected roles
            </li>
            <li>
              Their primary and alternative positions, as tracked across recent
              seasons
            </li>
            <li>
              Positional flexibility and role fit, using match data and
              performance indicators
            </li>
          </ul>
          <br />
          <p>
            Players with multiple position matches (in this case, CB + LB) are
            ranked higher, but we do not require a player to match both of them.
          </p>
          <h2>Tip: how to choose your 1st and Alt. position:</h2>
          <br />
          <ul>
            <li>Use 1st Position for the role you need most urgently</li>
            <li>
              Use the alternative position to include alternatives or adjacent
              roles (e.g., a LB can cover LWB, or a CM might cover CDM)
            </li>
            <li>
              You can always adjust these selections later to refine your player
              pool
            </li>
          </ul>
          <br />
          <p>
            If you have questions or want help defining your ideal player
            profile, our team is here to support you. Just reach out - we’re
            happy to guide you through your setup.
          </p>
        </PopupWindow>
      )}
      <StyledCreateAutomationHeader>
        Create automation
      </StyledCreateAutomationHeader>

      <StyledInputLabel>Gender</StyledInputLabel>
      <StyledDropDownMenuSection required={true}>
        <StyledDropDownMenuButton
          isOpen={genderDropdownOpen}
          onClick={() => setGenderDropdownOpen(!genderDropdownOpen)}
        >
          {gender ? gender : "Select (required)"}
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
            <Dropdown
              setOption={setGender}
              options={genderOptions}
              depth={0}
              setDropdownOpen={setGenderDropdownOpen}
            />
          </div>
        )}
      </StyledDropDownMenuSection>
      <StyledPositionsDropdownSection>
        <StyledPositionsInfoTextSection>
          <StyledPositionsInfoText>
            Your selected positions are treated as a group of acceptable roles,
            not as a checklist that a single player must match completely.
          </StyledPositionsInfoText>
          <StyledPositionInfoQuestionTextSection>
            <img
              src={questionMark.src}
              alt="Help Icon"
              width={44}
              height={44}
            />
            <p
              onClick={() => {
                setPositionsGuidePopup(true);
              }}
            >
              How do we match positions?
            </p>
          </StyledPositionInfoQuestionTextSection>
        </StyledPositionsInfoTextSection>
        <StyledInputLabel>1st position</StyledInputLabel>
        <StyledDropDownMenuSection required={true}>
          <StyledDropDownMenuButton
            isOpen={firstPositionDropdownOpen}
            onClick={() =>
              setFirstPositionDropdownOpen(!firstPositionDropdownOpen)
            }
          >
            {firstPosition ? firstPosition : "Select (required)"}
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
              <Dropdown
                setOption={setFirstPosition}
                options={footballPositions}
                depth={0}
                setDropdownOpen={setFirstPositionDropdownOpen}
              />
            </div>
          )}
        </StyledDropDownMenuSection>

        <StyledInputLabel>Alt. position</StyledInputLabel>
        <StyledDropDownMenuSection required={false}>
          <StyledDropDownMenuButton
            isOpen={altPositionDropdownOpen}
            onClick={() => setAltPositionDropdownOpen(!altPositionDropdownOpen)}
          >
            {altPosition ? altPosition : "Select (optional)"}
            <img
              src={arrow.src}
              alt=""
              style={{
                transform: altPositionDropdownOpen
                  ? "rotate(270deg)"
                  : "rotate(90deg)",
              }}
            />
          </StyledDropDownMenuButton>

          {altPositionDropdownOpen && (
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
              <Dropdown
                setOption={setAltPosition}
                options={footballPositions}
                depth={0}
                setDropdownOpen={setAltPositionDropdownOpen}
              />
            </div>
          )}
        </StyledDropDownMenuSection>
      </StyledPositionsDropdownSection>
      {renderRange(
        "Age",
        ageRange,
        setAgeRange,
        sliderConfig.age,
        setMinAge,
        setMaxAge
      )}
      {renderRange(
        "Weight (kg)",
        weightRange,
        setWeightRange,
        sliderConfig.weight,
        setMinWeight,
        setMaxWeight
      )}
      {renderRange(
        "Height (cm)",
        heightRange,
        setHeightRange,
        sliderConfig.height,
        setMinHeight,
        setMaxHeight
      )}
      <StyledInputLabel>Preferred foot</StyledInputLabel>
      <StyledDropDownMenuSection required={false}>
        <StyledDropDownMenuButton
          isOpen={preferredFootDropdownOpen}
          onClick={() =>
            setPreferredFootDropdownOpen(!preferredFootDropdownOpen)
          }
        >
          {preferredFoot ? preferredFoot : "Select (optional)"}
          <img
            src={arrow.src}
            alt=""
            style={{
              transform: preferredFootDropdownOpen
                ? "rotate(270deg)"
                : "rotate(90deg)",
            }}
          />
        </StyledDropDownMenuButton>

        {preferredFootDropdownOpen && (
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
            <Dropdown
              setOption={setPreferredFoot}
              options={preferredFootOptions}
              depth={0}
              setDropdownOpen={setPreferredFootDropdownOpen}
            />
          </div>
        )}
      </StyledDropDownMenuSection>
      <StyledInputLabel>Playing style</StyledInputLabel>
      <StyledDropDownMenuSection required={false}>
        <StyledDropDownMenuButton
          isOpen={playingStyleDropdownOpen}
          onClick={() => setPlayingStyleDropdownOpen(!playingStyleDropdownOpen)}
        >
          {playingStyle ? playingStyle : "Select (optional)"}
          <img
            src={arrow.src}
            alt=""
            style={{
              transform: playingStyleDropdownOpen
                ? "rotate(270deg)"
                : "rotate(90deg)",
            }}
          />
        </StyledDropDownMenuButton>

        {playingStyleDropdownOpen && (
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
            <Dropdown
              setOption={setPlayingStyle}
              options={playingStyleOptions}
              depth={0}
              setDropdownOpen={setPlayingStyleDropdownOpen}
            />
          </div>
        )}
      </StyledDropDownMenuSection>
      <StyledInputLabel>Nationality</StyledInputLabel>
      <StyledDropDownMenuSection required={false}>
        <StyledDropDownMenuButton
          isOpen={nationalityDropdownOpen}
          onClick={() => setNationalityDropdownOpen(!nationalityDropdownOpen)}
        >
          {nationality ? nationality : "Select (optional)"}
          <img
            src={arrow.src}
            alt=""
            style={{
              transform: nationalityDropdownOpen
                ? "rotate(270deg)"
                : "rotate(90deg)",
            }}
          />
        </StyledDropDownMenuButton>

        {nationalityDropdownOpen && (
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
            <Dropdown
              setOption={setNationality}
              options={nationalityOptions}
              depth={0}
              setDropdownOpen={setNationalityDropdownOpen}
            />
          </div>
        )}
      </StyledDropDownMenuSection>
    </StyledCreateAutomationPage>
  );
}
