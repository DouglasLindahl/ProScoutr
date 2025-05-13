"use client";

import AuthCheck from "@/components/authCheck/page";
import LogoutButton from "@/components/logoutButton/page";
import { useEffect, useState } from "react";
import styled from "styled-components";
import colors from "../../../../theme";
import supabase from "../../../../supabase";
import AutomationCard from "@/components/automationCard/page";

const StyledDashboard = styled.div`
  min-height: 100vh;
  background-color: ${colors.background};
  padding: 40px;
`;

const StyledDashboardHeader = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 40px;
  color: ${colors.white};
`;

const StyledDashboardQueryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
`;

interface Automation {
  uuid: string;
  automation_name: string;
  is_active: boolean;
  user_uuid: string;
}

interface UserProfile {
  uuid: string;
  first_position: string;
  second_position: string;
  preferred_foot: string;
  created_at: string;
  updated_at: string;
  automation_name: string;
  is_active: boolean;
}

const Dashboard = () => {
  const [userUuid, setUserUuid] = useState<string>("");
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [userInformation, setUserInformation] = useState<UserProfile | null>(
    null
  );

  useEffect(() => {
    const checkUserSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user?.user_metadata?.sub) {
        setUserUuid(data.session.user.user_metadata.sub);
      }
    };
    checkUserSession();
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!userUuid) return;

      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", userUuid)
        .single(); // Ensure we only fetch one user profile

      if (error) {
        console.error("Error fetching user info:", error);
        return;
      }

      setUserInformation(data);
    };

    fetchUserInfo();
  }, [userUuid]);

  useEffect(() => {
    const fetchAutomations = async () => {
      if (!userUuid) return;

      const { data, error } = await supabase
        .from("automation")
        .select("uuid, automation_name, is_active, user_uuid")
        .eq("user_uuid", userUuid);

      if (error) {
        console.error("Error fetching automations:", error);
        return;
      }

      setAutomations(data || []);
    };

    fetchAutomations();
  }, [userUuid]);

  console.log(userInformation);

  if (!userInformation) {
    return <p>Loading user information...</p>;
  }

  return (
    <AuthCheck>
      <StyledDashboard>
        <StyledDashboardHeader>My automations</StyledDashboardHeader>
        <StyledDashboardQueryContainer>
          {automations.map((automation) => (
            <AutomationCard key={automation.uuid} uuid={automation.uuid} />
          ))}
        </StyledDashboardQueryContainer>
      </StyledDashboard>
    </AuthCheck>
  );
};

export default Dashboard;
