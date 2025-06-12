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
  p {
    font-size: 20px;
  }
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
  background-repeat: no-repeat; // Prevents repeating
  background-size: contain; // Ensures full image fits inside
  background-position: center; // Centers the image
  width: 40px; // or whatever size you need
  height: 40px;
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

const StyledCreateAccountButton = styled.button`
  position: fixed;
  bottom: 48px;
  border-radius: 13px;
  background-color: ${colors.white};
  color: ${colors.background};
  font-size: 24px;
  padding: 14px 24px 14px 24px;
  border: none;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;
const StyledForgotPasswordSection = styled.div`
  text-decoration: underline;
  text-underline-offset: 4px;
  white-space: nowrap;
`;

const StyledRememberPasswordSection = styled.div`
  white-space: nowrap;
  font-size: 16px;
  cursor: pointer;

  span {
    padding-left: 12px;
  }
`;

const StyledCheckbox = styled.input.attrs({ type: "checkbox" })`
  width: 20px;
  height: 20px;
  border: 2px solid ${colors.text};
  background-color: transparent;
  appearance: none;
  outline: none;
  cursor: pointer;
  vertical-align: middle;
  border-radius: 4px;
  display: inline-block;
  position: relative;
  box-sizing: border-box;

  &:checked::after {
    content: "";
    position: absolute;
    left: 5px;
    top: 1px;
    width: 5px;
    height: 10px;
    border: solid ${colors.text};
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepMeLoggedIn, setKeepMeLoggedIn] = useState(false);

  const [error, setError] = useState<string | null>("");

  useEffect(() => {
    const keepLogin = localStorage.getItem("keepMeLoggedIn") === "true";
    setKeepMeLoggedIn(keepLogin);

    const checkUserSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session && keepLogin) {
        router.push("/dashboard");
      }
    };

    checkUserSession();
  }, [router]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (keepMeLoggedIn) {
      localStorage.setItem("keepMeLoggedIn", "true");
    } else {
      localStorage.removeItem("keepMeLoggedIn");
    }

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

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email address to reset password.");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/resetPassword`,
    });

    if (error) {
      setError(error.message);
    } else {
      setError(null);
      alert("Password reset email sent. Check your inbox.");
    }
  };

  const sendUserToRegisterPage = () => {
    router.push("/register");
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
          <StyledLoginButtonContainer>
            <StyledExtraLinksSection>
              <StyledRememberPasswordSection
                onClick={() => setKeepMeLoggedIn(!keepMeLoggedIn)}
              >
                <StyledCheckbox
                  checked={keepMeLoggedIn}
                  onChange={(e) => setKeepMeLoggedIn(e.target.checked)}
                />
                <span>Keep me logged in</span>
              </StyledRememberPasswordSection>

              <StyledForgotPasswordSection>
                <StyledForgotPasswordSection>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    style={{
                      background: "none",
                      border: "none",
                      fontSize: "16px",
                      color: "inherit",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    Forgot Password?
                  </button>
                </StyledForgotPasswordSection>
              </StyledForgotPasswordSection>
            </StyledExtraLinksSection>
            <StyledLoginButton onClick={handleLogin}>
              <StyledLoginButtonImage
                style={{ backgroundImage: `url(${arrow.src})` }}
              ></StyledLoginButtonImage>
            </StyledLoginButton>
          </StyledLoginButtonContainer>
        </StyledLoginForm>
        {error && (
          <StyledErrorTextContainer>
            <p style={{ color: "red" }}>{error}</p>
          </StyledErrorTextContainer>
        )}
      </StyledLoginSection>
      <StyledCreateAccountButton onClick={sendUserToRegisterPage}>
        Create a free account
      </StyledCreateAccountButton>
    </StyledLoginPage>
  );
};

export default Login;
