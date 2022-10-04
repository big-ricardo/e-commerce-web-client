import React, {
  createContext,
  PropsWithChildren,
  useMemo,
  useState,
} from "react";
import { ThemeProvider } from "styled-components";
import themes from "../../styles/themes";

const themesTypes = Object.keys(themes) as Array<keyof typeof themes>;

export const ThemesContext = createContext({
  theme: themes.light,
  toggleTheme: () => {},
});

const ThemesProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState(themesTypes[0]);

  const activeTheme = useMemo(() => {
    return themes[theme];
  }, [theme]);

  const ToggleTheme = () => {
    setTheme(prev =>
      prev === themesTypes[0] ? themesTypes[1] : themesTypes[0],
    );
  };

  return (
    <ThemesContext.Provider
      value={{ theme: activeTheme, toggleTheme: ToggleTheme }}
    >
      <ThemeProvider theme={activeTheme}>{children}</ThemeProvider>
    </ThemesContext.Provider>
  );
};

export default ThemesProvider;
