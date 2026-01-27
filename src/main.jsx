import React, { useMemo, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";

import App from "../src/App"
import createAppTheme from './themes';

import { AuthProvider } from './context/AuthContext';

import 'bootstrap/dist/css/bootstrap.min.css'
import '@mdi/font/css/materialdesignicons.min.css';
import '../index.css'


const Root = () => {
  const [mode, setMode] = useState("dark");

  const theme = useMemo(() =>
    createAppTheme(mode),
    [mode]);

  const toggleTheme = () => {
    setMode(prev => (prev === "dark" ? "light" : "dark"))
  }

  return (
    <BrowserRouter basename="/plantya">
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App
            mode={mode}
            toggleTheme={toggleTheme}
          />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);  