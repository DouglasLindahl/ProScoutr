"use client";

import AuthCheck from "@/components/authCheck/page";
import LogoutButton from "@/components/logoutButton/page";
import { useEffect, useState } from "react";
import styled from "styled-components";
import colors from "../../../../theme";
import supabase from "../../../../supabase";
import AutomationCard from "@/components/automationCard/page";
import plus from "../../../../public/plus.png";
import greenShapes from "../../../../public/greenShapes.svg";
import { useRouter } from "next/navigation";

import {
  checkUserSession,
  fetchUserInfo,
  fetchPaymentPlan,
  fetchUserAutomations,
  enforceAutomationLimit,
  automationsHardLimit,
} from "../../utils";
import AdminPage from "@/components/adminPage/page";
import LoadingScreen from "@/components/loadingScreen/page";

const StyledBackgroundAccent = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${greenShapes.src});
  background-repeat: repeat;
  background-position: top left;
  background-size: cover;
  pointer-events: none;
  z-index: 1;
`;

const StyledDashboard = styled.div`
  min-height: 100vh;
  background-color: ${colors.background};
  padding: 40px;
  position: relative;
`;

const StyledDashboardHeader = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 40px;
  color: ${colors.white};
`;

const StyledDashboardAutomationContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
`;

const StyledAddAutomationCard = styled.button`
  height: 100%;
  width: 100%;
  padding: 24px;
  border: 5px solid white;
  border-radius: 13px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: white;
  background: none;
  opacity: 25%;
  transition: 0.2s;
  &:hover {
    cursor: pointer;
    border: 5px solid ${colors.text};
    opacity: 100%;
  }
`;
const StyledAddAutomationImage = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  background: url(${plus.src}) no-repeat center center;
  background-size: 50% 50%;
`;
const StyledAddAutomationTextContainer = styled.div`
  aspect-ratio: 1 / 1;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledAddAutomationText = styled.p`
  font-size: 30px;
`;

const StyledHowManyAutomationsActiveSection = styled.div`
  top: 24px;
  right: 24px;
  position: fixed;
  color: ${colors.text};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StyledHowManyAutomationsActiveNumber = styled.p`
  font-size: 32px;
  font-weight: bold;
`;
const StyledHowManyAutomationsActiveText = styled.p`
  font-size: 16px;
`;

const StyledGoToAdminPageButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  font-size: 32px;
  padding: 6px 64px;
  font-weight: bold;
  border-radius: 13px;
  border: none;
  &:hover {
    cursor: pointer;
  }
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
  payment_plan: number;
  role: string;
}

interface PaymentPlan {
  id: string;
  plan_name: string;
  plan_description: string;
  price: number;
  available_automations: number;
  is_active: boolean;
}

