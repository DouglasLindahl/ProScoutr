import { useEffect, useState } from "react";
import supabase from "../../../supabase";
import styled from "styled-components";
import colors from "../../../theme";

interface UserProfile {
  id: string;
  first_name?: string;
  email?: string;
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
  padding: 24px;
  border-radius: 13px;
  margin-bottom: 15px;
  background-color: ${(props) => (props.isActive ? "white" : "#ffe5e5")};
  color: ${colors.background};
  h2 {
    font-size: 24px;
  }
`;

export default function AdminPage() {
  const [allAutomations, setAllAutomations] = useState<Automation[]>([]);
  const [selectedTab, setSelectedTab] = useState<"all" | "active" | "inactive">(
    "all"
  );

  useEffect(() => {
    const fetchAllAutomations = async () => {
      const { data, error } = await supabase
        .from("automation")
        .select("*, user_profiles(id, first_name, email)");
      console.log(data);
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

  const renderAutomationCards = (automations: Automation[]) =>
    automations.map((automation) => (
      <AutomationCard key={automation.uuid} isActive={automation.is_active}>
        <h2>{automation.user_profiles?.email}</h2>
        <p>
          <strong>Name:</strong> {automation.automation_name}
        </p>
        <p>
          <strong>Active:</strong> {automation.is_active ? "Yes" : "No"}
        </p>
        <p>
          <strong>User UUID:</strong> {automation.user_uuid}
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
