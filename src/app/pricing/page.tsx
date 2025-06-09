"use client";
import { useEffect, useState } from "react";
import { fetchPaymentPlans } from "../utils";
import styled, { css } from "styled-components";
import colors from "../../../theme";
import { useRouter } from "next/navigation";
import questionMark from "../../../public/questionMark.svg";

interface PaymentPlan {
  id: string;
  plan_name: string;
  plan_description: string;
  price: number;
  available_automations: number;
  is_active: boolean;
}

const StyledPricingPage = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${colors.background};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 68px;
`;

const StyledGreenText = styled.span`
  color: ${colors.primary};
`;

const StyledPricingHeader = styled.h1`
  font-size: 60px;
  text-align: center;
  color: ${colors.text};
  padding-bottom: 24px;
`;

const StyledPricingSubHeader = styled.h2`
  text-align: center;
  color: ${colors.text};
  font-weight: 200;
  text-decoration: underline;
  text-underline-offset: 4px;
  &:hover {
    cursor: pointer;
  }
`;

const StyledPricingCardsSection = styled.div`
  display: flex;
  gap: 40px;
  margin: 40px 0;
`;

const StyledPricingCtaSection = styled.div``;

const StyledPricingCtaButton = styled.button`
  font-size: 30px;
  font-weight: bold;
  padding: 12px 24px;
  border-radius: 13px;
  color: ${colors.background};
  &:hover {
    cursor: pointer;
  }
  border: none;
`;

const StyledPricingCard = styled.div<{ mostPopular?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 60px;
  padding: 30px 60px;
  border-radius: 13px;
  transition: all 0.3s ease;
  border: 2px solid white;

  ${({ mostPopular }) =>
    mostPopular &&
    css`
      border: 3px solid ${colors.primary};
      transform: scale(1.1);
      box-shadow: 0px 0px 25px ${colors.primary};
    `}
`;

const StyledPricingCardHeader = styled.h3`
  font-size: 30px;
  background-color: ${colors.text};
  color: ${colors.background};
  padding: 6px 12px;
  border-radius: 13px;
`;

const StyledPricingCardPrice = styled.div`
  color: ${colors.text};
  display: flex;
  flex-direction: column;
`;

const StyledPricingCardPriceCurrencySign = styled.span`
  font-size: 60px;
  font-weight: bold;
`;

const StyledPricingCardPriceAmount = styled.span`
  font-size: 120px;
  font-weight: bold;
  line-height: 1;
  margin-bottom: -10px;
  display: inline-block;
`;

const StyledPricingCardPriceRepeat = styled.span`
  font-size: 30px;
  text-align: center;
`;

const StyledPricingCardAutomationsAmount = styled.p`
  font-size: 20px;
  color: ${colors.text};
  font-weight: bold;
`;

const StyledSubHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const StyledMostPopularBadge = styled.div`
  position: absolute;
  top: -16px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${colors.primary};
  color: ${colors.background};
  font-size: 16px;
  font-weight: 900;
  padding: 4px 10px;
  border-radius: 6px;
`;

const StyledHowManyAutomationPopup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 80%;
  z-index: 10;
  background-color: ${colors.background};
  padding: 56px 96px;
  overflow: scroll;
  color: ${colors.text};
  h1 {
    font-size: 50px;
    text-align: center;
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

const Pricing = () => {
  const router = useRouter();
  const [paymentPlans, setPaymentPlans] = useState<PaymentPlan[]>([]);
  const [showPopup, setShowPopup] = useState(true);
  const mostPopularPlanId = "Pro";

  const sendUserToRegisterPage = () => {
    router.push("/register");
  };

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const data: PaymentPlan[] = await fetchPaymentPlans();
        const activePlans = data
          .filter((plan) => plan.is_active)
          .sort((a, b) => a.price - b.price);
        setPaymentPlans(activePlans);
      } catch (e) {
        console.error(e);
      }
    };
    loadPlans();
  }, []);

  return (
    <StyledPricingPage>
      {showPopup && (
        <StyledDarkBackground
          onClick={() => setShowPopup(false)}
        ></StyledDarkBackground>
      )}
      {showPopup && (
        <StyledHowManyAutomationPopup>
          <h1>How many automations do I need?</h1>
          <p>
            When choosing your plan, it’s important to understand how
            automations work and how many you might need to get the most value
            from your scouting or player promotion efforts. This guide will help
            you decide which plan is right for you based on your goals, how
            broad or specific your searches are, and how frequently you want to
            receive player reports.
          </p>
          <h2>What Is an Automation?</h2>
          <p>
            An automation is a customized setup that runs in the background and
            sends you automated player reports based on your preferences.
          </p>
          <p>Each automation includes:</p>
          <li>
            <ul>Up to 3 preferred positions (1st, 2nd, and 3rd)</ul>
            <ul>
              Filters like age, height, footedness, league, nationality, etc.
            </ul>
            <ul>A custom report frequency (maximum once every 7 days)</ul>
          </li>

          <h3>Each automation works independently - meaning:</h3>
          <ul>
            <li>You can have different criteria per automation</li>
            <li>
              You can receive reports from different automations on different
              days/times
            </li>
            <li>
              You can focus on specific roles or tactical needs in each one
            </li>
          </ul>
          <h2>How Many Do You Really Need?</h2>
          <p>
            The answer depends on how broad or narrow you want your search to
            be. Here are a few things to consider. Want focused, high-relevance
            suggestions? Use 1 automation per position or role.
          </p>
          <h2>Example:</h2>
          <ul>
            <li>Automation 1: Right-Backs aged 18–22 from Scandinavia</li>
            <li>
              Automation 2: Centre-Backs aged 24–28 from League One and League
              Two
            </li>
            <li>Automation 3: Strikers aged 20–25 from the National League</li>
          </ul>
          <p>
            This keeps each search narrow and ensures the players suggested
            match very specific needs. Want broader searches with fewer
            automations? Use multiple positions or wider filters in a single
            automation.
          </p>
          <h2>Example:</h2>
          <ul>
            <li>
              Automation 1: Any defender (CB, LB, RB), aged 20–28, from any
              English league
            </li>
          </ul>
          <p>
            This works if you're happy to get more general reports and review a
            wider pool of players.
          </p>
          <h2>Plans & Pricing</h2>
          <p>
            The Basic Plan (£10/month - 1 automation) is ideal for small
            agencies or individual agents targeting one specific role. The Pro
            Plan (£25/month - 5 automations) is perfect for agencies covering
            multiple positions, clubs, or leagues. The Max Plan (£50/month - 10
            automations) is designed for full-service scouting operations or
            agencies working across countries or competition levels. You can
            always upgrade later if you realize you need more automation slots.
          </p>
          <h2>Pro Tip: Be Specific for Better Results</h2>
          <p>
            Each automation lets you search up to 3 positions, but this broadens
            your search. If you want reports that focus on very specific types
            of players, it’s often better to:
          </p>
          <ul>
            <li>Set up separate automations for different positions</li>
            <li>
              Use more refined filters (e.g., preferred foot, height,
              nationality)
            </li>
            <li>
              Match each automation to a different club need, scouting area, or
              tactical profile
            </li>
          </ul>
          <p>
            This gives you more control and delivers higher-quality suggestions
            in each report.
          </p>
          <h2>Example Use Cases</h2>
          <h3>
            Scenario A: You're targeting full-backs and wingers. Choose Pro Plan
            with 4 automations:
          </h3>
          <ol>
            <li>Right-Backs</li>
            <li>Left-Backs</li>
            <li>Right Wingers</li>
            <li>Left Wingers</li>
          </ol>
          <p>
            Scenario B: You're a national scout covering all positions in one
            region Choose Max Plan with 10 automations split by position and
            region (e.g., STs in Scandinavia, CBs in UK, etc.)
          </p>
          <h2>Still Not Sure?</h2>
          <p>
            If you're unsure which plan is right for you, start with Basic and
            scale up as your needs grow. You can upgrade anytime, and we’ll help
            you configure your automations for maximum efficiency. Need help
            setting up your first automation? Just reach out - we’re happy to
            assist.
          </p>
        </StyledHowManyAutomationPopup>
      )}
      <div>
        <StyledPricingHeader>
          Let <StyledGreenText>ProScoutr</StyledGreenText> do the job.
        </StyledPricingHeader>
        <StyledSubHeaderWrapper
          onClick={() => {
            setShowPopup(true);
          }}
        >
          <img src={questionMark.src} alt="Help Icon" width={44} height={44} />

          <StyledPricingSubHeader>
            How many automations do I need?
          </StyledPricingSubHeader>
        </StyledSubHeaderWrapper>
      </div>

      <StyledPricingCardsSection>
        {paymentPlans.map((plan) => (
          <StyledPricingCard
            key={plan.id}
            mostPopular={plan.plan_name === mostPopularPlanId}
          >
            {plan.plan_name === mostPopularPlanId && (
              <StyledMostPopularBadge>Most Popular</StyledMostPopularBadge>
            )}
            <StyledPricingCardHeader>
              {plan.plan_name.toUpperCase()} PLAN
            </StyledPricingCardHeader>
            <StyledPricingCardPrice>
              <StyledPricingCardPriceAmount>
                <StyledPricingCardPriceCurrencySign>
                  £
                </StyledPricingCardPriceCurrencySign>
                {plan.price}
              </StyledPricingCardPriceAmount>
              <StyledPricingCardPriceRepeat>
                /month
              </StyledPricingCardPriceRepeat>
            </StyledPricingCardPrice>
            <StyledPricingCardAutomationsAmount>
              {plan.available_automations} AUTOMATIONS
            </StyledPricingCardAutomationsAmount>
          </StyledPricingCard>
        ))}
      </StyledPricingCardsSection>

      <StyledPricingCtaSection>
        <StyledPricingCtaButton
          onClick={() => {
            sendUserToRegisterPage();
          }}
        >
          Create free account
        </StyledPricingCtaButton>
      </StyledPricingCtaSection>
    </StyledPricingPage>
  );
};

export default Pricing;
