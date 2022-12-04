export const light = {
  title: "light",
  colors: {
    background: "rgb(147, 197, 253)",
    text: "rgb(99 102 241 / 30%)",
    text54: "rgb(99 102 241 / 54%)",
    text25: "rgb(99 102 241 / 25%)",
    textSecondary: "#1772B2",
    primaryDark: "rgb(99 102 241)",
    primary: "rgb(99 102 241 / 30%)",
    secondary: "#EB520E",
    secondaryDark: "#B8400B",
  },
};

export const dark = {
  ...light,
  title: "dark",
  colors: {
    ...light.colors,
    text: "rgba(0, 0, 0, 0.87)",
    textSecondary: "#1772B2",
    background: "#1F1F1F",
    primary: "#1772B2",
    primaryDark: "#1799F6",
    secondary: "#EB520E",
    secondaryDark: "#B8400B",
  },
};

const themes = {
  light,
  dark,
};

export default themes;
