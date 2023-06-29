import { Navigate, Route, RouteProps } from 'react-router-dom';

import React from 'react';
import { sessionState } from './atoms/atoms';
import { useRecoilValue } from 'recoil';

const ProtectedRoute: React.FC<RouteProps> = (props) => {
  const session = useRecoilValue(sessionState);

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return <Route {...props} />;
};

export default ProtectedRoute;