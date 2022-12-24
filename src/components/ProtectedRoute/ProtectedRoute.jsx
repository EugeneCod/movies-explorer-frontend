import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { routes } from '../../utils/constants';
import { AuthContext } from '../../context';

function ProtectedRoute({ children }) {
  const { loggedIn } = useContext(AuthContext);
  return loggedIn ? children : <Navigate to={routes.main} />
}

export default ProtectedRoute;
