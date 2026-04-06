import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AgentListings from './pages/AgentListings';
import ListProperty from './pages/ListProperty';
import MyRequests from './pages/MyRequests';
import Orders from './pages/Orders';
import ChangePassword from './pages/ChangePassword';
import CustomRequest from './pages/CustomRequest';
import SelectAgent from './pages/SelectAgent';
import AgentDetail from './pages/AgentDetail';
import PropertyList from './PropertyList';
import DashboardHome from './pages/DashboardHome';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>}>
            <Route index element={<DashboardHome />} />
            <Route path="select-agent" element={<SelectAgent />} />
            <Route path="requests" element={<MyRequests />} />
            <Route path="orders" element={<Orders />} />
            <Route path="custom-request" element={<CustomRequest />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
          <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/agent/listings" element={<ProtectedRoute allowedRoles={['AGENT']}><AgentListings /></ProtectedRoute>} />
          <Route path="/list-property" element={<ProtectedRoute allowedRoles={['AGENT']}><ListProperty /></ProtectedRoute>} />
          <Route path="/agent/:id" element={<ProtectedRoute><AgentDetail /></ProtectedRoute>} />
          <Route path="/properties" element={<PropertyList />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
