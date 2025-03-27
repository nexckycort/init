import {
  type ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { auth } from './auth';

interface User {
  name: string;
}

export type AuthContextProps = {
  loading: boolean;
  isAuthenticated: boolean;
  checkAuth: () => Promise<boolean>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  user: User | null;
};

export const AuthContext = createContext<AuthContextProps | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const isAuthenticated = currentUser !== null;

  const login = useCallback(async (email: string, password: string) => {
    const response = await auth.login(email, password);
    if (!response) {
      throw new Error('Credenciales inválidas');
    }
    setCurrentUser({
      name: response.user.name ?? '',
    });
  }, []);

  const logout = useCallback(async () => await auth.signOut(), []);

  const checkAuth = useCallback(async () => {
    const response = await auth.currentAuthenticatedUser();
    if (!response) return false;
    return true;
  }, []);

  const fetchCurrentUser = useCallback(async () => {
    const response = await auth.currentAuthenticatedUser();
    if (!response) {
      setCurrentUser(null);
    }
    setCurrentUser({
      name: response?.name ?? '',
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    if (window.location.pathname !== '/sign-in') {
      fetchCurrentUser();
    }
  }, [fetchCurrentUser]);

  return (
    <AuthContext.Provider
      value={{
        loading,
        isAuthenticated,
        checkAuth,
        login,
        logout,
        user: currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
