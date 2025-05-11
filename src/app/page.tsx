"use client";
import styles from "./page.module.css";
import colors from "./../../theme";
import styled from "styled-components";

const StyledLandingPage = styled.section``;
const StyledHero = styled.section`
  color: ${colors.text};
  width: 100vw;
  height: 100vh;
  background-color: ${colors.background};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StyledHeroInfoSection = styled.section``;
const StyledHeroInfoHeader = styled.h1`
  font-weight: 400;
  font-size: 100px;
  padding: 239px;
  text-align: center;
`;
const StyledHeroInfoHeaderName = styled.span`
  color: ${colors.primary};

  font-weight: bold;
  text-shadow: 0 0 1px rgba(255, 255, 255, 0.25),
    0 0 1px rgba(255, 255, 255, 0.25), 0 0 20px rgba(255, 255, 255, 0.25);
`;

export default function Home() {
  return (
    <StyledLandingPage>
      <StyledHero>
        <StyledHeroInfoSection>
          <StyledHeroInfoHeader>
            Never miss a rising star again with{" "}
            <StyledHeroInfoHeaderName>ProScoutr</StyledHeroInfoHeaderName>
          </StyledHeroInfoHeader>
          <p>
            Find the next talents for you team with our automated scouting
            agents.
          </p>
          <div>
            <button>Get Early Access!</button>
            <button>What is ProScoutr?</button>
          </div>
        </StyledHeroInfoSection>
      </StyledHero>
    </StyledLandingPage>
  );
}
