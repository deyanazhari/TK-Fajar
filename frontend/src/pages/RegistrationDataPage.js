import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/Footer';
import { getRegistrations } from '../services/api';
import { useAuth } from '../context/AuthContext';

const RegistrationDataPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const data = await getRegistrations();
      setRegistrations(data);
      setError('');
    } catch (error) {
      console.error('Error fetching registrations:', error);
      setError('Gagal memuat data pendaftaran. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const filteredRegistrations = registrations.filter(reg => 
    reg.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.whatsapp.includes(searchTerm) ||
    (reg.alamat && reg.alamat.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatWhatsApp = (whatsapp) => {
    return `+62 ${whatsapp}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-10">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-600">Selamat datang,</p>
                  <p className="font-bold text-gray-900">{user?.username}</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl font-bold transition flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
                Logout
              </button>
            </div>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-blue-900 mb-4">
              Data Pendaftaran
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Kelola dan pantau data pendaftaran calon siswa TK Fajar
            </p>
          </div>

          {/* Controls */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Cari nama orang tua, nama anak, WhatsApp, atau alamat..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={fetchRegistrations}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  Refresh Data
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-xl font-bold transition"
                >
                  Kembali ke Beranda
                </button>
                <button
                  onClick={() => navigate('/admin')}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-bold transition"
                >
                  📊 Dashboard
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Pendaftar</p>
                  <p className="text-3xl font-bold text-blue-900">{registrations.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Pencarian Aktif</p>
                  <p className="text-3xl font-bold text-green-600">{filteredRegistrations.length}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Status Sistem</p>
                  <p className="text-lg font-bold text-green-600">Online</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Data Table */}
          {loading ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
                <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <p className="text-gray-600 text-lg">Memuat data pendaftaran...</p>
            </div>
          ) : error ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-2xl mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <p className="text-red-600 text-lg mb-4">{error}</p>
              <button
                onClick={fetchRegistrations}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold transition"
              >
                Coba Lagi
              </button>
            </div>
          ) : filteredRegistrations.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-2xl mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <p className="text-gray-600 text-lg mb-2">
                {searchTerm ? 'Tidak ada data yang cocok dengan pencarian Anda' : 'Belum ada data pendaftaran'}
              </p>
              <p className="text-gray-500 text-sm">
                {searchTerm ? 'Coba ubah kata kunci pencarian' : 'Formulir pendaftaran pertama akan muncul di sini'}
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">No</th>
                      <th className="px-6 py-4 text-left font-semibold">Nama Orang Tua</th>
                      <th className="px-6 py-4 text-left font-semibold">Nama Anak</th>
                      <th className="px-6 py-4 text-left font-semibold">Tanggal Lahir</th>
                      <th className="px-6 py-4 text-left font-semibold">Alamat</th>
                      <th className="px-6 py-4 text-left font-semibold">WhatsApp</th>
                      <th className="px-6 py-4 text-left font-semibold">Tanggal Daftar</th>
                      <th className="px-6 py-4 text-left font-semibold">ID Pendaftaran</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredRegistrations.map((registration, index) => (
                      <tr key={registration.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-gray-700 font-medium">{index + 1}</td>
                        <td className="px-6 py-4 text-gray-900 font-semibold">{registration.parentName}</td>
                        <td className="px-6 py-4 text-gray-700">{registration.childName}</td>
                        <td className="px-6 py-4 text-gray-600 text-sm">
                          {registration.tanggalLahir ? new Date(registration.tanggalLahir).toLocaleDateString('id-ID') : 'N/A'}
                        </td>
                        <td className="px-6 py-4 text-gray-600 text-sm max-w-xs truncate" title={registration.alamat}>
                          {registration.alamat || 'N/A'}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                            </svg>
                            <span className="text-gray-700 font-medium">{formatWhatsApp(registration.whatsapp)}</span>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4 text-gray-600 text-sm">{formatDate(registration.createdAt)}</td>
                        <td className="px-6 py-4">
                          <code className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            {String(registration.id).substring(0, 8)}...
                          </code>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RegistrationDataPage;