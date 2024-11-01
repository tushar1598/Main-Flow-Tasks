import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/usercontext";

export function AuthProfile({ children }) {
  const { data, authLoading } = useContext(UserContext);
  if (authLoading) return null;
  return data ? children : <Navigate to="/users/sign-in" />;
}

export function AuthSignUp({ children }) {
  const { data, authLoading } = useContext(UserContext);
  if (authLoading) return null;
  return data ? <Navigate to="/users/profile" /> : children;
}

export function AuthSignIn({ children }) {
  const { data, authLoading } = useContext(UserContext);
  if (authLoading) return null;
  return data ? <Navigate to="/users/profile" /> : children;
}

export function AuthResetPasswordLink({ children }) {
  const { data, authLoading } = useContext(UserContext);
  if (authLoading) return null;
  return data ? <Navigate to="/users/profile" /> : children;
}

export function AuthResetPassword({ children }) {
  const { data, authLoading } = useContext(UserContext);
  if (authLoading) return null;
  return data ? <Navigate to="/users/profile" /> : children;
}

export function AuthLogOut({ children }) {
  const { data, authLoading } = useContext(UserContext);
  if (authLoading) return null;
  return data ? children : <Navigate to="/users/sign-in" />;
}

export function AuthUpdate({ children }) {
  const { data, authLoading } = useContext(UserContext);
  if (authLoading) return null;
  return data ? children : <Navigate to="/users/sign-in" />;
}

export function AuthUpdatePassword({ children }) {
  const { data, authLoading } = useContext(UserContext);
  if (authLoading) return null;
  return data ? children : <Navigate to="/users/sign-in" />;
}

export function AuthCreateBlogPage({ children }) {
  const { data, authLoading } = useContext(UserContext);
  if (authLoading) return null;
  return data ? children : <Navigate to="/users/sign-in" />;
}

export function AuthMyBlogPage({ children }) {
  const { data, authLoading } = useContext(UserContext);
  if (authLoading) return null;
  return data ? children : <Navigate to="/users/sign-in" />;
}
export function AuthMyBlogDetailsPage({ children }) {
  const { data, authLoading } = useContext(UserContext);
  if (authLoading) return null;
  return data ? children : <Navigate to="/users/sign-in" />;
}
