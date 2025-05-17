

export interface AuthService {
  login(email: string, password: string): Promise<{ token: string }>;
  logout(): Promise<void>;
}


export interface AuthAPI {
  login(email: string, password: string): Promise<{ success: boolean; token?: string }>;
  logout(): Promise<void>;
}