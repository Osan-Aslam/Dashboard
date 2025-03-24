import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function ProtectRoute() {
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");
  return username && password ? <Outlet /> : <Navigate to="/signin" replace />;
}
export default ProtectRoute
