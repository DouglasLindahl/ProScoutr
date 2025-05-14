"use client";
import styled from "styled-components";
import colors from "./../../theme";
import arrowDown from "../../public/arrowDown.svg";
import greenShapes from "../../public/greenShapes.svg";

const StyledLandingPage = styled.section`
  background-color: ${colors.background};
`;

const StyledHero = styled.section`
  position: relative;

  color: ${colors.text};
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3.5rem;
  padding: 2rem;
  z-index: 1;

  @media (max-width: 768px) {
    gap: 2rem;
    padding: 1.5rem 1rem;
  }
`;

const StyledHeroHeaderSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StyledHeroHeader = styled.h1`
  font-size: 4.375rem; /* 70px */
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const StyledHeroSubHeader = styled.h2`
  font-size: 3.75rem; /* 60px */
  font-weight: 200;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const StyledHeroTestSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: center;
`;

const StyledHeroTestSectionHeader = styled.h3`
  font-size: 3.75rem; /* 60px */
  font-weight: 200;
  text-align: center;

  span {
    font-weight: 800;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const StyledHeroTestSectionTestContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
  justify-content: center;
  padding-bottom: 2rem;
`;

const StyledHeroTestSectionTestDescription = styled.section`
  padding: 1rem;
  font-size: 1.5rem;
  border: 2px solid ${colors.text};
  border-radius: 13px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    width: 100%;
  }
`;

const StyledHeroTestSectionTestButton = styled.button`
  padding: 1rem;
  font-size: 1.5rem;
  background-color: ${colors.secondary};
  color: ${colors.text};
  border: 2px solid ${colors.secondary};
  border-radius: 13px;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    width: 100%;
  }
`;

const StyledHeroNextButton = styled.button`
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

const StyledHeroNextButtonImage = styled.div`
  width: 70%;
  height: 70%;
  background: url(${arrowDown.src}) no-repeat center center;
  background-size: contain;
`;

const StyledHeroNextButtonText = styled.p`
  font-size: 2rem;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const StyledName = styled.span`
  color: ${colors.primary};
  font-weight: bold;
  text-shadow: 0 0 1px rgba(255, 255, 255, 0.25),
    0 0 1px rgba(255, 255, 255, 0.25), 0 0 20px rgba(255, 255, 255, 0.25);
`;

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
  z-index: 1;
  pointer-events: none;
`;

export default function Home() {
  return (
    <StyledLandingPage>
      <StyledBackgroundAccent></StyledBackgroundAccent>
      <StyledHero>
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
            <StyledHeroTestSectionTestButton>
              Test Automation
            </StyledHeroTestSectionTestButton>
          </StyledHeroTestSectionTestContainer>
          <StyledHeroNextButton>
            <StyledHeroNextButtonImage></StyledHeroNextButtonImage>
          </StyledHeroNextButton>
          <StyledHeroNextButtonText>
            What is ProScoutr?
          </StyledHeroNextButtonText>
        </StyledHeroTestSection>
      </StyledHero>
    </StyledLandingPage>
  );
}
