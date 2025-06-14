// components/LoadingScreen.tsx
import React from "react";
import styled, { keyframes } from "styled-components";

const LoadingScreenContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: white;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  width: 64px;
  height: 64px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #3b82f6; /* Blue */
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const LoadingScreen = () => {
  return (
    <LoadingScreenContainer>
      <Spinner />
    </LoadingScreenContainer>
  );
};

export default LoadingScreen;
