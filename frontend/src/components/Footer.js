import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-yellow-400 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="text-xl font-bold">TK Fajar</span>
          </div>
          <p className="text-blue-200 max-w-sm">Membantu menumbuhkan generasi yang berakhlak mulia, cerdas, dan mandiri melalui pendidikan yang penuh kasih sayang.</p>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-6">Link Cepat</h4>
          <ul className="space-y-4 text-blue-200">
            <li><a href="https://maps.app.goo.gl/EBDUg6ForYsSDLdv7" target="_blank" rel="noopener noreferrer" className="hover:text-white transition text-blue-200">Lokasi Sekolah</a></li>
            <li><button className="hover:text-white transition cursor-pointer bg-transparent border-none text-blue-200">Biaya Sekolah</button></li>
            <li><button className="hover:text-white transition cursor-pointer bg-transparent border-none text-blue-200">Jadwal Akademik</button></li>
            <li><button className="hover:text-white transition cursor-pointer bg-transparent border-none text-blue-200">Berita & Artikel</button></li>
            {/* <li><button className="hover:text-white transition cursor-pointer bg-transparent border-none text-blue-200">Karir Guru</button></li> */}
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-6">Ikuti Kami</h4>
          <div className="flex gap-4">
            <button className="bg-blue-800 p-3 rounded-full hover:bg-blue-700 transition cursor-pointer">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
            <button className="bg-blue-800 p-3 rounded-full hover:bg-blue-700 transition cursor-pointer">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 border-t border-blue-800 pt-8 text-center text-blue-300 text-sm">
        <p>&copy; 2024 TK Fajar. Hak Cipta Dilindungi.</p>
      </div>
    </footer>
  );
};

export default Footer;