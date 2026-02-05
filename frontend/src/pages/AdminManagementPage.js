import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';
import Footer from '../components/Footer';

const AdminManagementPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  // Form states
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'admin'
  });

  const sessionId = localStorage.getItem('adminSessionId');

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/admin/list', {
        headers: {
          'X-Session-ID': sessionId
        }
      });
      
      const data = await response.json();
      if (data.success) {
        setAdmins(data.admins);
      } else {
        setError(data.message || 'Gagal mengambil data admin');
      }
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    
    if (!formData.username.trim() || !formData.password.trim()) {
      setError('Username dan password wajib diisi');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password minimal 6 karakter');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/admin/create-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Session-ID': sessionId
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.success) {
        setSuccessMessage('Admin berhasil dibuat!');
        setShowCreateForm(false);
        setFormData({ username: '', password: '', role: 'admin' });
        fetchAdmins();
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError(data.message || 'Gagal membuat admin');
      }
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    }
  };

  const handleUpdateAdmin = async (e) => {
    e.preventDefault();
    
    if (!editingAdmin) return;

    try {
      const response = await fetch(`http://localhost:8080/api/admin/update/${editingAdmin.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Session-ID': sessionId
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.success) {
        setSuccessMessage('Admin berhasil diupdate!');
        setEditingAdmin(null);
        setFormData({ username: '', password: '', role: 'admin' });
        fetchAdmins();
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError(data.message || 'Gagal mengupdate admin');
      }
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    }
  };

  const handleDeleteAdmin = async (adminId, adminUsername) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus admin "${adminUsername}"?`)) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/admin/delete/${adminId}`, {
        method: 'DELETE',
        headers: {
          'X-Session-ID': sessionId
        }
      });

      const data = await response.json();
      if (data.success) {
        setSuccessMessage('Admin berhasil dihapus!');
        fetchAdmins();
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError(data.message || 'Gagal menghapus admin');
      }
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    }
  };

  const startEdit = (admin) => {
    setEditingAdmin(admin);
    setFormData({
      username: admin.username,
      password: '',
      role: admin.role
    });
    setShowCreateForm(false);
  };

  const cancelEdit = () => {
    setEditingAdmin(null);
    setFormData({ username: '', password: '', role: 'admin' });
  };

  const startCreate = () => {
    setShowCreateForm(true);
    setEditingAdmin(null);
    setFormData({ username: '', password: '', role: 'admin' });
  };

  const cancelCreate = () => {
    setShowCreateForm(false);
    setFormData({ username: '', password: '', role: 'admin' });
  };

  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleString('id-ID') : 'N/A';
  };

  const getRoleBadge = (role) => {
    if (role === 'superadmin') {
      return (
        <span className="px-2 py-1 text-xs font-semibold text-purple-700 bg-purple-100 rounded-full">
          👑 Super Admin
        </span>
      );
    }
    return (
      <span className="px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
        👤 Admin
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-xl text-gray-600">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-purple-900 mb-4">
              Manajemen Admin
            </h1>
            <p className="text-gray-600 text-lg">
              Kelola akun admin dan super admin
            </p>
          </div>

          {/* Success/Error Messages */}
          {successMessage && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center gap-3">
              <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>{successMessage}</span>
            </div>
          )}

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-3">
              <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mb-6 flex gap-4">
            <button
              onClick={startCreate}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition shadow-lg flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
              </svg>
              Tambah Admin Baru
            </button>
            
            <button
              onClick={() => navigate('/admin/registrations')}
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-xl transition shadow-lg flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Kembali ke Dashboard
            </button>
          </div>

          {/* Create/Edit Form */}
          {(showCreateForm || editingAdmin) && (
            <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {editingAdmin ? '✏️ Edit Admin' : '➕ Tambah Admin Baru'}
              </h3>
              
              <form onSubmit={editingAdmin ? handleUpdateAdmin : handleCreateAdmin} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Username <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => setFormData({...formData, username: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Masukkan username"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Password {editingAdmin ? '(kosongkan jika tidak diubah)' : ''} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder={editingAdmin ? "Kosongkan jika tidak diubah" : "Masukkan password"}
                      required={!editingAdmin}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Role <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="admin">Admin</option>
                      <option value="superadmin">Super Admin</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
                  >
                    {editingAdmin ? 'Update' : 'Buat'}
                  </button>
                  <button
                    type="button"
                    onClick={editingAdmin ? cancelEdit : cancelCreate}
                    className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold rounded-lg transition"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Admins List */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600">
              <h2 className="text-xl font-bold text-white">Daftar Admin</h2>
            </div>
            
            {admins.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Belum ada admin yang terdaftar
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dibuat</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Terakhir Login</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {admins.map((admin) => (
                      <tr key={admin.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{admin.username}</div>
                          <div className="text-xs text-gray-500">ID: {admin.id.substring(0, 8)}...</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getRoleBadge(admin.role)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            admin.active 
                              ? 'text-green-700 bg-green-100' 
                              : 'text-red-700 bg-red-100'
                          }`}>
                            {admin.active ? '✅ Aktif' : '❌ Nonaktif'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(admin.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(admin.lastLogin)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex gap-2">
                            <button
                              onClick={() => startEdit(admin)}
                              className="text-blue-600 hover:text-blue-800 font-medium"
                              disabled={admin.id === user?.id && admin.role === 'superadmin'}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteAdmin(admin.id, admin.username)}
                              className="text-red-600 hover:text-red-800 font-medium"
                              disabled={admin.id === user?.id}
                            >
                              Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Security Notice */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              🔒 Halaman ini hanya dapat diakses oleh Super Admin.
              <br />
              ⚠️ Hati-hati saat menghapus admin - tindakan tidak dapat dibatalkan.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminManagementPage;