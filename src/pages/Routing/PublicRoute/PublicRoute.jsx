import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function publicRoute() {
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");

  return username && password ? <Navigate to="/dashboard" replace /> : <Outlet />
};

export default publicRoute
