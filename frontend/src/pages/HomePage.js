import React from 'react';
import Hero from '../components/home/Hero';
import Bussiness from '../components/home/Bussiness';
import Footer from '../components/home/Footer';
import Navbar from '../components/home/Navbar';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Bussiness />
      <Footer />
    </>
  );
};

export default HomePage;
