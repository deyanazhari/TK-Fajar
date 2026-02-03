import React from 'react';

const Testimonial = () => {
  return (
    <section className="py-20 bg-blue-600 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full -mr-20 -mt-20 opacity-50"></div>
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl font-bold mb-12">Apa Kata Orang Tua?</h2>
        <div className="bg-white/10 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/20">
          <p className="text-xl italic mb-8">"Anak saya sangat senang setiap pagi bersiap ke sekolah. Gurunya sangat penyabar dan perkembangannya dalam berbicara serta kemandiriannya sangat terlihat signifikan!"</p>
          <div className="flex items-center justify-center gap-4">
            <img src="https://via.placeholder.com/60/FF69B4/FFFFFF?text=Ibu" alt="Avatar" className="rounded-full" />
            <div className="text-left">
              <div className="font-bold">Ibu Maya</div>
              <div className="text-blue-200 text-sm">Orang Tua dari Alif (Kelas B)</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;