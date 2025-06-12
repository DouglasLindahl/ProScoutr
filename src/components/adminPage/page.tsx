import { useEffect, useState } from "react";
import supabase from "../../../supabase";
import styled from "styled-components";
import colors from "../../../theme";

interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: number;
  address?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  age?: number;
  date_of_birth?: string;
  payment_plan: string;
  role: string;
}

interface Automation {
  uuid: string;
  automation_name: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  user_uuid: string;
  first_position: string;
  second_position: string;
  gender: string;
  nationality: string;
  league: string;
  playing_style: string;
  preferred_foot: string;
  min_age: number;
  max_age: number;
  min_height: number;
  max_height: number;
  min_weight: number;
  max_weight: number;
  user_profiles?: UserProfile;
}

const StyledAdminPage = styled.div`
  padding: 20px;
  min-height: 100vh;
  background-color: ${colors.background};
  color: ${colors.text};
  h2 {
    padding-bottom: 24px;
    padding-top: 12px;
    font-size: 36px;
  }
`;

const Tabs = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const TabButton = styled.button<{ selected: boolean }>`
  padding: 10px 20px;
  border: none;
  border-radius: 13px;
  background-color: ${(props) =>
    props.selected ? colors.primary : colors.background};
  color: ${(props) => (props.selected ? colors.background : colors.text)};
  border: 2px solid
    ${(props) => (props.selected ? colors.primary : colors.text)};
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.selected ? colors.primary : colors.text};
    color: ${(props) => (props.selected ? colors.text : colors.background)};
  }
`;

const AutomationCard = styled.div<{ isActive: boolean }>`
  margin-bottom: 15px;
  color: ${colors.background};
  h2 {
    font-size: 24px;
  }
  background-color: #2b3650;
  border-radius: 13px;
`;

const AutomationCardHeader = styled.div<{ isActive: boolean }>`
  h2 {
    padding: 0;
  }
  border-radius: 13px;
  padding: 24px;
  padding-bottom: 24px;
  background-color: ${(props) => (props.isActive ? "white" : "#ffe5e5")};
`;

const AutomationCardInfo = styled.div`
  padding: 24px;
  color: ${colors.text};
  border-radius: 0 0 13px 13px;
`;

const ButtonsRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`;

const CopyButton = styled.button`
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background-color: ${colors.primary};
  color: white;
  font-weight: 600;
  transition: background-color 0.2s;

  &:hover {
    background-color: darken(${colors.primary}, 10%);
  }
`;

export default function AdminPage() {
  const [allAutomations, setAllAutomations] = useState<Automation[]>([]);
  const [selectedTab, setSelectedTab] = useState<"all" | "active" | "inactive">(
    "all"
  );

  useEffect(() => {
    const fetchAllAutomations = async () => {
      const { data, error } = await supabase.from("automation").select(`
        *,
        user_profiles(*)
      `);

      if (error) {
        console.error("Error fetching data:", error.message);
      } else if (data) {
        setAllAutomations(data as Automation[]);
      }
    };

    fetchAllAutomations();
  }, []);

  const getFilteredAutomations = () => {
    if (selectedTab === "active")
      return allAutomations.filter((a) => a.is_active);
    if (selectedTab === "inactive")
      return allAutomations.filter((a) => !a.is_active);
    return allAutomations;
  };

  const copyTextToClipboard = (automation: Automation) => {
    const user = automation.user_profiles;
    const text = `
User: ${user?.first_name || "N/A"} ${user?.last_name || ""}
Email: ${user?.email || "N/A"}
    
