import React from 'react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();

  const handleRegistrationClick = () => {
    navigate('/registration');
  };

  return (
    <section id="kontak" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-yellow-50 rounded-[3rem] p-8 md:p-16 flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold text-blue-900 mb-6">Mulai Petualangan Belajar si Kecil Hari Ini!</h2>
            <p className="text-gray-600 mb-8">Hubungi kami untuk informasi biaya pendidikan, jadwal kunjungan sekolah, atau daftarkan secara online.</p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-white p-3 rounded-2xl shadow-md text-blue-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <span className="font-bold text-lg">(021) 1234-5678</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-white p-3 rounded-2xl shadow-md text-pink-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <span className="font-bold text-lg">Jl. Fajar No. 12, Jakarta Selatan</span>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 w-full bg-white p-8 rounded-3xl shadow-xl text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Daftarkan Anak Anda</h3>
              <p className="text-gray-600 mb-6">Isi formulir pendaftaran online kami untuk proses yang lebih cepat dan mudah</p>
            </div>
            
            <button
              onClick={handleRegistrationClick}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition shadow-lg transform hover:scale-105 mb-4"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Formulir Pendaftaran Online
              </span>
            </button>
            
            <div className="text-sm text-gray-500">
              <p>Atau hubungi kami langsung untuk informasi lebih lanjut</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;