import React, { createContext, useContext, useState, useEffect } from 'react';
import { insforge } from '../lib/insforge';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await insforge.auth.getCurrentUser();
        if (data?.user) {
          setUser(data.user);
        }
      } catch (err) {
        console.error('Failed to get session', err);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  const login = async (email, password) => {
    const { data, error } = await insforge.auth.signInWithPassword({ email, password });
    if (error) throw error;
    setUser(data.user);
    return data;
  };

  const signup = async (email, password, name) => {
    const { data, error } = await insforge.auth.signUp({
      email,
      password,
      name
    });
    if (error) throw error;
    if (data?.user) {
      setUser(data.user);
    }
    return data;
  };

  const logout = async () => {
    await insforge.auth.signOut();
    setUser(null);
  };

  const verifyEmail = async (email, otp) => {
    const { data, error } = await insforge.auth.verifyEmail({ email, otp });
    if (error) throw error;
    if (data?.user) {
      setUser(data.user);
    }
    return data;
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, verifyEmail, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
