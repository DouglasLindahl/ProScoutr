"use client";
import styled, { css } from "styled-components";
import colors from "../../../theme";
import automationImg from "../../../public/automationImg.png";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { activateAutomation, deactivateAutomation } from "../../app/utils";
interface Automation {
  uuid: string;
  automation_name: string;
  is_active: boolean;
  user_uuid: string;
}
interface AutomationCardProps {
  userUuid: string;
  automation: Automation;
  updateAutomations: () => void;
  availableAutomationLimit: number;
}

const StyledDashboardQuery = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const StyledDashboardQueryImageContainer = styled.div<{ isActive: boolean }>`
  border: 4px solid
    ${({ isActive }) => (isActive ? `${colors.green}` : `${colors.red}`)};
  width: 100%;
  border-radius: 13px;
  background-color: ${colors.text};
`;

const StyledDashboardQueryImage = styled.div<{ isActive: boolean }>`
  background: url(${automationImg.src}) no-repeat center center;
  background-size: 70% 70%;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 13px;

  filter: ${({ isActive }) => (isActive ? "none" : "blur(4px)")};
  box-sizing: border-box; /* To prevent border from affecting size */
`;

const StyledDashboardQueryButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
`;

const StyledActivateButton = styled.button<{
  isActive: boolean;
  isHovered: boolean;
}>`
  width: 100%;
  height: 48px;
  border: none;
  border-radius: 13px;
  font-size: 30px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
  background-color: ${({ isActive }) =>
    isActive ? colors.primary : colors.text};
  color: ${colors.background};

  ${({ isActive, isHovered }) =>
    isActive &&
    isHovered &&
    css`
      background-color: ${colors.orange};
    `}

  ${({ isActive, isHovered }) =>
    !isActive &&
    isHovered &&
    css`
      background-color: ${colors.secondary};
    `}
`;

const StyledEditButton = styled.button`
  width: 100%;
  height: 48px;
  border: none;
  border-radius: 13px;
  font-size: 30px;
  cursor: pointer;
  background-color: ${colors.background};
  color: ${colors.text};

  border: 3px solid white;
  transition: 0.2s;
  &:hover {
    background-color: ${colors.secondary};
    color: ${colors.text};
    border: 3px solid ${colors.secondary};
  }
`;

const StyledDashsboardQueryText = styled.p`
  font-size: 30px;
  height: 20%;
  color: ${colors.text};
  text-align: center;
`;

const AutomationCard = ({
  userUuid,
  availableAutomationLimit,
  automation,
  updateAutomations,
}: AutomationCardProps) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const { uuid, is_active, automation_name } = automation;

  return (
    <StyledDashboardQuery>
      <StyledDashboardQueryImageContainer isActive={is_active}>
        <StyledDashboardQueryImage isActive={is_active} />
      </StyledDashboardQueryImageContainer>
      <StyledDashsboardQueryText>{automation_name}</StyledDashsboardQueryText>
      <StyledDashboardQueryButtonsContainer>
        <StyledActivateButton
          isActive={is_active}
          isHovered={isHovered}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={async () => {
            const result = is_active
              ? await deactivateAutomation(uuid, userUuid)
              : await activateAutomation(
                  uuid,
                  userUuid,
                  availableAutomationLimit
                );

            if (result.success) {
              await updateAutomations();
            }
          }}
        >
          {is_active && isHovered
            ? "Deactivate?"
            : is_active
            ? "Active"
            : "Start"}
        </StyledActivateButton>

        <StyledEditButton
          onClick={() => {
            router.push(`automation/${uuid}`);
          }}
        >
          Edit
        </StyledEditButton>
      </StyledDashboardQueryButtonsContainer>
    </StyledDashboardQuery>
  );
};

export default AutomationCard;
