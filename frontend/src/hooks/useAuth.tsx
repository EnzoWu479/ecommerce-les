import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { useQuery } from '@tanstack/react-query';
interface IUserProvider {
  isAuthenticated: () => boolean;
  login: () => Promise<boolean>;
  logout: () => void;
}
interface ChildrenProps {
  children: ReactNode;
}
const AuthContext = createContext({} as IUserProvider);

const AuthProvider = ({ children }: ChildrenProps) => {
  const [isLogged, setIsLogged] = useState(false);
  // const {} = useQuery
  

  const isAuthenticated = () => isLogged;

  const login = async () => {
    setIsLogged(true);
    return true;
  };

  const logout = () => {
    setIsLogged(false);
  };

  const memorized = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout
    }),
    [isLogged]
  );

  // if (loading) {
  //   return null;
  // }

  return (
    <AuthContext.Provider value={memorized}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
