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
  border: none; 
  border-radius: 13px;
  font-size: 24px;
box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.15);

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
    top: 0px;
    background none;
    padding: 8px;
    font-size: 12px;
    color: ${colors.primary};
    background-color: ${colors.background};
  }

  &:-webkit-autofill {
    background-color: transparent !important;

    -webkit-text-fill-color: black !important; /* or ${colors.text} if you're using a color variable */
    transition: background-color 9999s ease-in-out 0s; /* Prevent yellow autofill flash */
  }

  /* For webkit browsers (like Chrome) specifically */
  input:-webkit-autofill {
    background-color: transparent !important;

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
        onChange={(e) => {
          const val = e.target.value;
          let filteredValue = val;

          switch (type) {
            case "tel":
              filteredValue = val.replace(/[^\d+()-\s]/g, ""); // Allow digits, +, (), -, space
              break;
            case "number":
              filteredValue = val.replace(/[^\d.-]/g, ""); // Digits, dot, negative
              break;
            case "text":
              filteredValue = val.slice(0, 50); // Enforce max text length
              break;
            case "email":
              filteredValue = val.slice(0, 100);
              break;
            case "password":
              filteredValue = val.slice(0, 64);
              break;
            case "url":
              filteredValue = val.slice(0, 100);
              break;
          }

          onChange({ ...e, target: { ...e.target, value: filteredValue } });
        }}
        placeholder=" "
        inputMode={
          type === "tel"
            ? "tel"
            : type === "email"
              ? "email"
              : type === "number"
                ? "numeric"
                : type === "url"
                  ? "url"
                  : "text"
        }
        pattern={
          type === "tel"
            ? "[0-9()+\\-\\s]*"
            : type === "email"
              ? "[^@\\s]+@[^@\\s]+\\.[^@\\s]+"
              : undefined
        }
        maxLength={
          type === "email"
            ? 100
            : type === "tel"
              ? 15
              : type === "password"
                ? 64
                : type === "url"
                  ? 100
                  : 50
        }
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
