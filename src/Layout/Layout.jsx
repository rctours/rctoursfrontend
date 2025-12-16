import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RouteProgressBar from '../components/TopLoader';
import TopBar from '../components/TopBar';

const Layout = () => {
  return (
    <>
      <Navbar />
      <RouteProgressBar />

      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
