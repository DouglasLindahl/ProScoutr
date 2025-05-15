"use client";
import { useState, FormEvent } from "react";
import supabase from "../../../supabase";
import styled from "styled-components";
import InputField from "@/components/inputField/page";
import colors from "../../../theme";
import arrow from "../../../public/arrow.svg";
import greenShapes from "../../../public/greenShapes.svg";
// Password criteria
// Min 6 characters, min 1 number, min 1 special character, min 1 uppercase
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
const StyledRegisterPage = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: ${colors.background};
  color: ${colors.text};

  & span {
    color: ${colors.primary}; /* or any other style */
  }
`;

const StyledRegisterContainer = styled.div`
  width: 50vw;
  height: 50vh;
  padding-top: 78px;
`;

const StyledRegisterContainerHeader = styled.h1`
  font-size: 100px;
  text-align: center;
`;

const StyledRegisterContainerText = styled.p`
  font-size: 50px;
  width: 70%;
  text-align: center;
  font-weight: 200;
`;

const StyledRegisterContainerForm = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 34px;
  position: relative;
`;

const StyledRegisterButtonContainer = styled.section`
  position: relative;
  padding-top: 43px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: top;
  & div {
  }
`;

const StyledErrorTextContainer = styled.div`
  width: 50%;
`;

const StyledRegisterButton = styled.button`
  cursor: pointer;
  background-color: ${colors.text};
  border-radius: 13px;
  height: 64px;
  padding: 0px 100px;
  border: none;
  display: flex; /* So it lays out children like the image */
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${colors.primary};
  }
`;

const StyledRegisterButtonImage = styled.div`
  background: url(${arrow.src}) no-repeat center center;
  background-size: contain;
  width: 22px;
  height: 43px;
  border: none;
`;

const StyledPasswordStrengthContainer = styled.div`
  margin-top: 10px;
  width: 48%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  left: 0;
  bottom: -20px;
`;

const StyledStrengthBoxes = styled.div`
  display: flex;
  width: 100%;
  gap: 8px;
  margin-top: 8px;
`;

const StrengthBox = styled.div<{ $active: boolean; $passed: boolean }>`
  width: 25%;
  height: 8px;
  border-radius: 4px;
  background-color: ${({ $passed, $active }) =>
    $passed
      ? `${colors.primary}`
      : $active
      ? `${colors.text}`
      : `${colors.text}`};
  transition: background-color 0.3s ease;
`;

const StyledErrorContainer = styled.ul`
  color: ${colors.red};
`;

const StyledErrorText = styled.p`
  color: ${colors.red};
`;

const SignUp = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [passwordCriteriaErrors, setPasswordCriteriaErrors] = useState<
    string[]
  >([]);

  // Function to get password strength
  const getPasswordStrength = (pwd: string): boolean[] => {
    const criteriaChecks = [
      /[A-Z]/.test(pwd), // 1. Uppercase letter
      pwd.length >= 6, // 2. Minimum 6 characters
      /\d/.test(pwd), // 3. At least one number
      /[^A-Za-z0-9]/.test(pwd), // 4. At least one special character
    ];

    const boxesFilled = [false, false, false, false];

    let nextIndex = 0;

    for (let i = 0; i < criteriaChecks.length; i++) {
      if (criteriaChecks[i]) {
        boxesFilled[nextIndex] = true;
        nextIndex++;
      }
    }

    return boxesFilled;
  };

  const validatePassword = (pwd: string): string[] => {
    const errors = [];

    if (pwd.length < 6) errors.push("At least 6 characters");
    if (!/[A-Z]/.test(pwd)) errors.push("At least one uppercase letter");
    if (!/\d/.test(pwd)) errors.push("At least one number");
    if (!/[^A-Za-z0-9]/.test(pwd))
      errors.push("At least one special character");

    return errors;
  };
  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill out all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Sign up the user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          firstName,
          lastName,
          phoneNumber,
        },
      },
    });

    console.log("Supabase response data:", data);

    if (error) {
      console.log("Error:", error);
      setError(error.message);
      return;
    }

    const user = data?.user;

    // If sign-up succeeded and user is returned, insert profile
    if (user) {
      const { error: profileError } = await supabase
        .from("user_profiles")
        .insert([
          {
            id: user.id, // This is the UUID, matching auth.users.id
            email,
            phone_number: phoneNumber,
            first_name: firstName,
            last_name: lastName,
          },
        ]);

      if (profileError) {
        console.error("Error inserting profile:", profileError);
        setError("Sign-up succeeded but failed to create user profile.");
        return;
      }
    }

    if (data?.user?.confirmation_sent_at) {
      setError(
        "An account with this email already exists. Please check your inbox for the confirmation email."
      );
    } else {
      alert(
        "Sign-up successful! Please check your email to confirm your account."
      );
    }
  };

  return (
    <StyledRegisterPage>
      <StyledBackgroundAccent></StyledBackgroundAccent>
      <StyledRegisterContainerHeader>
        Create a <span>Free</span> Account
      </StyledRegisterContainerHeader>
      <StyledRegisterContainerText>
        Find the next talent for your team with our automated scouting agent.
      </StyledRegisterContainerText>
      <StyledRegisterContainer>
        <StyledRegisterContainerForm>
          <StyledPasswordStrengthContainer>
            {password.length > 0 && (
              <StyledStrengthBoxes>
                {getPasswordStrength(password).map((passed, index) => (
                  <StrengthBox key={index} $active={true} $passed={passed} />
                ))}
              </StyledStrengthBoxes>
            )}
          </StyledPasswordStrengthContainer>
          <InputField
            label="First name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <InputField
            label="Last name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <InputField
            label="E-mail address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            label="Phone Number"
            type="number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => {
              const val = e.target.value;
              setPassword(val);
              setPasswordCriteriaErrors(validatePassword(val));
            }}
          />
          <InputField
            label="Confirm password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </StyledRegisterContainerForm>
        <StyledRegisterButtonContainer>
          <StyledErrorTextContainer>
            {password.length > 0 && passwordCriteriaErrors.length > 0 && (
              <StyledErrorContainer>
                {passwordCriteriaErrors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </StyledErrorContainer>
            )}
            <StyledErrorText>{error}</StyledErrorText>
          </StyledErrorTextContainer>
          <StyledRegisterButton onClick={handleSignUp}>
            <StyledRegisterButtonImage></StyledRegisterButtonImage>
          </StyledRegisterButton>
        </StyledRegisterButtonContainer>
      </StyledRegisterContainer>
    </StyledRegisterPage>
  );
};

export default SignUp;
