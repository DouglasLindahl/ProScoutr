"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import supabase from "../../../supabase";
import colors from "../../../theme";
import InputField from "@/components/inputField/page";

const StyledPage = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: ${colors.background};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.text};
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 40px;
  border-radius: 20px;
  color: ${colors.background};
  min-width: 300px;
`;

const StyledButton = styled.button`
  cursor: pointer;
  background-color: ${colors.text};
  color: ${colors.background};
  border-radius: 13px;
  height: 48px;
  padding: 0 32px;
  font-weight: bold;
  border: none;
  font-size: 24px;

  &:hover {
    background-color: ${colors.primary};
  }
`;

const StyledMessage = styled.div`
  font-size: 16px;
`;

const ResetPassword = () => {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const validateSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!data.session || error) {
        setError("Session not found. Use the reset link from your email.");
      }
    };
    validateSession();
  }, []);

  const handleReset = async () => {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setError(null);
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    }
  };

  return (
    <StyledPage>
      <StyledContainer>
        <h2>Reset Your Password</h2>
        <InputField
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <StyledButton onClick={handleReset}>Update Password</StyledButton>
        {error && (
          <StyledMessage style={{ color: colors.red }}>{error}</StyledMessage>
        )}
        {success && (
          <StyledMessage>
            Password updated! Redirecting to login...
          </StyledMessage>
        )}
      </StyledContainer>
    </StyledPage>
  );
};

export default ResetPassword;
