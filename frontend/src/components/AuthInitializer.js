import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadStoredAuth } from '../store/slices/authSlice';

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load stored authentication on app start
    console.log('=== AUTH INITIALIZER - DISPATCHING LOAD STORED AUTH ===');
    dispatch(loadStoredAuth());
  }, [dispatch]);

  return children;
};

export default AuthInitializer;
