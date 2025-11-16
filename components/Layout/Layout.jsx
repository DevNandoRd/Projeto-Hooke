import React from 'react';
import Header from "../Header/Header";
import Banner from "../Banner/Banner";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

/**
 * Refactored Layout component with improved structure
 * - Better semantic HTML structure
 * - Enhanced accessibility with proper document structure
 */
const Layout = () => {
  return (
    <div className="app-layout">
      <Header />
      <Banner />
      <Main />
      <Footer />
    </div>
  );
};

export default Layout;

