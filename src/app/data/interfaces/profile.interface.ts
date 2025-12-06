export interface Profile {
  id: number;
  username: string;
  email: string;
  avatarUrl: string | null,
  subscribersAmount: number,
  firstName: string,
  lastName: string,
  isActive: boolean,
  stack:string [],
  city: string,
  description: string,
  fullName: string,
  role: 'admin' | 'user';
}

export interface User {
  id: number;
  lastName: string;
  firstName: string;
  middleName?: string;
  birthDate: Date;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isActive: boolean;
  avatarUrl: string | null,
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthUser {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'user';
  avatar?: string;
  createdAt: Date;
}