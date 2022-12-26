import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import { CurrentUserContext } from '../../context';

function ProtectedRoute({ children }) {
  const { loggedIn } = useContext(CurrentUserContext);
  return loggedIn ? children : <Navigate to={ROUTES.MAIN} />
}

export default ProtectedRoute;
