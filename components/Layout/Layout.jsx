import React from 'react';
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "../Header/Header";
import Banner from "../Banner/Banner";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { theme } from "../Theme/Theme";

/**
 * Refactored Layout component with improved structure
 * - Added CssBaseline for consistent styling
 * - Better semantic HTML structure
 * - Improved theme integration
 * - Enhanced accessibility with proper document structure
 */
const Layout = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app-layout">
        <Header />
        <Banner />
        <Main />
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Layout;

