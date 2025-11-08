import { createTheme, Theme } from "@mui/material/styles";
import "@mui/lab/themeAugmentation";
import lightTheme from "./lightTheme";
import darkTheme from "./darkTheme";
import typography from "./typography";
import components from "./components";
import React from "react";

interface ThemeCustomColors {
  orange?: string;
  pink?: string;
  dialogBackdrop?: string;
  fadeYellow?: string;
  fadeRed?: string;
  fadeBlue?: string;
  purple?: string;
  lightGreen?: string;
  Orchid: string;
  Mindaro: string;
  MayaBlue: string;
  Froly: string;
  LimeGreen: string;
  BleuDeFrance: string;
  GreenSheen: string;
  Dandelion: string;
  Turquoise: string;
  tooltip: string;
}
declare module "@mui/material/styles/createPalette" {
  interface Palette extends ThemeCustomColors {
    sidebar?: Palette["primary"];
    blue?: ColorPartial;
  }
  interface PaletteOptions extends ThemeCustomColors {
    sidebar?: Palette["primary"];
    blue?: ColorPartial;
  }

  interface TypeText {
    light: string;
    dark: string;
    muted: string;
    gray: string;
    solidDark: string;
    tooltip: string;
  }

  interface TypeBackground {
    secondary: string;
  }
}

declare module "@mui/material/styles" {
  interface TypographyVariants {
    titleMd: React.CSSProperties;
    labelSm: React.CSSProperties;
    titleLg: React.CSSProperties;
    titleSm: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    titleMd?: React.CSSProperties;
    labelSm?: React.CSSProperties;
    titleLg?: React.CSSProperties;
    titleSm?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    titleMd: true;
    labelSm: true;
    titleLg?: true;
    titleSm?: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    default: true;
  }
}

declare module "@mui/material/Chip" {
  interface ChipPropsSizeOverrides {
    large: true;
  }
}

const getTheme = (mode: "dark" | "light"): Theme => {
  const palette = mode === "dark" ? darkTheme : lightTheme;

  const theme = createTheme({ palette, typography });
  console.log(`tessss${mode}`);
  return createTheme({
    cssVariables: true,
    palette: palette,
    typography,
    components: components(theme),
  });
};

export default getTheme;
