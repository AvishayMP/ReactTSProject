export interface User {
  id: string;
  email: string;
  password: string;
  role?: 'admin'
}

export const authAPI: string = 'http://localhost:3000/api/auth';