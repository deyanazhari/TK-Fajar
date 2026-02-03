import React from 'react';

const Stats = () => {
  return (
    <div className="bg-yellow-400 py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
        <div>
          <div className="text-4xl font-bold">15+</div>
          <div className="text-sm uppercase tracking-wider font-semibold">Tahun Pengalaman</div>
        </div>
        <div>
          <div className="text-4xl font-bold">20+</div>
          <div className="text-sm uppercase tracking-wider font-semibold">Guru Berlisensi</div>
        </div>
        <div>
          <div className="text-4xl font-bold">500+</div>
          <div className="text-sm uppercase tracking-wider font-semibold">Alumni Sukses</div>
        </div>
        <div>
          <div className="text-4xl font-bold">12</div>
          <div className="text-sm uppercase tracking-wider font-semibold">Ekstrakurikuler</div>
        </div>
      </div>
    </div>
  );
};

export default Stats;