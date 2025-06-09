"use client";
import { useEffect, useState } from "react";
import { fetchPaymentPlans } from "../utils";
import styled, { css } from "styled-components";
import colors from "../../../theme";

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

const StyledPricingHeader = styled.h1`
  font-size: 60px;
  text-align: center;
  color: ${colors.text};
`;

const StyledPricingSubHeader = styled.h2`
  text-align: center;
  color: ${colors.text};
  font-weight: 200;
  text-decoration: underline;
  text-underline-offset: 4px;
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
`;

const StyledPricingCard = styled.div<{ mostPopular?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 60px;
  padding: 24px 60px;
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

const Pricing = () => {
  const [paymentPlans, setPaymentPlans] = useState<PaymentPlan[]>([]);

  const [mostPopularPlanId, setMostPopularPlanId] = useState<string | null>(
    "Pro"
  );

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
      <div>
        <StyledPricingHeader>Let ProScoutr do the job.</StyledPricingHeader>
        <StyledPricingSubHeader>
          How many automations do I need?
        </StyledPricingSubHeader>
      </div>

      <StyledPricingCardsSection>
        {paymentPlans.map((plan) => (
          <StyledPricingCard
            key={plan.id}
            mostPopular={plan.plan_name === mostPopularPlanId}
          >
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
        <StyledPricingCtaButton>Create free account</StyledPricingCtaButton>
      </StyledPricingCtaSection>
    </StyledPricingPage>
  );
};

export default Pricing;
