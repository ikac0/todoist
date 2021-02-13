import React, { useState } from "react";
import { Content } from "./components/layout/Content";
import { Header } from "./components/layout/Header";

import { SelectedProjectProvider, ProjectsProvider } from "./context";

export const App = ({ darkModeDefault = false }) => {
  const [darkMode, setDarkMode] = useState(darkModeDefault);

  return (
    <SelectedProjectProvider>
      <ProjectsProvider>
        <main className={darkMode ? "darkmode" : undefined}>
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <Content />
        </main>
      </ProjectsProvider>
    </SelectedProjectProvider>
  );
};
