import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const token = useSelector(state => state.phonebook.token);

  return <>{token ? children : <Navigate to="/login" />}</>;
}
