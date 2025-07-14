import React from "react";
import PrivateCrud from "../components/PrivateCrud";
import { useAuth } from "../hooks/useAuth";

export default function PrivatePage() {
  const { logout } = useAuth();
  return (
    <div>
      <button onClick={logout}>Logout</button>
      <PrivateCrud />
    </div>
  );
}
