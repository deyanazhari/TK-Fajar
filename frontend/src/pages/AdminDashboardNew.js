import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState([]);

  const [error, setError] = useState('');
  const [sessionWarning, setSessionWarning] = useState('');
  const [sessionTimeLeft, setSessionTimeLeft] = useState(20 * 60);

  const [successMessage, setSuccessMessage] = useState('');
  const sessionId = localStorage.getItem('adminSessionId');

  const fetchRegistrations = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/registration', {
        headers: {
          'X-Session-ID': sessionId
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setRegistrations(data);
      }
    } catch (err) {
      setError('Gagal mengambil data pendaftaran');
    } finally {
      // Note: We'll handle loading state separately since we're not using it anymore
    }
  };

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
      } else if (data.remainingTime < 20) {
        setSessionWarning(`Session akan berakhir dalam ${data.remainingTime} detik`);
      } else {
        setSessionWarning('');
      }
    } catch (err) {
      console.error('Session check error:', err);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };



  useEffect(() => {
    fetchRegistrations();
    
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
    }, 1000); // Update every second

    return () => clearInterval(sessionInterval);
  }, []);



  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>{user?.role === 'superadmin' ? 'Super Admin Dashboard' : 'Admin Dashboard'} - TK Fajar</h1>
        <div style={styles.headerRight}>
          <div style={styles.sessionTimer(sessionTimeLeft)}>
            <span>⏱️ {Math.floor(sessionTimeLeft / 60)}:{(sessionTimeLeft % 60).toString().padStart(2, '0')}</span>
          </div>
          <span>Selamat datang, {user?.username}</span>
          <button 
            onClick={() => navigate('/admin/kegiatan')} 
            style={styles.kegiatanBtn}
          >
            📸 Kelola Kegiatan
          </button>
          {user?.role === 'superadmin' && (
            <>
              <button 
                onClick={() => navigate('/admin/manage')} 
                style={styles.manageAdminBtn}
              >
                👥 Kelola Admin
              </button>
              <button 
                onClick={() => navigate('/admin/change-password')} 
                style={styles.changePasswordBtn}
              >
                🔒 Ubah Password
              </button>
            </>
          )}
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </header>

      <main style={styles.main}>
        {successMessage && (
          <div style={styles.successMessage}>
            ✅ {successMessage}
          </div>
        )}
        
        {sessionWarning && (
          <div style={styles.sessionWarning}>
            ⚠️ {sessionWarning}
          </div>
        )}
        
        <div style={styles.stats}>
          <div style={styles.statCard}>
            <h3>Total Pendaftaran</h3>
            <p style={styles.statNumber}>{registrations.length}</p>
          </div>
        </div>

        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        <div style={styles.tableContainer}>
          <h2>Data Pendaftaran</h2>
          {registrations.length === 0 ? (
            <div style={styles.noData}>
              Belum ada data pendaftaran
            </div>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>No</th>
                  <th style={styles.th}>Nama Orang Tua</th>
                  <th style={styles.th}>Nama Anak</th>
                  <th style={styles.th}>Tanggal Lahir</th>
                  <th style={styles.th}>Alamat</th>
                  <th style={styles.th}>WhatsApp</th>
                  <th style={styles.th}>Tanggal Daftar</th>
                  <th style={styles.th}>ID Pendaftaran</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((registration, index) => (
                  <tr key={registration.id}>
                    <td style={styles.td}>{index + 1}</td>
                    <td style={styles.td}>{registration.parentName}</td>
                    <td style={styles.td}>{registration.childName}</td>
                    <td style={{...styles.td, fontSize: '12px'}}>
                      {registration.tanggalLahir ? new Date(registration.tanggalLahir).toLocaleDateString('id-ID') : 'N/A'}
                    </td>
                    <td style={{...styles.td, fontSize: '12px', maxWidth: '200px'}} title={registration.alamat}>
                      {registration.alamat || 'N/A'}
                    </td>
                    <td style={styles.td}>
                      <div style={styles.whatsappContainer}>
                        <span style={styles.whatsappNumber}>{registration.whatsapp}</span>
                      </div>
                    </td>
                    <td style={{...styles.td, fontSize: '12px'}}>
                      {new Date(registration.createdAt).toLocaleString('id-ID')}
                    </td>
                    <td style={styles.td}>
                      <code style={styles.idCode}>
                        {String(registration.id).substring(0, 8)}...
                      </code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>


    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5'
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh'
  },
  header: {
    backgroundColor: 'white',
    padding: '20px 30px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  logoutBtn: {
    padding: '8px 16px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  main: {
    padding: '30px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  stats: {
    marginBottom: '30px'
  },
  statCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center',
    maxWidth: '200px'
  },
  statNumber: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#007bff',
    margin: '10px 0 0 0'
  },
  tableContainer: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px'
  },
  th: {
    backgroundColor: '#f8f9fa',
    padding: '12px',
    textAlign: 'left',
    fontWeight: '600',
    borderBottom: '2px solid #dee2e6'
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #dee2e6'
  },
  whatsappContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  },
  whatsappNumber: {
    color: '#007bff',
    fontWeight: '500'
  },
  idCode: {
    backgroundColor: '#f1f3f4',
    color: '#007bff',
    padding: '2px 6px',
    borderRadius: '3px',
    fontSize: '11px',
    fontFamily: 'monospace'
  },
  noData: {
    textAlign: 'center',
    padding: '40px',
    color: '#666'
  },
  error: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '12px',
    borderRadius: '4px',
    marginBottom: '20px'
  },
  sessionWarning: {
    backgroundColor: '#fff3cd',
    color: '#856404',
    border: '1px solid #ffeaa7',
    padding: '12px',
    borderRadius: '4px',
    marginBottom: '20px',
    textAlign: 'center',
    fontWeight: '500'
  },
  sessionTimer: (timeLeft) => ({
    backgroundColor: timeLeft < 20 ? '#f8d7da' : '#d4edda',
    color: timeLeft < 20 ? '#721c24' : '#155724',
    padding: '8px 12px',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: 'bold',
    marginRight: '15px'
  }),
  kegiatanBtn: {
    backgroundColor: '#f59e0b',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s',
    marginRight: '15px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  manageAdminBtn: {
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s',
    marginRight: '15px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  changePasswordBtn: {
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s',
    marginRight: '15px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  successMessage: {
    backgroundColor: '#d1fae5',
    color: '#065f46',
    border: '1px solid #a7f3d0',
    padding: '12px',
    borderRadius: '4px',
    marginBottom: '20px',
    textAlign: 'center',
    fontWeight: '500'
  }
};

export default AdminDashboard;