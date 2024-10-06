import { configureAuth } from 'react-query-auth';
import { Navigate, useLocation } from 'react-router-dom';
import { z } from 'zod';

import { AuthResponse, User } from '@/types/api';

import { api } from './api-client';

// api call definitions for auth (types, schemas, requests):
// these are not part of features as this is a module shared across features

const getUser = async (): Promise<User | null> => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const response = await api.get('/user/');
    return response.data;
  } catch (error) {
    localStorage.removeItem('token');
    return null;
  }
};

export const logout = async () => {
  await api.post('/auth/logout/');
  localStorage.removeItem('token');
}

export const loginInputSchema = z.object({
  username: z.string().min(1, 'Required'),
  password: z.string().min(1, 'Required'),
});

export type LoginInput = z.infer<typeof loginInputSchema>;
const loginWithEmailAndPassword = async (data: LoginInput): Promise<AuthResponse> => {
  try {
    const response: User = await api.post('/auth/login/', data);
    console.log('Login response:', response);

    if (response) {
      const { token, user_id, email } = response;
      localStorage.setItem('token', token);
      return { 
        user: { id: user_id, email },
        token 
      };
    } else {
      console.error('Login response data is undefined:', response);
      throw new Error('Login failed: No data in response');
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const registerInputSchema = z.object({
  username: z.string().min(1, 'Required'),
  email: z.string().min(1, 'Required').email('Invalid email'),
  password: z.string().min(1, 'Required'),
});

export type RegisterInput = z.infer<typeof registerInputSchema>;
const registerWithEmailAndPassword = async (data: RegisterInput): Promise<AuthResponse> => {
  const response = await api.post('/auth/register/', data);
  const { token, user_id, email } = response.data;
  localStorage.setItem('token', token);
  return { user: { id: user_id, email } };
};

const authConfig = {
  userFn: getUser,
  loginFn: async (data: LoginInput) => {
    const response = await loginWithEmailAndPassword(data);
    return response.user;
  },
  registerFn: async (data: RegisterInput) => {
    const response = await registerWithEmailAndPassword(data);
    return response.user;
  },
  logoutFn: logout,
};

export const { useUser, useLogin, useLogout, useRegister, AuthLoader } = configureAuth(authConfig);

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();
  const location = useLocation();

  if (!user.data) {
    return (
      <Navigate to={`/login?redirectTo=${encodeURIComponent(location.pathname)}`} replace />
    );
  }

  return children;
};
