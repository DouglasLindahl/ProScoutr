"use client";
import styled from "styled-components";
import colors from "./../../theme";
import arrowDown from "../../public/arrowDown.svg";
import greenShapes from "../../public/greenShapes.svg";
import ProScoutrWebsiteReportDesign from "../../public/ProScoutrWebsiteReportDesign.svg";
import exit from "../../public/exit.svg";
import { RefObject, useRef, useState } from "react";
import InputField from "@/components/inputField/page";
import { useRouter } from "next/navigation";
import {
  footerHtml,
  freePlayerSuggestionsHtml,
  headerHtml,
  isValidEmail,
} from "./utils";

const StyledLandingPage = styled.section`
  background-color: ${colors.background};
  position: relative;
  z-index: 0;
  isolation: isolate; /* Prevents background effects like blend modes from leaking through */
`;

const StyledHero = styled.section`
  position: relative;
  color: ${colors.text};
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 80px;
  justify-content: space-between;
  align-items: center;
  gap: 56px;
  z-index: 1;

  @media (max-width: 768px) {
    gap: 32px;
    padding: 24px 16px;
  }
`;

const StyledHeroHeaderSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const StyledHeroHeader = styled.h1`
  font-size: 70px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 40px;
  }
`;

const StyledHeroSubHeader = styled.h2`
  font-size: 50px;
  font-weight: 200;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const StyledHeroTestSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 32px;
  justify-content: center;
  align-items: center;
`;

const StyledHeroTestSectionHeader = styled.h3`
  font-size: 60px;
  font-weight: 200;
  text-align: center;

  span {
    font-weight: 800;
  }

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const StyledHeroTestSectionTestContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  width: 100%;
  justify-content: center;
  padding-bottom: 32px;
`;

const StyledHeroTestSectionTestDescription = styled.section`
  padding: 16px;
  font-size: 24px;
  border: 2px solid ${colors.text};
  border-radius: 13px;
  text-align: center;
  user-select: none;
  @media (max-width: 768px) {
    font-size: 19.2px;
    width: 100%;
  }
`;

const StyledHeroTestSectionTestButton = styled.button`
  padding: 16px;
  font-size: 24px;
  background-color: ${colors.secondary};
  color: ${colors.text};
  border: 2px solid ${colors.secondary};
  border-radius: 13px;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 19.2px;
    width: 100%;
  }
`;

const StyledNextButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const StyledNextButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  background-color: ${colors.text};
  border: none;
  border-radius: 13px;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
  }
`;

const StyledNextButtonImage = styled.div`
  width: 70%;
  height: 70%;
  background: url(${arrowDown.src}) no-repeat center center;
  background-size: contain;
`;

const StyledNextButtonText = styled.p`
  font-size: 32px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const StyledName = styled.span`
  color: ${colors.primary};
  font-weight: bold;
  text-shadow:
    0 0 1px rgba(255, 255, 255, 0.25),
    0 0 1px rgba(255, 255, 255, 0.25),
    0 0 20px rgba(255, 255, 255, 0.25);
`;

const StyledBackgroundAccent = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${greenShapes.src});
  background-color: ${colors.background}; /* Add a fallback solid background */
  background-repeat: repeat;
  background-position: top left;
  background-size: cover;
  z-index: -1; /* Lower z-index so it goes beneath all other content */
  pointer-events: none;
`;

const StyledHowDoesItWorkSection = styled.section`
  color: ${colors.text};
  width: 100%;
  min-height: 100vh;
  padding: 80px;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
`;

const StyledHowDoesItWorkHeader = styled.h1`
  font-size: 70px;
  font-weight: bold;
  text-align: center;
`;

const StyledHowDoesItWorkTextSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  & div {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const StyledHowDoesItWorkTextCta = styled.a`
  font-size: 50px;
  font-weight: bold;
  text-align: center;
  text-decoration: underline;
  text-underline-offset: 8px;
  &:hover {
    cursor: pointer;
  }
`;

const StyledHowDoesItWorkTextHeader = styled.h1`
  font-size: 50px;
  text-align: center;
