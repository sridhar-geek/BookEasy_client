import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;

/** This component use to protect user routes
 it redirects to login page if user is not exists */