Name: ${automation.automation_name}
Gender: ${automation.gender}
First Position: ${automation.first_position}
Second Position: ${automation.second_position || "N/A"}
Nationality: ${automation.nationality || "N/A"}
League: ${automation.league || "N/A"}
Playing Style: ${automation.playing_style || "N/A"}
Preferred Foot: ${automation.preferred_foot}
Age Range: ${automation.min_age} - ${automation.max_age}
Height Range (cm): ${automation.min_height} - ${automation.max_height}
Weight Range (kg): ${automation.min_weight} - ${automation.max_weight}
    `.trim();

    navigator.clipboard.writeText(text).then(() => {});
  };

  const copyJsonToClipboard = (automation: Automation) => {
    const customJson = {
      league: automation.league,
      nationality: automation.nationality,
      min_age: automation.min_age,
      max_age: automation.max_age,
      min_height: automation.min_height,
      max_height: automation.max_height,
      min_weight: automation.min_weight,
      max_weight: automation.max_weight,
      first_position: automation.first_position,
      second_position: automation.second_position,
      preferred_foot: automation.preferred_foot,
      is_active: automation.is_active,
      automation_name: automation.automation_name,
      gender: automation.gender,
      playing_style: automation.playing_style,
      user_profiles: {
        email: automation.user_profiles?.email,
        last_name: automation.user_profiles?.last_name,
        first_name: automation.user_profiles?.first_name,
        phone_number: automation.user_profiles?.phone_number,
      },
    };

    const jsonString = JSON.stringify(customJson, null, 2);

    navigator.clipboard.writeText(jsonString).then(() => {});
  };

  const renderAutomationCards = (automations: Automation[]) =>
    automations.map((automation) => (
      <AutomationCard key={automation.uuid} isActive={automation.is_active}>
        <AutomationCardHeader isActive={automation.is_active}>
          <h2>
            {automation.user_profiles?.first_name}{" "}
            {automation.user_profiles?.last_name}
          </h2>
          <p>{automation.user_profiles?.email}</p>
        </AutomationCardHeader>
        <AutomationCardInfo>
          <p>
            <strong>Name:</strong> {automation.automation_name}
          </p>
          <p>
            <strong>Gender:</strong> {automation.gender}
          </p>
          <p>
            <strong>First Position:</strong> {automation.first_position}
          </p>
          <p>
            <strong>Second Position:</strong>{" "}
            {automation.second_position || "N/A"}
          </p>
          <p>
            <strong>Nationality:</strong> {automation.nationality || "N/A"}
          </p>
          <p>
            <strong>League:</strong> {automation.league || "N/A"}
          </p>
          <p>
            <strong>Playing Style:</strong> {automation.playing_style || "N/A"}
          </p>
          <p>
            <strong>Preferred Foot:</strong> {automation.preferred_foot}
          </p>
          <p>
            <strong>Age Range:</strong> {automation.min_age} -{" "}
            {automation.max_age}
          </p>
          <p>
            <strong>Height Range (cm):</strong> {automation.min_height} -{" "}
            {automation.max_height}
          </p>
          <p>
            <strong>Weight Range (kg):</strong> {automation.min_weight} -{" "}
            {automation.max_weight}
          </p>

          <ButtonsRow>
            <CopyButton onClick={() => copyTextToClipboard(automation)}>
              Copy Text
            </CopyButton>
            <CopyButton onClick={() => copyJsonToClipboard(automation)}>
              Copy JSON
            </CopyButton>
          </ButtonsRow>
        </AutomationCardInfo>
      </AutomationCard>
    ));

  return (
    <StyledAdminPage>
      <h2>Admin</h2>

      <Tabs>
        <TabButton
          selected={selectedTab === "all"}
          onClick={() => setSelectedTab("all")}
        >
          All
        </TabButton>
        <TabButton
          selected={selectedTab === "active"}
          onClick={() => setSelectedTab("active")}
        >
          Active
        </TabButton>
        <TabButton
          selected={selectedTab === "inactive"}
          onClick={() => setSelectedTab("inactive")}
        >
          Inactive
        </TabButton>
      </Tabs>

      {renderAutomationCards(getFilteredAutomations())}
    </StyledAdminPage>
  );
}
