export interface User {
  id: string;
  name: string;
  role: 'doktor' | 'laborant' | 'mali_personel' | 'admin' | 'hasta';
  email?: string;
  phone?: string;
  department?: string;
  specialization?: string;
  avatar?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  expiresIn: number;
}
