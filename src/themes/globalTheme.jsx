// src/theme.jsx

import { createTheme } from "@mui/material/styles";

const globalTheme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  palette: {
    success: { main: '#07AB0E' },
    error: { main: '#DC3545' },
    info: { main: '#1976D2', secondary: '#24427D' },
    secondary: { main: '#16181A' },
    // primary: { main: '#1976D2' },

    background: {
      main: "#121314", // Background utama
      secondary: "#16181A", // Background Sidebar untuk Contrast
      line: '#2c2e31', // Line Coloring
      hover: '#1F1F1F', // Background Hovering Sidebar
      success: '#07AB0E',
      error: '#DC3545',
      warning: 'yellow',
      info: '#1976D2',
    },

    text: {
      white: "#FAFAFA",
      secondary: "#676767",
      success: '#07AB0E',
      danger: '#DC3545',
      warning: 'yellow',
      info: '#1976D2',
    },
  },

  components: {

    // Textfield Styling
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          // Styling Textfield for Login and Register
          "&.auth-field": {
            "& .MuiOutlinedInput-root": {
              backgroundColor: theme.palette.background.secondary,
              borderRadius: "15px",
              transition: "all 0.3s ease",

              "& fieldset": {
                borderColor: "transparent",
                borderWidth: "1px",
              },

              "&:hover": {
                backgroundColor: "transparent !important",

                "& fieldset": {
                  borderColor: theme.palette.text.secondary,
                },
              },
              "&.Mui-focused": {
                backgroundColor: "transparent !important",

                "& fieldset": {
                  borderColor: theme.palette.text.secondary,
                },
              },
              "&.Mui-focused fieldset": {
                borderColor: theme.palette.text.secondary,
                backgroundColor: "transparent"
              },

              "&.Mui-autofilled": {
                "& fieldset": {
                  borderColor: theme.palette.text.secondary,
                  backgroundColor: "transparent"
                }
              },
              "& .MuiInputBase-input::placeholder": {
                borderColor: theme.palette.text.secondary,
                backgroundColor: "transparent"
              },
              "& input:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 1000px transparent inset !important",
                boxShadow: "0 0 0 1000px transparent inset !important",
                backgroundColor: "transparent !important",
                backgroundImage: "none !important",
                WebkitTextFillColor: `${theme.palette.text.white} !important`,
                transition: "background-color 5000s ease-in-out 0s !important",
              },
              "& input:-webkit-autofill::placeholder": {
                color: theme.palette.text.secondary,
                backgroundColor: "transparent"
              },
              "& input:-webkit-autofill:hover::placeholder": {
                color: theme.palette.text.secondary,
              },
              // 
              "& input:-webkit-autofill:focus::placeholder": {
                color: theme.palette.text.secondary,
              },
              "& input": {
                color: theme.palette.text.secondary,
                backgroundColor: "transparent",
              },
              "& input:not(:placeholder-shown)": {
                color: theme.palette.text.white,
              },
            },
            "& .MuiInputBase-input::placeholder": {
              color: theme.palette.text.secondary,
              opacity: 1,
            },

            "& .MuiFormHelperText-root": {
              backgroundColor: 'transparent',
              marginTop: "5px",
              marginBottom: '-20px'
            },
          },
        })
      },
    },

    // Styling Button
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          // Style for Login / Regist Button
          '&.auth-button': {
            color: theme.palette.text.white,
            backgroundColor: theme.palette.info.secondary,
            borderStyle: 'none',
            borderRadius: '15px',
            fontWeight: 600,
            '&:hover': {
              borderWidth: "1px",
              borderStyle: 'solid',
              borderColor: theme.palette.info.main,
              backgroundColor: theme.palette.info.main,
              transition: "all 0.7s ease",
            },
          },

          // Button Signup / Sign in Direction
          '&.linkto-button': {
            fontWeight: 'bold',
            color: theme.palette.info.main,
            textTransform: "none",
            "&:hover": {
              textDecoration: 'underline',
              backgroundColor: 'transparent'
            }
          },
        }),
      },
    },

    // Styling Divider
    MuiDivider: {
      styleOverrides: {
        root: ({ theme }) => ({
          // 
          '&.auth-divider': {
            border: '1px solid theme.palette.background.line',
          },
        }),
      }
    },

    MuiPopover: {
      styleOverrides: {
        paper: ({ theme }) => ({
          '&.sidebar-popover': {
            backgroundColor: theme.palette.background.secondary,
            borderRadius: 10,
            border: `1px solid ${theme.palette.background.line}`,
            transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out"
          }
        })
      }
    }

    // Other Component if needed
  },
});

export default globalTheme;