`;
const StyledHowDoesItWorkText = styled.p`
  font-size: 30px;
  text-align: center;
`;
const StyledGreenText = styled.span`
  color: ${colors.primary};
  font-weight: bold;
`;
const StyledBoldText = styled.span`
  font-weight: bold;
`;

const StyledWhatIsProScoutrSection = styled.section`
  color: ${colors.text};
  width: 100%;
  min-height: 100vh;
  padding: 80px;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;

  @media (max-width: 768px) {
    padding: 24px 16px;
    gap: 32px;
  }
`;

const StyledWhatIsProScoutrMainSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;
const StyledWhatIsProScoutrInfoSection = styled.section`
  width: 100%;
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const StyledWhatIsProScoutrInfoTextSection = styled.section`
  width: 60%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledWhatIsProScoutrImageSection = styled.section`
  width: 40%;

  @media (max-width: 768px) {
    width: 100%;
    height: 300px;
  }
`;

const StyledWhatIsProScoutrImage = styled.div`
  width: 100%;
  height: 100%;
  background: url(${ProScoutrWebsiteReportDesign.src}) no-repeat center center;
  background-size: contain;
  z-index: 0;
`;
const StyledWhatIsProScoutrHeaderSection = styled.section`
  width: 100%;
`;
const StyledWhatIsProScoutrHeader = styled.h1`
  font-size: 70px;
  font-weight: bold;
`;
const StyledWhatIsProScoutrInfoText = styled.p`
  font-size: 30px;
  padding-bottom: 30px;
`;
const StyledWhatIsProScoutrInfoTextTwo = styled.p`
  font-size: 30px;
`;
const StyledWhatIsProScoutrViewPricingButton = styled.button`
  font-size: 20px;
  background-color: ${colors.secondary};
  border: none;
  width: 20%;
  padding: 12px;
  border-radius: 13px;
  font-weight: bold;
  color: ${colors.text};
  &:hover {
    cursor: pointer;
  }
`;

const StyledWhyProScoutrSection = styled.section`
  color: ${colors.text};
  width: 100%;
  min-height: 100vh;
  padding: 80px;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
`;
const StyledWhyProScoutrInfoSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const StyledWhyProScoutrInfoText = styled.p`
  text-align: center;
  font-size: 30px;
`;
const StyledWhyProScoutrHeader = styled.h1`
  font-size: 60px;
`;
const StyledWhyProScoutrSubHeader = styled.h2`
  text-align: center;
  font-size: 30px;
`;

const StyledFAQSection = styled.section`
  color: ${colors.text};
  width: 100%;
  min-height: 100vh;
  padding: 80px;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
`;
const StyledFAQInfoSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const StyledFAQInfoText = styled.p`
  text-align: center;
  font-size: 30px;
`;
const StyledFAQHeader = styled.h1`
  font-size: 60px;
`;
const StyledFAQCtaButton = styled.button`
  font-size: 30px;
  padding: 24px 48px 24px 48px;
  background-color: ${colors.secondary};
  border: none;
  color: ${colors.text};
  font-weight: bold;
  border-radius: 13px;
  &:hover {
    cursor: pointer;
  }
`;

const StyledTestAutomationPopupWindow = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${colors.background};
  z-index: 10;
  border: 1px solid white;
  border-radius: 13px;
  padding: 64px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: center;
  align-items: center;
  img {
    position: fixed;
    top: 30px;
    right: 30px;
    &:hover {
      cursor: pointer;
    }
  }
`;
const StyledTestAutomationPopupWindowHeader = styled.h1`
  font-size: 50px;
  text-align: center;
  color: ${colors.text};
  width: 70%;
`;
const StyledTestAutomationPopupWindowForm = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto auto;
  gap: 24px;

  & > :nth-child(3) {
    grid-column: 1 / span 2;
    justify-self: center;
  }
`;

const StyledTestAutomationPopupWindowButton = styled.div`
  width: 100%;
  background-color: ${colors.secondary};
  padding: 16px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: ${colors.text};
  border-radius: 13px;
  &:hover {
    cursor: pointer;
  }
