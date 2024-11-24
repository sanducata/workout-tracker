import { createContext, useContext, useEffect, useState } from 'react';
import {
  deleteFromSecureStore,
  getFromSecureStore,
  saveToSecureStore,
} from '@/lib/secureStore';

type AuthProps = {
  authState: {
    authenticated: boolean | null;
    email: string | null;
    username: string | null;
  };
  onSignup: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  onLogin: (email: string, password: string) => Promise<void>;
  onLogout: () => Promise<void>;
};

const AuthContext = createContext<Partial<AuthProps>>({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    authenticated: boolean | null;
    email: string | null;
    username: string | null;
  }>({
    authenticated: null,
    email: null,
    username: null,
  });

  // This function checks the authentication status on mount
  useEffect(() => {
    const initializeAuth = async () => {
      await checkAuthStatus(); // Check if the user is authenticated on initial load
    };

    initializeAuth();
  }, []);

  const signup = async (email: string, password: string, username: string) => {
    await saveToSecureStore('email', email);
    await saveToSecureStore('password', password);
    await saveToSecureStore('username', username);
  };

  const login = async (email: string, password: string) => {
    // Retrieve stored credentials from SecureStore
    const storedEmail = await getFromSecureStore('email');
    const storedPassword = await getFromSecureStore('password');
    const storedUsername = await getFromSecureStore('username');

    if (storedEmail === email && storedPassword === password) {
      setAuthState({
        authenticated: true,
        email,
        username: storedUsername,
      });
    } else {
      alert('Invalid username or password!');
    }
  };

  const logout = async () => {
    // Clear credentials from SecureStore on logout
    await deleteFromSecureStore('email');
    await deleteFromSecureStore('password');
    await deleteFromSecureStore('username');

    setAuthState({
      authenticated: false,
      email: null,
      username: null,
    });
  };

  const checkAuthStatus = async () => {
    const storedEmail = await getFromSecureStore('email');
    const storedPassword = await getFromSecureStore('password');
    const storedUsername = await getFromSecureStore('username');

    if (storedEmail && storedPassword && storedUsername) {
      setAuthState({
        authenticated: true,
        email: storedEmail,
        username: storedUsername,
      });
    }
    console.log(authState);
  };

  const value = {
    onSignup: signup,
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
