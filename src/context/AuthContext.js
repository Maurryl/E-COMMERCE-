import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
  const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null);

  const login = async (username, password) => {
    const response = await axios.post('http://localhost:5000/api/login', { username, password });
    setAuthTokens(response.data.access_token);
    setUser(jwtDecode(response.data.access_token));
    localStorage.setItem('authTokens', JSON.stringify(response.data.access_token));
  };

  const logout = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwtDecode(authTokens));

      // const decoded = jwtDecode(authTokens);
      // setUser(decoded);
    }
  }, [authTokens]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
