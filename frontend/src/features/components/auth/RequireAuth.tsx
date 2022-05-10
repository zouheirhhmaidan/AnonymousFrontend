import { Navigate } from "react-router";
import { useAuth } from "./auth";

export const RequireAuth = ({ children }: any) => {
  const auth = useAuth();
  if (!auth.user) {
    return <Navigate to="/" />;
  }
  return children;
};
