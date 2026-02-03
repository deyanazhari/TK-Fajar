import React from 'react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-2">
            <div className="bg-yellow-400 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-blue-600">TK Ceria Mandiri</span>
          </div>
          <div className="hidden md:flex space-x-8 font-semibold text-gray-600">
            <a href="#beranda" className="hover:text-blue-500 transition">Beranda</a>
            <a href="#tentang" className="hover:text-blue-500 transition">Tentang Kami</a>
            <a href="#program" className="hover:text-blue-500 transition">Program</a>
            <a href="#fasilitas" className="hover:text-blue-500 transition">Fasilitas</a>
          </div>
          <div>
            <a href="#kontak" className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full font-bold shadow-lg transition transform hover:scale-105 inline-block">
              Daftar Sekarang
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;