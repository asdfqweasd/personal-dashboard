"use client";

import React, { useState, createContext, useContext } from "react";
import { links } from "../lib/data";

type SectionName = (typeof links)[number]["name"];
type ActiveSectionContextProviderProps = {
  children: React.ReactNode;
};
type ActiveSectionContextType = {
  activeSection: SectionName;
  setActiveSection: React.Dispatch<React.SetStateAction<SectionName>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
};
export interface Todo {
  id: string;
  task: string;
  completed: boolean;
  isEditing: boolean;
}

const ActiveSectionContext = createContext<ActiveSectionContextType | null>(
  null
);

export default function ActiveSectionContextProvider({
  children,
}: ActiveSectionContextProviderProps) {
  const [activeSection, setActiveSection] = useState<SectionName>("Home");
  const [category, setCategory] = useState<string>("");

  return (
    <ActiveSectionContext.Provider
      value={{
        activeSection,
        setActiveSection,
        category,
        setCategory,
      }}
    >
      {children}
    </ActiveSectionContext.Provider>
  );
}
export function useActiveSectionContext() {
  const context = useContext(ActiveSectionContext);

  if (context === null) {
    throw new Error(
      "useActiveSectionContext must be used within an ActiveSectionContextProvider"
    );
  }

  return context;
}
