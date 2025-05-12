import { useState } from "react";
import styled from "styled-components";
import colors from "../../../theme";
import showIcon from "../../../public/show.png";
import hideIcon from "../../../public/hide.png";

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 64px;
  padding: 20px 34px;
  border: 2px solid ${colors.text};
  border-radius: 13px;
  font-size: 24px;
  transition: border-color 0.3s ease, padding-top 0.3s ease;
  background: transparent;
  color: ${colors.text};

  &:focus {
    border-color: ${colors.primary};
    outline: none;
  }
  &:hover {
    border-color: ${colors.primary};
  }

  &:focus + label,
  &:not(:placeholder-shown) + label,
  &:hover + label {
    top: 4px;
    background none;
    padding: 8px;
    font-size: 12px;
    color: ${colors.primary};
    background-color: ${colors.background};
  }

    &:autofill {
    background-color: transparent !important;  /* Keep background transparent */
    -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;  /* Remove autofill background shadow */
  }

  /* For webkit browsers (like Chrome) specifically */
  input:-webkit-autofill {
    background-color: transparent !important;
    -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
  }
`;

const FloatingLabel = styled.label`
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  font-size: 24px;
  color: ${colors.text};
  transition: all 0.3s ease;
  pointer-events: none;
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 20px;
    height: 20px;
  }
`;

type InputType = "text" | "email" | "password" | "number" | "tel" | "url";

interface InputFieldProps {
  label: string;
  type?: InputType;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <InputContainer>
      <StyledInput
        type={isPassword && showPassword ? "text" : type}
        value={value}
        onChange={onChange}
        placeholder=" "
      />
      <FloatingLabel>{label}</FloatingLabel>

      {isPassword && (
        <ToggleButton
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          <img
            src={showPassword ? showIcon.src : hideIcon.src}
            alt="Toggle Password"
          />
        </ToggleButton>
      )}
    </InputContainer>
  );
};

export default InputField;
