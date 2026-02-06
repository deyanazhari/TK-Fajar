import React from 'react';
import heroImage from '../assets/WhatsApp Image 2025-03-15 at 14.58.59.jpeg';

const Hero = () => {
  return (
    <section id="beranda" className="relative overflow-hidden bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl lg:text-6xl font-extrabold text-blue-900 leading-tight mb-6">
            Membangun Masa Depan <span className="text-yellow-500">Fajar & Kreatif</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
            Tempat terbaik bagi buah hati Anda untuk bertumbuh, belajar, dan bermain dengan kurikulum yang menyenangkan serta lingkungan yang aman.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl transition">
              Lihat Kurikulum
            </button>
            {/* <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-2xl font-bold text-lg transition">
              Tur Virtual
            </button> */}
          </div>
        </div>
        <div className="flex-1 relative">
          <div className="blob-shape bg-blue-100 absolute -z-10 w-full h-full transform scale-110"></div>
          <img 
            src={heroImage} 
            alt="Anak-anak TK Fajar" 
            className="rounded-3xl shadow-2xl object-cover w-full h-[400px] lg:h-[500px]"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;