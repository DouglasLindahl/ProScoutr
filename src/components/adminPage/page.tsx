import { useEffect, useState } from "react";
import supabase from "../../../supabase";
import styled from "styled-components";
import colors from "../../../theme";
import exit from "../../../public/exit.svg";

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
  color: ${colors.background};
  font-weight: 600;
  transition: background-color 0.2s;

  &:hover {
    background-color: darken(${colors.primary}, 10%);
  }
`;

const CardGrid = styled.div<{ emailEditorVisible: boolean }>`
  display: ${({ emailEditorVisible }) =>
    emailEditorVisible ? "flex" : "grid"};
  flex-direction: ${({ emailEditorVisible }) =>
    emailEditorVisible ? "column" : "initial"};
  grid-template-columns: ${({ emailEditorVisible }) =>
    emailEditorVisible ? "none" : "repeat(auto-fill, minmax(300px, 1fr))"};
  gap: 20px;
  width: ${({ emailEditorVisible }) => (emailEditorVisible ? "45%" : "100%")};
`;

const PageWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const LeftPanel = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const RightPanel = styled.div`
  height: 100vh;
  width: 50vw;
  overflow-y: scroll;
  top: 0;
  right: 0;
  position: fixed;
  flex: 1;
  background: #1e1e2f;
  color: white;
  padding: 20px;
  border-radius: 13px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  input {
    padding: 6px;
  }
`;

const HtmlInput = styled.textarea`
  width: 100%;
  min-height: 500px;
  margin-bottom: 12px;
  border-radius: 8px;
  padding: 12px;
  font-family: monospace;
  font-size: 14px;
  background: #121224;
  color: white;
  border: none;
  resize: vertical;
`;

const SendButton = styled.button`
  padding: 10px 18px;
  background-color: ${colors.primary};
  border: none;
  border-radius: 10px;
  color: ${colors.background};
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background-color: darken(${colors.primary}, 10%);
  }
`;
const StyledExitIcon = styled.img`
  position: absolute;
  top: 30px;
  right: 30px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  z-index: 11;
`;

export default function AdminPage() {
  const [allAutomations, setAllAutomations] = useState<Automation[]>([]);
  const [selectedTab, setSelectedTab] = useState<"all" | "active" | "inactive">(
    "all"
  );
  const [emailState, setEmailState] = useState<
    Record<string, { subject: string; body: string }>
  >({});
  const [sendStatus, setSendStatus] = useState<Record<string, string>>({});

  const [sendEmailToUserEmail, setSendEmailToUserEmail] = useState<string>("");

  const [emailEditorVisible, setEmailEditorVisible] = useState(false);
  const [selectedAutomation, setSelectedAutomation] =
    useState<Automation | null>(null);

  const openSendEmailPage = (automation: Automation) => {
    if (emailEditorVisible && selectedAutomation == automation) {
      setEmailEditorVisible(false);
      return;
    }
    if (
      !automation.user_profiles?.email ||
      !automation.user_profiles?.email.includes("@")
    ) {
      console.log("failed");
      return;
    }

    setSelectedAutomation(automation);
    setSendEmailToUserEmail(automation.user_profiles?.email || "asd");
    setEmailEditorVisible(true);
  };

  const updateEmailField = (
    uuid: string,
    field: "subject" | "body",
    value: string
  ) => {
    setEmailState((prev) => ({
      ...prev,
      [uuid]: {
        ...prev[uuid],
        [field]: value,
      },
    }));
  };

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

  const headerHtml = `
  <div style="padding: 20px; background-color: #f2f2f2; text-align: center;">
    <h2 style="margin: 0; font-family: sans-serif;">Scouting Report from ProScoutr</h2>
  </div>
`;

  const footerHtml = `
  <div style="padding: 20px; background-color: #f9f9f9; text-align: center; font-size: 12px; color: #666;">
    <p>Thanks for using <strong>ProScoutr</strong>!</p>
<p>For more insights or support, visit <a href="https://proscoutr.com" target="_blank" rel="noopener noreferrer">proscoutr.com</a></p>

  </div>
`;
  const sendEmailToUser = async (
    automation: Automation,
    header: string,
    footer: string
  ) => {
    const user = automation.user_profiles;
    const email = user?.email;
    const uuid = automation.uuid;
    const subject = emailState[uuid]?.subject || "Your Weekly Report";
    const rawBody = emailState[uuid]?.body || "<p>No content provided.</p>";

    const html = `${header}${rawBody}${footer}`;

    if (!email) return;

    setSendStatus((prev) => ({ ...prev, [uuid]: "Sending..." }));

    try {
      const res = await fetch("/api/send-custom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: email, subject, html }),
      });

      const data = await res.json();
      console.log("EMAIL SEND RESPONSE:", data);
      if (res.ok) {
        setSendStatus((prev) => ({ ...prev, [uuid]: "✅ Sent" }));
      } else {
        setSendStatus((prev) => ({ ...prev, [uuid]: `❌ ${data.error}` }));
      }
    } catch (err) {
      console.log(err);
      setSendStatus((prev) => ({ ...prev, [uuid]: "❌ Failed to send" }));
    }
  };

  const copyPromptToClipboard = (automation: Automation) => {
    const prompt = `
