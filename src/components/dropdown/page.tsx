"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import styled from "styled-components";
import arrow from "../../../public/arrow.svg";
import colors from "../../../theme";

const getBackgroundColorByDepth = (depth?: number) => {
  switch (depth) {
    case 0:
      return colors.text;
    case 1:
      return "#d3d3d3";
    case 2:
      return "#d3d3d3";
    default:
      return "#d3d3d3";
  }
};

interface PositionOption {
  label: string;
  value?: string;
  availableToChoose: boolean;
  options?: PositionOption[];
}

type DropdownProps = {
  options: PositionOption[];
  depth?: number;
  setOption: React.Dispatch<React.SetStateAction<string>>;
  setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  showDeselect?: boolean;
  searchable?: boolean;
  searchTerm?: string; // add this optional prop for nested dropdowns
  rootDropdownRef?: React.RefObject<HTMLDivElement | null>;
};

const StyledDropdownSection = styled.div<{ $depth?: number }>`
  ${({ $depth }) => `
    position: ${$depth === 0 ? "absolute" : "relative"};
    top: ${$depth === 0 ? "100%" : "auto"};
    left: ${$depth === 0 ? "0" : "auto"};
    width: 100%;
    max-height: ${$depth === 0 ? "300px" : "auto"};
    overflow-y: ${$depth === 0 ? "auto" : "visible"};
    background-color: ${getBackgroundColorByDepth($depth)};
    color: ${colors.background};
    border-radius: ${$depth === 0 ? "0 0 13px 13px" : "0"};
    z-index: ${$depth === 0 ? 10 : "auto"};
    box-shadow: ${$depth === 0 ? "0 4px 10px rgba(0, 0, 0, 0.15)" : "none"};
  `}
`;

const StyledDropdownButton = styled.button<{ isOpen?: boolean }>`
  width: 100%;

  border: none;
  padding: 12px 24px;
  font-size: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ isOpen }) => (isOpen ? colors.secondary : "transparent")};
  color: ${({ isOpen }) => (isOpen ? colors.background : "inherit")};
  cursor: pointer;
  text-align: left;
  img {
    height: 20px;
    width: 20px;
    transition: transform 0.3s ease;
  }
`;

const StyledDeselectButton = styled.button`
  width: 100%;
  border: none;
  padding: 12px 24px;
  font-size: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const StyledSearchInput = styled.input`
  width: 100%;

  padding: 24px 24px;
  font-size: 18px;
  border: none;
  background: #d3d3d3;
  color: ${colors.background};
  outline: none;

  &::placeholder {
    color: ${colors.background};
    opacity: 0.5;
  }
`;

const Dropdown: React.FC<DropdownProps> = ({
  setOption,
  setDropdownOpen,
  options,
  depth = 0,
  showDeselect = true,
  searchable = false,
  searchTerm = "",
  rootDropdownRef,
}) => {
  // single ref for root dropdown and all nested
  const [search, setSearch] = useState("");
  const internalDropdownRef = useRef<HTMLDivElement>(null);
  const dropdownRef =
    depth === 0
      ? (rootDropdownRef ?? internalDropdownRef)
      : internalDropdownRef;
  // For root, override searchTerm with local search state
  const effectiveSearchTerm = depth === 0 ? search : searchTerm;

  useEffect(() => {
    if (depth !== 0) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setDropdownOpen]);

  const filterOptions = (
    opts: PositionOption[],
    term: string
  ): PositionOption[] => {
    if (!term) return opts;
    const lowerTerm = term.toLowerCase();

    return opts
      .map((opt) => {
        let filteredChildren: PositionOption[] | undefined;
        if (opt.options) {
          filteredChildren = filterOptions(opt.options, term);
        }

        const matchesLabel = opt.label.toLowerCase().includes(lowerTerm);

        if (matchesLabel || (filteredChildren && filteredChildren.length > 0)) {
          return {
            ...opt,
            options: filteredChildren,
          };
        }

        return null;
      })
      .filter(Boolean) as PositionOption[];
  };

  const filteredOptions = useMemo(
    () => filterOptions(options, effectiveSearchTerm),
    [options, effectiveSearchTerm]
  );

  return (
    <StyledDropdownSection $depth={depth} ref={dropdownRef}>
      {depth === 0 && searchable && (
        <StyledSearchInput
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoFocus
          onClick={(e) => e.stopPropagation()} // prevent closing dropdown when clicking on input
        />
      )}
      {depth === 0 && showDeselect && (
        <StyledDeselectButton
          onClick={() => {
            setOption("");
            setDropdownOpen(false);
          }}
        >
          <p>– Deselect –</p>
        </StyledDeselectButton>
      )}
      {filteredOptions.length === 0 && (
        <p style={{ padding: "12px 24px" }}>No results found</p>
      )}

      {filteredOptions.map((option, index) => (
        <DropdownItem
          setOption={setOption}
          setDropdownOpen={setDropdownOpen}
          option={option}
          key={index}
          depth={depth + 1}
          searchTerm={effectiveSearchTerm}
          rootDropdownRef={dropdownRef}
        />
      ))}
    </StyledDropdownSection>
  );
};

const DropdownItem: React.FC<{
  setOption: React.Dispatch<React.SetStateAction<string>>;
  setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  option: PositionOption;
  depth: number;
  searchTerm: string;
  rootDropdownRef: React.RefObject<HTMLDivElement | null>;
}> = ({
  setOption,
  setDropdownOpen,
  option,
  depth,
  searchTerm,
  rootDropdownRef,
}) => {
  const [open, setOpen] = useState(false);

  const hasChildren = option.options && option.options.length > 0;

  // Check if label matches search term (case-insensitive)
  const matchesSearch =
    searchTerm.length > 0 &&
    option.label.toLowerCase().includes(searchTerm.toLowerCase());

  if (hasChildren) {
    return (
      <div style={{ position: "relative" }}>
        <StyledDropdownButton onClick={() => setOpen(!open)} isOpen={open}>
          <p>{option.label}</p>
          <img
            src={arrow.src}
            alt=""
            style={{
              height: "20px",
              width: "20px",
              transform: open ? "rotate(270deg)" : "rotate(90deg)",
              transition: "transform 0.3s ease",
            }}
          />
        </StyledDropdownButton>
        {open && option.options && (
          <Dropdown
            setOption={setOption}
            setDropdownOpen={setDropdownOpen}
            options={option.options}
            depth={depth}
            searchable={false}
            searchTerm={searchTerm}
            rootDropdownRef={rootDropdownRef}
          />
        )}
      </div>
    );
  } else if (option.availableToChoose || matchesSearch) {
    return (
      <StyledDropdownButton
        onClick={() => {
          setOption(option.label);
          setDropdownOpen(false);
        }}
        style={{ cursor: "pointer" }}
      >
        <p>{option.label}</p>
      </StyledDropdownButton>
    );
  } else {
    return <span>{option.label}</span>;
  }
};

export default Dropdown;
