import React, { useState } from 'react';
import { submitRegistration } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    parentName: '',
    childName: '',
    whatsapp: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await submitRegistration(formData);
      setShowSuccess(true);
      setFormData({ parentName: '', childName: '', whatsapp: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="kontak" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-yellow-50 rounded-[3rem] p-8 md:p-16 flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold text-blue-900 mb-6">Mulai Petualangan Belajar si Kecil Hari Ini!</h2>
            <p className="text-gray-600 mb-8">Hubungi kami untuk informasi biaya pendidikan, jadwal kunjungan sekolah, atau pendaftaran online.</p>
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
                <span className="font-bold text-lg">Jl. Ceria No. 12, Jakarta Selatan</span>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 w-full bg-white p-8 rounded-3xl shadow-xl">
            {!showSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Nama Orang Tua</label>
                  <input 
                    type="text" 
                    name="parentName"
                    placeholder="Masukkan nama Anda" 
                    value={formData.parentName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Nama Anak</label>
                  <input 
                    type="text" 
                    name="childName"
                    placeholder="Nama lengkap si kecil" 
                    value={formData.childName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Nomor WhatsApp</label>
                  <input 
                    type="tel" 
                    name="whatsapp"
                    placeholder="0812..." 
                    value={formData.whatsapp}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition shadow-lg disabled:opacity-50"
                >
                  {loading ? 'Mengirim...' : 'Kirim Pertanyaan'}
                </button>
              </form>
            ) : (
              <div className="text-center p-4 bg-green-100 text-green-700 rounded-xl font-bold">
                Terima kasih! Kami akan segera menghubungi Anda.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;