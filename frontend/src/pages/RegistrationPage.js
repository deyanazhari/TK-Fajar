import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/Footer';
import { submitRegistration } from '../services/api';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    parentName: '',
    childName: '',
    whatsapp: '',
    alamat: '',
    tanggalLahir: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.parentName.trim()) {
      newErrors.parentName = 'Nama orang tua wajib diisi';
    }
    
    if (!formData.childName.trim()) {
      newErrors.childName = 'Nama anak wajib diisi';
    }
    
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'Nomor WhatsApp wajib diisi';
    } else if (!/^[0-9]{10,13}$/.test(formData.whatsapp)) {
      newErrors.whatsapp = 'Format nomor WhatsApp tidak valid (10-13 digit angka)';
    }
    
    if (!formData.alamat.trim()) {
      newErrors.alamat = 'Alamat wajib diisi';
    }
    
    if (!formData.tanggalLahir) {
      newErrors.tanggalLahir = 'Tanggal lahir anak wajib diisi';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      await submitRegistration(formData);
      setShowSuccess(true);
      setFormData({ parentName: '', childName: '', whatsapp: '', alamat: '', tanggalLahir: '' });
      setErrors({});
    } catch (error) {
      console.error('Error submitting form:', error);
      const errorMessage = error.response?.data?.message || 'Terjadi kesalahan. Silakan coba lagi.';
      setErrors({ submit: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Pendaftaran Berhasil!</h2>
            <p className="text-gray-600 mb-8">Terima kasih! Kami akan segera menghubungi Anda untuk informasi selanjutnya.</p>
            <div className="space-y-3">
              <button
                onClick={handleBackToHome}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition"
              >
                Kembali ke Beranda
              </button>
              <button
                onClick={() => {
                  setShowSuccess(false);
                  setFormData({ parentName: '', childName: '', whatsapp: '', alamat: '', tanggalLahir: '' });
                }}
                className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-3 rounded-xl transition"
              >
                Daftar Anak Lain
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 py-16 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400 rounded-2xl mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-blue-900 mb-4">
              Formulir Pendaftaran
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Bergabunglah dengan TK Fajar dan berikan pendidikan terbaik untuk buah hati Anda
            </p>
          </div>

          {/* Registration Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.submit && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
                  {errors.submit}
                </div>
              )}

              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Nama Orang Tua <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="parentName"
                  placeholder="Masukkan nama lengkap Anda" 
                  value={formData.parentName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl bg-gray-50 border ${errors.parentName ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent`}
                />
                {errors.parentName && (
                  <p className="text-red-500 text-sm mt-1">{errors.parentName}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Nama Anak <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="childName"
                  placeholder="Nama lengkap si kecil" 
                  value={formData.childName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl bg-gray-50 border ${errors.childName ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent`}
                />
                {errors.childName && (
                  <p className="text-red-500 text-sm mt-1">{errors.childName}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Nomor WhatsApp <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 font-semibold">+62</span>
                  </div>
                  <input 
                    type="tel" 
                    name="whatsapp"
                    placeholder="812-3456-7890" 
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className={`w-full pl-16 pr-4 py-3 rounded-xl bg-gray-50 border ${errors.whatsapp ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent`}
                  />
                </div>
                {errors.whatsapp && (
                  <p className="text-red-500 text-sm mt-1">{errors.whatsapp}</p>
                )}
                <p className="text-gray-500 text-sm mt-1">Format: 812-3456-7890 (tanpa +62)</p>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Alamat <span className="text-red-500">*</span>
                </label>
                <textarea 
                  name="alamat"
                  placeholder="Masukkan alamat lengkap" 
                  value={formData.alamat}
                  onChange={handleChange}
                  rows="3"
                  className={`w-full px-4 py-3 rounded-xl bg-gray-50 border ${errors.alamat ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none`}
                />
                {errors.alamat && (
                  <p className="text-red-500 text-sm mt-1">{errors.alamat}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Tanggal Lahir Anak <span className="text-red-500">*</span>
                </label>
                <input 
                  type="date" 
                  name="tanggalLahir"
                  value={formData.tanggalLahir}
                  onChange={handleChange}
                  max={new Date().toISOString().split('T')[0]}
                  className={`w-full px-4 py-3 rounded-xl bg-gray-50 border ${errors.tanggalLahir ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent`}
                />
                {errors.tanggalLahir && (
                  <p className="text-red-500 text-sm mt-1">{errors.tanggalLahir}</p>
                )}
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="font-bold text-blue-900 mb-3">Kenapa Memilih TK Fajar?</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>15+ tahun pengalaman dalam pendidikan anak usia dini</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>20+ guru berlisensi dan berpengalaman</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Kurikulum Montessori yang dipersonalisasi</span>
                  </li>
                </ul>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleBackToHome}
                  className="flex-1 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-bold py-4 rounded-xl transition"
                >
                  Kembali
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Mengirim...
                    </span>
                  ) : (
                    'Daftar Sekarang'
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Butuh bantuan? Hubungi kami:</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center gap-2 text-blue-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <span>(021) 1234-5678</span>
              </div>
              <div className="flex items-center gap-2 text-pink-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span>Jl. Fajar No. 12, Jakarta Selatan</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RegistrationPage;