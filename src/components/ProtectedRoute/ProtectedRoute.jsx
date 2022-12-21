import { useNavigate } from "react-router-dom";


function ProtectedRoute({ loggedIn, children, redirectLink }) {
  const navigate = useNavigate();
  return loggedIn ? children : navigate(redirectLink);
}

export default ProtectedRoute;