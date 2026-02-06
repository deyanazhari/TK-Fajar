import React, { useState, useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/Footer';
import PhotoStorage from '../services/PhotoStorage';

const KegiatanPage = () => {
  const [kegiatanPhotos, setKegiatanPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = () => {
    try {
      const photos = PhotoStorage.getPhotos();
      setKegiatanPhotos(photos);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading photos:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-blue-50 text-gray-800">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
              Kegiatan TK Fajar
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dokumentasi kegiatan sehari-hari siswa-siswi TK Fajar dalam proses belajar dan bermain
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-96">
              <div className="text-xl text-gray-600">Memuat foto kegiatan...</div>
            </div>
          ) : kegiatanPhotos.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <div className="text-gray-400 text-xl mb-4">Belum ada foto kegiatan</div>
              <p className="text-gray-600">Admin akan segera menambahkan foto-foto kegiatan terbaru.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {kegiatanPhotos.map((photo) => (
                <div key={photo.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="aspect-w-16 aspect-h-12">
                    <img 
                      src={photo.image_url} 
                      alt={photo.title}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{photo.title}</h3>
                    <p className="text-gray-600">{photo.description}</p>
                    {photo.createdAt && (
                      <p className="text-sm text-gray-400 mt-2">
                        Ditambahkan: {new Date(photo.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-16 bg-blue-600 text-white rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ingin Anak Anda Bergabung?</h2>
            <p className="text-xl mb-8">Daftarkan anak Anda sekarang untuk mendapatkan pengalaman belajar terbaik</p>
            <button 
              onClick={() => window.location.href = '/registration'}
              className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full font-bold shadow-lg transition transform hover:scale-105 inline-block text-lg"
            >
              Daftar Sekarang
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default KegiatanPage;