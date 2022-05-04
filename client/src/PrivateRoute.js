import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute({ isLogin }) {
  return isLogin ? <Navigate to="/login" /> : <Navigate to="/login" />;
}

export default PrivateRoute;
