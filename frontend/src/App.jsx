import { useState } from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Navbar from './components/Navbar.jsx';
import Home from './pages/home.jsx';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function AppContent() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
 
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <div style={{ padding: '50px', textAlign: 'center' }}>
                <h1>Welcome to Dashboard! 🔐</h1>
                <p>You are logged in successfully!</p>
              </div>
            </ProtectedRoute>
          } 
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
