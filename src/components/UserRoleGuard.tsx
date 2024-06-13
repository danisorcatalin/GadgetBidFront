import type { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { UserRole } from '../types/user';

interface UserRoleGuardProps {
  roles: UserRole[];
  children: ReactNode;
}

const UserRoleGuard: FC<UserRoleGuardProps> = (props) => {
  const { roles, children } = props;
  const {
    user: { role: currentUserRole },
  } = useAuth();

  if (!roles.includes(currentUserRole)) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};

export default UserRoleGuard;
