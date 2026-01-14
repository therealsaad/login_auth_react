import { createContext, useContext, useReducer, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, user: action.payload, isLoading: false };
    case 'LOGOUT':
      return { ...state, user: null, isLoading: false };
    case 'LOADING':
      return { ...state, isLoading: true };
    default:
      return state;
  }
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isLoading: true
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    if (user && token) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    }
    dispatch({ type: 'LOADING', payload: false });
  }, []);

  const login = async (email, password) => {
    try {
      dispatch({ type: 'LOADING' });
      const { data } = await authAPI.login({ email, password });
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('token', data.token);
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
    } catch (error) {
      console.error(error.response?.data?.message || 'Login failed');
    }
  };

  const register = async (name, email, password) => {
    try {
      dispatch({ type: 'LOADING' });
      const { data } = await authAPI.register({ name, email, password });
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('token', data.token);
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
    } catch (error) {
      console.error(error.response?.data?.message || 'Register failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ 
      user: state.user, 
      login, 
      register, 
      logout, 
      isLoading: state.isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
