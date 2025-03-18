import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { ReactNode, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { getLanguageDir } from "../i18n/main";

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { i18n } = useTranslation();
  const direction = getLanguageDir(i18n.language);

  // Create rtl cache
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  // Create ltr cache
  const cacheLtr = createCache({
    key: "muiltr",
    stylisPlugins: [prefixer],
  });

  // Use appropriate cache based on direction
  const cache = direction === "rtl" ? cacheRtl : cacheLtr;

  // Create theme with direction and enhanced configuration
  const theme = useMemo(
    () =>
      createTheme({
        direction,
        typography: {
          fontFamily: [
            '"Assistant"',
            "sans-serif",
            '"Roboto"',
            '"Helvetica"',
            '"Arial"',
          ].join(","),
        },
        components: {
          MuiTextField: {
            defaultProps: {
              variant: "outlined",
              fullWidth: true,
            },
          },
          MuiButton: {
            defaultProps: {
              variant: "contained",
            },
          },
          MuiFormControl: {
            defaultProps: {
              fullWidth: true,
            },
          },
        },
        palette: {
          primary: {
            main: "#1976d2",
          },
          secondary: {
            main: "#dc004e",
          },
        },
      }),
    [direction]
  );

  return (
    <CacheProvider value={cache}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </CacheProvider>
  );
};
