import { NavLink } from 'react-router-dom';

function Logo({ className }) {
  return <NavLink to="/" className={`logo ${className}`} />;
}

export default Logo;