`;
const StyledDarkBackground = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: black;
  width: 100%;
  height: 100%;
  opacity: 90%;
  z-index: 5;
`;

const StyledLoginButton = styled.button`
  position: absolute;
  top: 30px;
  right: 30px;
  padding: 6px 12px;
  font-size: 24px;
  border-radius: 8px;
  border: none;
  font-weight: bold;
  z-index: 5;
  &:hover {
    cursor: pointer;
  }
`;

const StyledErrorText = styled.p`
  color: ${colors.red};
`;

export default function Home() {
  const router = useRouter();
  const heroRef = useRef<HTMLElement | null>(null);
  const whatIsRef = useRef<HTMLElement | null>(null);
  const howItWorksRef = useRef<HTMLElement | null>(null);
  const whyRef = useRef<HTMLElement | null>(null);
  const faqRef = useRef<HTMLElement | null>(null);
  const [testAutomationPopup, setTestAutomationPopup] = useState(false);
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [sendStatus, setSendStatus] = useState<string | null>(null);

  const copyInfoToHubspot = async () => {
    if (!userFirstName || !userLastName || !isValidEmail(userEmail)) return;

    try {
      await fetch("/api/hubspot-copy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: userFirstName,
          lastName: userLastName,
          email: userEmail,
        }),
      });
    } catch (err) {
      console.error("Failed to copy to HubSpot (silent):", err);
      // Optional: send error to Sentry, LogRocket, etc.
    }
  };

  const sendFreePlayerSuggestions = async () => {
    if (!userFirstName || !userLastName) {
      setSendStatus("Please enter your full name.");
      return;
    }

    if (!userEmail || !isValidEmail(userEmail)) {
      setSendStatus("Please enter a valid email address.");
      return;
    }

    const subject = "Your free player suggestions";
    const html = `${headerHtml}${freePlayerSuggestionsHtml}${footerHtml}`;

    setSendStatus("Sending...");

    copyInfoToHubspot();
    try {
      const res = await fetch("/api/send-custom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: userEmail, subject, html }),
      });

      const data = await res.json();
      console.log("EMAIL SEND RESPONSE:", data);

      if (res.ok) {
        setSendStatus("Sent");
      } else {
        setSendStatus(` ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      setSendStatus("Failed to send");
    }
  };

  const sendUserToRegisterPage = () => {
    router.push("/register");
  };
  const sendUserToPricingPage = () => {
    router.push("/pricing");
  };
  const scrollToSection = (ref: RefObject<HTMLElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <StyledLandingPage>
      <StyledLoginButton
        onClick={() => {
          router.push("/login");
        }}
      >
        Login
      </StyledLoginButton>
      {testAutomationPopup && (
        <StyledDarkBackground
          onClick={() => setTestAutomationPopup(false)}
        ></StyledDarkBackground>
      )}
      {testAutomationPopup && (
        <StyledTestAutomationPopupWindow>
          <img
            src={exit.src}
            alt="Exit Button"
            onClick={() => {
              setTestAutomationPopup(false);
            }}
          />
          <StyledTestAutomationPopupWindowHeader>
            Let us know who you are:
          </StyledTestAutomationPopupWindowHeader>
          <StyledTestAutomationPopupWindowForm>
            <InputField
              label="First name"
              type="text"
              value={userFirstName}
              onChange={(e) => setUserFirstName(e.target.value)}
            />
            <InputField
              label="Last name"
              type="text"
              value={userLastName}
              onChange={(e) => setUserLastName(e.target.value)}
            />
            <InputField
              label="Your e-mail address"
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </StyledTestAutomationPopupWindowForm>
          <StyledTestAutomationPopupWindowButton
            onClick={() => {
              sendFreePlayerSuggestions();
            }}
          >
            Get your player suggestions!
          </StyledTestAutomationPopupWindowButton>
          {sendStatus && <StyledErrorText>{sendStatus}</StyledErrorText>}
        </StyledTestAutomationPopupWindow>
      )}
      <StyledBackgroundAccent></StyledBackgroundAccent>
      <StyledHero ref={heroRef}>
        <StyledHeroHeaderSection>
          <StyledHeroSubHeader>FOOTBALL AGENTS & CLUBS:</StyledHeroSubHeader>
          <StyledHeroHeader>
            <StyledName>ProScoutr</StyledName> finds the next talents for your
            team. Automatically.
          </StyledHeroHeader>
        </StyledHeroHeaderSection>
        <StyledHeroTestSection>
          <StyledHeroTestSectionHeader>
            Test our automation <span>for free!</span>
          </StyledHeroTestSectionHeader>
          <StyledHeroTestSectionTestContainer>
            <StyledHeroTestSectionTestDescription>
              25-30 years old, 170-180cm, right-winger or striker
            </StyledHeroTestSectionTestDescription>
            <StyledHeroTestSectionTestButton
              onClick={() => {
                setTestAutomationPopup(true);
              }}
            >
              Test Automation
            </StyledHeroTestSectionTestButton>
          </StyledHeroTestSectionTestContainer>
          <StyledNextButtonContainer>
            <StyledNextButton onClick={() => scrollToSection(whatIsRef)}>
              <StyledNextButtonImage></StyledNextButtonImage>
            </StyledNextButton>
            <StyledNextButtonText>What is ProScoutr?</StyledNextButtonText>
          </StyledNextButtonContainer>
        </StyledHeroTestSection>
      </StyledHero>
      <StyledWhatIsProScoutrSection ref={whatIsRef}>
        <StyledWhatIsProScoutrHeaderSection>
          <StyledWhatIsProScoutrHeader>
            What is <StyledGreenText>ProScoutr</StyledGreenText>?
          </StyledWhatIsProScoutrHeader>
        </StyledWhatIsProScoutrHeaderSection>
        <StyledWhatIsProScoutrMainSection>
          <StyledWhatIsProScoutrInfoSection>
            <StyledWhatIsProScoutrInfoTextSection>
              <StyledWhatIsProScoutrInfoText>
                <StyledGreenText>ProScoutr</StyledGreenText> helps football
                agents and teams stay ahead of the game by delivering curated
                player suggestions straight to your inbox - based on your
                preferences, performance data, and AI-driven insights.
              </StyledWhatIsProScoutrInfoText>
              <StyledWhatIsProScoutrInfoTextTwo>
                No more manual database hunting.<br></br>
                <StyledBoldText>
                  Just smart, time-saving scouting.
                </StyledBoldText>
              </StyledWhatIsProScoutrInfoTextTwo>
            </StyledWhatIsProScoutrInfoTextSection>
            <StyledWhatIsProScoutrImageSection>
              <StyledWhatIsProScoutrImage></StyledWhatIsProScoutrImage>
            </StyledWhatIsProScoutrImageSection>
          </StyledWhatIsProScoutrInfoSection>
          <StyledWhatIsProScoutrViewPricingButton
            onClick={() => {
              sendUserToPricingPage();
            }}
          >
            View Pricing
          </StyledWhatIsProScoutrViewPricingButton>
        </StyledWhatIsProScoutrMainSection>

        <StyledNextButtonContainer>
          <StyledNextButton onClick={() => scrollToSection(howItWorksRef)}>
            <StyledNextButtonImage></StyledNextButtonImage>
          </StyledNextButton>
          <StyledNextButtonText>How does it work?</StyledNextButtonText>
        </StyledNextButtonContainer>
      </StyledWhatIsProScoutrSection>
      <StyledHowDoesItWorkSection ref={howItWorksRef}>
        <StyledHowDoesItWorkHeader>How does it work?</StyledHowDoesItWorkHeader>
        <StyledHowDoesItWorkTextSection>
          <div>
            <StyledHowDoesItWorkTextCta
              onClick={() => {
                sendUserToRegisterPage();
              }}
            >
              1. Create an account.
            </StyledHowDoesItWorkTextCta>
            <StyledHowDoesItWorkText>It&#39;s free.</StyledHowDoesItWorkText>
          </div>
          <div>
            <StyledHowDoesItWorkTextHeader>
              2. Tell us what you need.
            </StyledHowDoesItWorkTextHeader>

            <StyledHowDoesItWorkText>
              Select player metrics and positions that match your player avatar.
            </StyledHowDoesItWorkText>
          </div>
          <div>
            <StyledHowDoesItWorkTextHeader>
              <StyledGreenText>3. Done</StyledGreenText>
            </StyledHowDoesItWorkTextHeader>

            <StyledHowDoesItWorkText>
              You’ll receive weekly curated player reports in your inbox.
            </StyledHowDoesItWorkText>
          </div>
        </StyledHowDoesItWorkTextSection>
        <StyledNextButtonContainer>
          <StyledNextButton onClick={() => scrollToSection(whyRef)}>
            <StyledNextButtonImage></StyledNextButtonImage>
          </StyledNextButton>
          <StyledNextButtonText>Why ProScoutr?</StyledNextButtonText>
        </StyledNextButtonContainer>
      </StyledHowDoesItWorkSection>
      <StyledWhyProScoutrSection ref={whyRef}>
        <StyledWhyProScoutrHeader>
          Why <StyledGreenText>ProScoutr</StyledGreenText>?
        </StyledWhyProScoutrHeader>
        <StyledWhyProScoutrInfoSection>
          <StyledWhyProScoutrInfoText>
            <StyledBoldText>✅ Saves You Hours </StyledBoldText> – No more
            endless database searches.
          </StyledWhyProScoutrInfoText>
          <StyledWhyProScoutrInfoText>
            <StyledBoldText>✅ AI-Powered Recommendations</StyledBoldText> – Get
            insights tailored to your scouting needs.
          </StyledWhyProScoutrInfoText>
          <StyledWhyProScoutrInfoText>
            <StyledBoldText>✅ Stay Ahead of Competitors</StyledBoldText> – Spot
            rising stars before others do.
          </StyledWhyProScoutrInfoText>
          <StyledWhyProScoutrInfoText>
            <StyledBoldText>✅ Simple &amp; Hassle-Free</StyledBoldText> – No
            complex dashboards—just plug &amp; play.
          </StyledWhyProScoutrInfoText>

          <StyledWhyProScoutrSubHeader>
            ⏱ Ready to win your time back?
          </StyledWhyProScoutrSubHeader>
        </StyledWhyProScoutrInfoSection>
        <StyledNextButtonContainer>
          <StyledNextButton onClick={() => scrollToSection(faqRef)}>
            <StyledNextButtonImage></StyledNextButtonImage>
          </StyledNextButton>
          <StyledNextButtonText>
            Frequently asked questions
          </StyledNextButtonText>
        </StyledNextButtonContainer>
      </StyledWhyProScoutrSection>

      <StyledFAQSection ref={faqRef}>
        <StyledFAQHeader>Frequently asked questions</StyledFAQHeader>
        <StyledFAQInfoSection>
          <StyledFAQInfoText>
            <StyledBoldText>
              ❓ &ldquo;How do I know the data is reliable?&rdquo;
            </StyledBoldText>
            <br />
            ✔️ We use trusted football data sources and real-time stats to
            ensure accuracy.
          </StyledFAQInfoText>

          <StyledFAQInfoText>
            <StyledBoldText>
              ❓ &ldquo;Will this replace my scouting team?&rdquo;
            </StyledBoldText>
            <br />
            ✔️ No – ProScoutr enhances your scouting efforts, giving you a
            faster way to spot talent.
          </StyledFAQInfoText>

          <StyledFAQInfoText>
            <StyledBoldText>
              ❓ &ldquo;Do I need to set up anything?&rdquo;
            </StyledBoldText>
            <br />
            ✔️ Nope! Just sign up, set your preferences, and receive daily
            updates.
          </StyledFAQInfoText>
        </StyledFAQInfoSection>
        <StyledFAQCtaButton
          onClick={() => {
            sendUserToRegisterPage();
          }}
        >
          Get Early Access!
        </StyledFAQCtaButton>
      </StyledFAQSection>
    </StyledLandingPage>
  );
}
