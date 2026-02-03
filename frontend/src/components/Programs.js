import React from 'react';

const Programs = () => {
  return (
    <section id="program" className="py-20 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-4">Mengapa Memilih Kami?</h2>
          <div className="h-1.5 w-24 bg-pink-500 mx-auto rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-lg card-hover border-b-8 border-blue-400">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Pendidikan Berkarakter</h3>
            <p className="text-gray-600 leading-relaxed">Fokus pada pembentukan akhlak dan kemandirian anak sejak dini melalui metode pembiasaan positif.</p>
          </div>
          
          <div className="bg-white p-8 rounded-3xl shadow-lg card-hover border-b-8 border-yellow-400">
            <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mb-6 text-yellow-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Lingkungan Ceria</h3>
            <p className="text-gray-600 leading-relaxed">Area bermain yang luas, aman, dan penuh warna untuk merangsang kreativitas serta kebahagiaan anak.</p>
          </div>
          
          <div className="bg-white p-8 rounded-3xl shadow-lg card-hover border-b-8 border-pink-400">
            <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mb-6 text-pink-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Guru Profesional</h3>
            <p className="text-gray-600 leading-relaxed">Didampingi oleh tenaga pengajar yang berpengalaman dan sabar dalam memahami karakter setiap anak.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;