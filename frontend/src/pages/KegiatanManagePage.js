import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';
import Footer from '../components/Footer';
import PhotoStorage from '../services/PhotoStorage';

const KegiatanManagePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [kegiatanPhotos, setKegiatanPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [sessionWarning, setSessionWarning] = useState('');
  const [sessionTimeLeft, setSessionTimeLeft] = useState(20 * 60);
  const sessionId = localStorage.getItem('adminSessionId');
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: ''
  });

  // Load photos from storage
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

  useEffect(() => {
    // Start session countdown
    const sessionInterval = setInterval(() => {
      checkSessionStatus();
      setSessionTimeLeft(prev => {
        if (prev <= 1) {
          handleLogout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(sessionInterval);
  }, []);

  const checkSessionStatus = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/admin/check-session', {
        headers: {
          'X-Session-ID': sessionId
        }
      });
      
      const data = await response.json();
      
      if (!data.valid) {
        setSessionWarning('Session telah berakhir. Silakan login kembali.');
        setTimeout(() => {
          handleLogout();
        }, 3000);
      } else {
        setSessionTimeLeft(data.remainingTime || sessionTimeLeft);
      }
    } catch (error) {
      console.error('Error checking session:', error);
    }
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem('adminSessionId');
    navigate('/admin/login');
  };

  const handleAddPhoto = async () => {
    try {
      const savedPhoto = PhotoStorage.savePhoto(formData);
      setKegiatanPhotos([...kegiatanPhotos, savedPhoto]);
      setShowAddModal(false);
      setCurrentPhoto(null);
      setFormData({ title: '', description: '', image_url: '' });
      setFileInputKey(Date.now()); // Reset file input
      alert('Foto berhasil ditambahkan!');
    } catch (error) {
      console.error('Error saving photo:', error);
      alert('Gagal menyimpan foto. Silakan coba lagi.');
    }
  };

  const handleEditPhoto = () => {
    try {
      const updatedPhoto = PhotoStorage.updatePhoto(currentPhoto.id, formData);
      if (updatedPhoto) {
        const updatedPhotos = kegiatanPhotos.map(photo => 
          photo.id === currentPhoto.id ? updatedPhoto : photo
        );
        setKegiatanPhotos(updatedPhotos);
        setShowEditModal(false);
        setCurrentPhoto(null);
        setFormData({ title: '', description: '', image_url: '' });
        setFileInputKey(Date.now()); // Reset file input
        alert('Foto berhasil diperbarui!');
      } else {
        alert('Foto tidak ditemukan.');
      }
    } catch (error) {
      console.error('Error updating photo:', error);
      alert('Gagal memperbarui foto. Silakan coba lagi.');
    }
  };

  const handleDeletePhoto = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus foto ini?')) {
      try {
        const success = PhotoStorage.deletePhoto(id);
        if (success) {
          setKegiatanPhotos(kegiatanPhotos.filter(photo => photo.id !== id));
          alert('Foto berhasil dihapus!');
        } else {
          alert('Foto tidak ditemukan.');
        }
      } catch (error) {
        console.error('Error deleting photo:', error);
        alert('Gagal menghapus foto. Silakan coba lagi.');
      }
    }
  };

  const openEditModal = (photo) => {
    setCurrentPhoto(photo);
    setFormData({
      title: photo.title,
      description: photo.description,
      image_url: photo.image_url
    });
    setShowEditModal(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert('Ukuran file terlalu besar. Maksimal 5MB.');
          return;
        }

        // Check file type
        if (!file.type.match('image.*')) {
          alert('File harus berupa gambar (JPG, PNG, GIF).');
          return;
        }

        // Convert to base64
        const imageUrl = await PhotoStorage.uploadImage(file);
        setFormData({ ...formData, image_url: imageUrl });
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Gagal mengunggah gambar. Silakan coba lagi.');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="bg-blue-50 text-gray-800">
        <Navbar />
        <div className="flex justify-center items-center h-96">
          <div className="text-xl">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-blue-50 text-gray-800">
      <Navbar />
      
      {/* Session Timer and Warning */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Kelola Kegiatan - Admin: {user?.username}</span>
              <div className="flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium" style={{
                backgroundColor: sessionTimeLeft < 300 ? '#fee2e2' : '#f0f9ff',
                color: sessionTimeLeft < 300 ? '#dc2626' : '#1e40af'
              }}>
                <span>⏱️ {Math.floor(sessionTimeLeft / 60)}:{(sessionTimeLeft % 60).toString().padStart(2, '0')}</span>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              Logout
            </button>
          </div>
          {sessionWarning && (
            <div className="mt-2 bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm">
              ⚠️ {sessionWarning}
            </div>
          )}
        </div>
      </div>
      
      <div className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-blue-600 mb-2">
                Kelola Kegiatan
              </h1>
              <p className="text-gray-600">Kelola foto-foto kegiatan sekolah</p>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg transition transform hover:scale-105"
            >
              + Tambah Foto
            </button>
          </div>

          {kegiatanPhotos.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <div className="text-gray-400 text-xl mb-4">Belum ada foto kegiatan</div>
              <button 
                onClick={() => setShowAddModal(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-bold transition"
              >
                Tambah Foto Pertama
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {kegiatanPhotos.map((photo) => (
                <div key={photo.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="aspect-w-16 aspect-h-12">
                    <img 
                      src={photo.image_url} 
                      alt={photo.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{photo.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{photo.description}</p>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => openEditModal(photo)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeletePhoto(photo.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Tambah Foto Kegiatan</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan judul foto"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Masukkan deskripsi foto"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL Gambar</label>
                <input
                  key={fileInputKey}
                  type="file"
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formData.image_url && (
                  <img 
                    src={formData.image_url} 
                    alt="Preview" 
                    className="mt-2 w-full h-32 object-cover rounded-lg"
                  />
                )}
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button 
                onClick={handleAddPhoto}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition"
              >
                Simpan
              </button>
              <button 
                onClick={() => {
                  setShowAddModal(false);
                  setFormData({ title: '', description: '', image_url: '' });
                  setFileInputKey(Date.now()); // Reset file input
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Edit Foto Kegiatan</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan judul foto"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Masukkan deskripsi foto"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL Gambar</label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan URL gambar"
                />
                {formData.image_url && (
                  <img 
                    src={formData.image_url} 
                    alt="Preview" 
                    className="mt-2 w-full h-32 object-cover rounded-lg"
                  />
                )}
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button 
                onClick={handleEditPhoto}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition"
              >
                Update
              </button>
              <button 
                onClick={() => {
                  setShowEditModal(false);
                  setCurrentPhoto(null);
                  setFormData({ title: '', description: '', image_url: '' });
                  setFileInputKey(Date.now()); // Reset file input
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default KegiatanManagePage;