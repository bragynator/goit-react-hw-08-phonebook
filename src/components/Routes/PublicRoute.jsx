import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function PublicRoute({ children, restricted }) {
  const token = useSelector(state => state.phonebook.token);

  return <>{token && restricted ? <Navigate to="/contacts" /> : children}</>;
}
