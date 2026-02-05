import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-2">
            <div 
              className="bg-yellow-400 p-2 rounded-lg cursor-pointer hover:bg-yellow-500 transition"
              onClick={() => navigate('/')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span 
              className="text-2xl font-bold text-blue-600 cursor-pointer hover:text-blue-700 transition"
              onClick={() => navigate('/')}
            >
              TK Fajar
            </span>
          </div>
          <div className="hidden md:flex space-x-8 font-semibold text-gray-600">
            <button onClick={() => {navigate('/'); setTimeout(() => document.getElementById('beranda')?.scrollIntoView({behavior: 'smooth'}), 100);}} className="hover:text-blue-500 transition cursor-pointer bg-transparent border-none text-gray-600">Beranda</button>
            <button onClick={() => {navigate('/'); setTimeout(() => document.getElementById('tentang')?.scrollIntoView({behavior: 'smooth'}), 100);}} className="hover:text-blue-500 transition cursor-pointer bg-transparent border-none text-gray-600">Tentang Kami</button>
            <button onClick={() => {navigate('/'); setTimeout(() => document.getElementById('program')?.scrollIntoView({behavior: 'smooth'}), 100);}} className="hover:text-blue-500 transition cursor-pointer bg-transparent border-none text-gray-600">Program</button>
            <button onClick={() => {navigate('/'); setTimeout(() => document.getElementById('fasilitas')?.scrollIntoView({behavior: 'smooth'}), 100);}} className="hover:text-blue-500 transition cursor-pointer bg-transparent border-none text-gray-600">Fasilitas</button>
            <button onClick={() => navigate('/kegiatan')} className="hover:text-blue-500 transition cursor-pointer bg-transparent border-none text-gray-600">Kegiatan</button>
          </div>
          <div>
            <button 
              onClick={() => navigate('/registration')}
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full font-bold shadow-lg transition transform hover:scale-105 inline-block"
            >
              Daftar Sekarang
            </button>
            <button 
              onClick={() => navigate('/admin/login')}
              className="ml-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-bold shadow-lg transition transform hover:scale-105 inline-block text-sm"
            >
              📊 Admin
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;