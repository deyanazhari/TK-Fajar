import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/common/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Programs from './components/Programs';
import Curriculum from './components/Curriculum';
import Testimonial from './components/Testimonial';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import RegistrationPage from './pages/RegistrationPage';
import RegistrationDataPage from './pages/RegistrationDataPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import AdminManagementPage from './pages/AdminManagementPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboardNew';
import KegiatanPage from './pages/KegiatanPage';
import KegiatanManagePage from './pages/KegiatanManagePage';

function App() {
  return (
    <AuthProvider>
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={
            <div className="bg-blue-50 text-gray-800">
              <Navbar />
              <div id="beranda">
                <Hero />
                <Stats />
              </div>
              <div id="tentang">
                <Curriculum />
              </div>
              <div id="program">
                <Programs />
              </div>
              <div id="fasilitas">
                <Testimonial />
              </div>
              <Contact />
              <Footer />
              <Chatbot />
            </div>
          } />
          <Route path="/kegiatan" element={<KegiatanPage />} />
          <Route 
            path="/admin/kegiatan" 
            element={
              <ProtectedRoute>
                <KegiatanManagePage />
              </ProtectedRoute>
            } 
          />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <Navigate to="/admin/registrations" replace />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/registrations" 
            element={
              <ProtectedRoute>
                <RegistrationDataPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/change-password" 
            element={
              <ProtectedRoute requiredRole="superadmin">
                <ChangePasswordPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/manage" 
            element={
              <ProtectedRoute requiredRole="superadmin">
                <AdminManagementPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;