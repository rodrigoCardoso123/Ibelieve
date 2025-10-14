import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type Role = 'admin' | 'user'; // Defina os papéis válidos do seu sistema

interface ProtectedRouteProps {
  children: ReactNode;
  role: Role;
}

function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  // Bloqueia se não tiver token ou se o papel for diferente do esperado
  if (!token || userRole !== role) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;