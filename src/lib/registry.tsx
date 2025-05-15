"use client";

import React, { useState } from "react";
import { StyleSheetManager } from "styled-components";

// This registry is only needed on the client
export function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sheetContainer] = useState(() => {
    if (typeof document === "undefined") return null;
    return document.head;
  });

  if (!sheetContainer) return null;

  return (
    <StyleSheetManager target={sheetContainer}>{children}</StyleSheetManager>
  );
}
