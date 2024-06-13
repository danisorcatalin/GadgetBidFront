import { useContext } from 'react';
import AuthContext from '../contexts/JWTContext';
import { AuthContextValue } from 'contexts/JWTContext';

const useAuth = (): AuthContextValue => useContext(AuthContext);

export default useAuth;
