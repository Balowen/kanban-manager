import React, { createContext, useContext, useState } from "react";

export const SelectedProjectContext = createContext();
export const SelectedProjectProvider = ({ children }) => {
  const { selectedProject, setSelectedProjects } = useState("TODAY");

  return (
    <SelectedProjectContext.Provider
      value={{ selectedProject, setSelectedProjects }}
    >
      {children}
    </SelectedProjectContext.Provider>
  );
};

export const useSelectedProjectValue = () => useContext(SelectedProjectContext);
