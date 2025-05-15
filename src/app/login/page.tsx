"use client";
import { useState, FormEvent, useEffect } from "react";
import supabase from "../../../supabase";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import colors from "../../../theme";
import InputField from "@/components/inputField/page";
import arrow from "../../../public/arrow.svg";
import greenShapes from "../../../public/greenShapes.svg";

const StyledLoginPage = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: ${colors.background};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${colors.text};
`;
const StyledLoginSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledLoginButtonContainer = styled.section`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: top;
  & div {
  }
`;

const StyledErrorTextContainer = styled.div`
  width: 100%;
`;

const StyledLoginButton = styled.button`
  cursor: pointer;
  background-color: ${colors.text};
  border-radius: 13px;
  height: 64px;
  padding: 0px 50px;
  border: none;
  display: flex; /* So it lays out children like the image */
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${colors.primary};
  }
`;

const StyledLoginButtonImage = styled.div`
  background-size: contain;
  width: 22px;
  height: 43px;
  border: none;
`;
const StyledLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding-bottom: 30px;
  padding-top: 70px;
`;
const StyledExtraLinksSection = styled.section`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  gap: 30px;
`;
const StyledLoginHeader = styled.h1`
  font-size: 100px;
`;

const StyledBackgroundAccent = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-repeat: repeat;
  background-position: top left;
  background-size: cover;
  z-index: 1;
  pointer-events: none;
`;

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkUserSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        router.push("/dashboard");
      }
    };
    checkUserSession();
  }, [router]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <StyledLoginPage>
      <StyledBackgroundAccent
        style={{ backgroundImage: `url(${greenShapes.src})` }}
      ></StyledBackgroundAccent>
      <StyledLoginSection>
        <StyledLoginHeader>Login</StyledLoginHeader>

        <StyledLoginForm>
          <InputField
            label="E-mail address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </StyledLoginForm>
        <StyledLoginButtonContainer>
          <StyledExtraLinksSection>
            <a href="#">Forgot Password?</a>
            {error && (
              <StyledErrorTextContainer>
                <p style={{ color: "red" }}>{error}</p>
              </StyledErrorTextContainer>
            )}
          </StyledExtraLinksSection>
          <StyledLoginButton onClick={handleLogin}>
            <StyledLoginButtonImage
              style={{ backgroundImage: `url(${arrow.src})` }}
            ></StyledLoginButtonImage>
          </StyledLoginButton>
        </StyledLoginButtonContainer>
      </StyledLoginSection>
    </StyledLoginPage>
  );
};

export default Login;
