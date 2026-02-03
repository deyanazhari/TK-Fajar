import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Programs from './components/Programs';
import Curriculum from './components/Curriculum';
import Testimonial from './components/Testimonial';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-blue-50 text-gray-800">
      <Navbar />
      <Hero />
      <Stats />
      <Programs />
      <Curriculum />
      <Testimonial />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;