You are a football scouting assistant working for a recruitment team that serves multiple football agents. Each agent provides specific scouting preferences in JSON format. Based on this input, your task is to identify and recommend 4 players that meet their requirements as closely as possible.

Each recommended player should be outputted with: full name, age, nationality, current team, 1st position, alternate position, height, weight, preferred foot, playing style, league, VISA eligibility, and also “notes” where you can insert potential mismatches between the suggested player and the agent’s original criteria. Smaller mismatches are okay as long as you think the player seems like a good match. In the HTML structure, “notes” should be formatted as smaller text below all the other data of the player. VISA Eligibility should be based on nationality and likely eligibility for work permits in common leagues, e.g., EU/UK.

After the players have been identified, the suggestions should be sent to the agent via e-mail. Please ONLY provide me with HTML code (a 2x2 grid) that will be inserted into the e-mail. This grid should only consist of the player data - no text around it.

Here is the agent's JSON input:

${JSON.stringify(
  {
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
    gender: automation.gender,
    playing_style: automation.playing_style,
  },
  null,
  2
)}
`;

    navigator.clipboard
      .writeText(prompt)

      .catch((err) => {
        console.error("Failed to copy prompt", err);
      });
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
            <CopyButton onClick={() => copyPromptToClipboard(automation)}>
              Copy Propmpt
            </CopyButton>
            <CopyButton onClick={() => openSendEmailPage(automation)}>
              Email editor
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
      <PageWrapper>
        <LeftPanel>
          <CardGrid emailEditorVisible={emailEditorVisible}>
            {renderAutomationCards(getFilteredAutomations())}
          </CardGrid>
        </LeftPanel>

        {emailEditorVisible && selectedAutomation && (
          <RightPanel>
            <a
              style={{
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                color: colors.primary,
              }}
              target="_blank"
              href="https://chatgpt.com/g/g-PzvCAJdRZ-footystats-soccer-football-stats-gpt/c/684f6e02-3f50-8000-aad8-e1fb4eba5c82"
            >
              Link to GPT
            </a>
            <StyledExitIcon
              src={exit.src}
              alt="Exit Button"
              onClick={() => setEmailEditorVisible(false)}
            />
            <h3>
              Sending Email to{" "}
              {selectedAutomation?.user_profiles?.first_name +
                " " +
                selectedAutomation?.user_profiles?.last_name}
            </h3>
            <div>
              <input
                type="text"
                value={sendEmailToUserEmail}
                onChange={(e) => {
                  setSendEmailToUserEmail(e.target.value);
                }}
              />
            </div>
            <input
              style={{ width: "100%", padding: "8px", marginTop: "12px" }}
              placeholder="Email Subject"
              value={
                emailState[selectedAutomation.uuid]?.subject ||
                "ProScoutr - Your weekly report of players"
              }
              onChange={(e) =>
                updateEmailField(
                  selectedAutomation.uuid,
                  "subject",
                  e.target.value
                )
              }
            />
            <HtmlInput
              placeholder="Enter HTML content here"
              value={emailState[selectedAutomation.uuid]?.body || ""}
              onChange={(e) =>
                updateEmailField(
                  selectedAutomation.uuid,
                  "body",
                  e.target.value
                )
              }
            />

            <div style={{ marginTop: "16px" }}>
              <h4>Email Preview</h4>

              <div
                style={{
                  border: "1px solid #ccc",
                  padding: "12px",
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                  marginTop: "8px",
                  color: "black",
                }}
                dangerouslySetInnerHTML={{
                  __html:
                    headerHtml +
                    (emailState[selectedAutomation.uuid]?.body ||
                      "<p>(No content)</p>") +
                    footerHtml,
                }}
              />
            </div>

            <p style={{ marginTop: "8px", fontSize: "14px", color: "gray" }}>
              {sendStatus[selectedAutomation.uuid] || ""}
            </p>
            <SendButton
              onClick={() => {
                sendEmailToUser(selectedAutomation, headerHtml, footerHtml);
              }}
            >
              Send email
            </SendButton>
          </RightPanel>
        )}
      </PageWrapper>
    </StyledAdminPage>
  );
}
