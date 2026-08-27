import { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

import { useSelector } from '../../services/store';
import { Preloader } from '@ui';

type UnAuthRouteProps = {
  children: ReactElement;
};

export const UnAuthRoute: FC<UnAuthRouteProps> = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  const isAuthChecked = useSelector((state) => state.user.isAuthChecked);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (user) {
    return <Navigate to='/' replace />;
  }

  return children;
};
