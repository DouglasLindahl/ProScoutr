"use client";
import AuthCheck from "@/components/authCheck/page";
import LogoutButton from "@/components/logoutButton/page";
import { useEffect, useState } from "react";

const Dashboard = () => {
  return (
    <AuthCheck>
      <div>dashboard</div>
      <LogoutButton></LogoutButton>
    </AuthCheck>
  );
};

export default Dashboard;
