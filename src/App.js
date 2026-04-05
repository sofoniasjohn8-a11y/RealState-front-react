import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
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
import PropertyList from './PropertyList';
import DashboardHome from './pages/DashboardHome';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/dashboard/home" element={<DashboardHome />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/agent/listings" element={<AgentListings />} />
        <Route path="/list-property" element={<ListProperty />} />
        <Route path="/my-requests" element={<MyRequests />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/properties" element={<PropertyList />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