const Dashboard = () => {
  const router = useRouter();
  const [adminActive, setAdminActive] = useState<boolean>(false);
  const [userUuid, setUserUuid] = useState<string>("");
  const [userPaymentPlan, setUserPaymentPlan] = useState<PaymentPlan>();
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [activeAutomations, setActiveAutomations] = useState<number>(0);
  const [userInformation, setUserInformation] = useState<UserProfile | null>(
    null
  );
  const refreshAutomations = async () => {
    const { automations: fetchedAutomations } = await fetchUserAutomations(
      userUuid
    );

    setAutomations((prevAutomations) => {
      return prevAutomations.map(
        (prev) => fetchedAutomations.find((a) => a.uuid === prev.uuid) || prev
      );
    });
  };

  const sendUserToCreateNewAutomation = () => {
    router.push("/automation/create");
  };

  useEffect(() => {
    const loadAutomations = async () => {
      if (!userUuid) return;
      try {
        const { automations } = await fetchUserAutomations(userUuid);
        setAutomations(automations);
      } catch (e) {
        console.error(e);
      }
    };
    loadAutomations();
  }, [userUuid]);

  useEffect(() => {
    const checkUserActiveAutomationsCount = () => {
      setActiveAutomations(
        automations.filter((automation) => automation.is_active).length
      );
    };
    checkUserActiveAutomationsCount();
  }, [automations]);

  useEffect(() => {
    const getSession = async () => {
      const uuid = await checkUserSession();
      if (uuid) {
        setUserUuid(uuid);
      } else {
        console.log("no user");
      }
    };
    getSession();
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      if (!userUuid) return;
      try {
        const data = await fetchUserInfo(userUuid);

        setUserInformation(data);
      } catch (e) {
        console.error(e);
      }
    };
    loadUser();
  }, [userUuid]);

  useEffect(() => {
    const loadPlan = async () => {
      if (!userInformation?.payment_plan) return;
      try {
        const data = await fetchPaymentPlan(userInformation.payment_plan);
        setUserPaymentPlan(data);
      } catch (e) {
        console.error(e);
      }
    };
    loadPlan();
  }, [userInformation]);

  useEffect(() => {
    const loadAutomations = async () => {
      if (!userUuid) return;
      try {
        const { automations } = await fetchUserAutomations(userUuid);
        setAutomations(automations);
      } catch (e) {
        console.error(e);
      }
    };
    loadAutomations();
  }, [userUuid]);

  useEffect(() => {
    const enforceLimit = async () => {
      if (!userUuid || !userPaymentPlan || automations.length === 0) return;
      try {
        const updated = await enforceAutomationLimit(
          userUuid,
          automations,
          userPaymentPlan.available_automations
        );
        setAutomations(updated);
      } catch (e) {
        console.error(e);
      }
    };
    enforceLimit();
  }, [automations, userPaymentPlan]);

  useEffect(() => {
    const enforceAutomationLimit = async () => {
      if (!userUuid || !userPaymentPlan || automations.length === 0) return;

      const activeCount = automations.filter((a) => a.is_active).length;

      if (activeCount > userPaymentPlan.available_automations) {
        const activeAutomationUuids = automations
          .filter((a) => a.is_active)
          .map((a) => a.uuid);

        const { error } = await supabase
          .from("automation")
          .update({ is_active: false })
          .in("uuid", activeAutomationUuids);

        if (error) {
          console.error("Failed to deactivate automations:", error);
          return;
        }

        // Refetch automations to update UI
        const { data, error: refetchError } = await supabase
          .from("automation")
          .select("uuid, automation_name, is_active, user_uuid")
          .eq("user_uuid", userUuid);

        if (refetchError) {
          console.error("Error refetching automations:", refetchError);
          return;
        }

        setAutomations(data || []);
      }
    };

    enforceAutomationLimit();
  }, [automations, userPaymentPlan]);

  const goToAdminPage = () => {
    setAdminActive(true);
  };
  const goToUserPage = () => {
    setAdminActive(false);
  };
  if (!userInformation) {
    return <LoadingScreen></LoadingScreen>;
  }

  if (adminActive === true) {
    return (
      <div style={{ position: "relative" }}>
        <AdminPage></AdminPage>
        <StyledGoToAdminPageButton onClick={goToUserPage}>
          User
        </StyledGoToAdminPageButton>
      </div>
    );
  }
  if (adminActive === false) {
    return (
      <AuthCheck>
        <StyledDashboard>
          {userInformation.role === "admin" && (
            <StyledGoToAdminPageButton onClick={goToAdminPage}>
              Admin
            </StyledGoToAdminPageButton>
          )}
          <StyledHowManyAutomationsActiveSection>
            <StyledHowManyAutomationsActiveNumber>
              {activeAutomations}/{userPaymentPlan?.available_automations}
            </StyledHowManyAutomationsActiveNumber>
            <StyledHowManyAutomationsActiveText>
              Active
            </StyledHowManyAutomationsActiveText>
          </StyledHowManyAutomationsActiveSection>
          <StyledBackgroundAccent></StyledBackgroundAccent>
          <LogoutButton></LogoutButton>
          <StyledDashboardHeader>My automations</StyledDashboardHeader>
          <StyledDashboardAutomationContainer>
            {automations.map((automation) => (
              <AutomationCard
                key={automation.uuid}
                automation={automation}
                userUuid={userUuid}
                availableAutomationLimit={
                  userPaymentPlan?.available_automations || 0
                }
                updateAutomations={refreshAutomations}
              />
            ))}
            {automations.length < automationsHardLimit && (
              <StyledAddAutomationCard
                onClick={() => {
                  sendUserToCreateNewAutomation();
                }}
              >
                <StyledAddAutomationImage></StyledAddAutomationImage>

                <StyledAddAutomationTextContainer>
                  <StyledAddAutomationText>
                    New automation
                  </StyledAddAutomationText>
                </StyledAddAutomationTextContainer>
              </StyledAddAutomationCard>
            )}
          </StyledDashboardAutomationContainer>
        </StyledDashboard>
      </AuthCheck>
    );
  }
};

export default Dashboard;
