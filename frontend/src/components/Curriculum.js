import React from 'react';

const Curriculum = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 order-2 lg:order-1">
            <img 
              src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Aktivitas Belajar" 
              className="rounded-3xl shadow-2xl"
              onError={(e) => e.target.src = 'https://via.placeholder.com/600x400?text=Aktivitas+TK'}
            />
          </div>
          <div className="lg:w-1/2 order-1 lg:order-2">
            <span className="text-pink-500 font-bold tracking-widest uppercase text-sm">Program Unggulan</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mt-2 mb-6">Kurikulum Montessori yang Dipersonalisasi</h2>
            <p className="text-gray-600 mb-6">Kami mengintegrasikan nilai-nilai kearifan lokal dengan standar pendidikan internasional untuk memastikan anak siap menghadapi jenjang pendidikan selanjutnya.</p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 font-semibold text-gray-700">
                <div className="bg-green-100 text-green-600 p-1 rounded-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                Bilingual (Indonesia & Inggris Dasar)
              </li>
              <li className="flex items-center gap-3 font-semibold text-gray-700">
                <div className="bg-green-100 text-green-600 p-1 rounded-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                Kelas Seni & Musik Kreatif
              </li>
              <li className="flex items-center gap-3 font-semibold text-gray-700">
                <div className="bg-green-100 text-green-600 p-1 rounded-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                Eksplorasi Alam & Berkebun
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Curriculum;