import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: {
        id: '1',
        name: 'Admin',
        email: 'admin@example.com',
        role: 'administrator'
      },
      isAuthenticated: true,
      login: async (email: string, password: string) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find((u: any) => 
          u.email === email && u.password === password
        );

        if (user) {
          const { password: _, ...userWithoutPassword } = user;
          set({ user: userWithoutPassword, isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      changePassword: async (currentPassword: string, newPassword: string) => {
        const currentUser = get().user;
        if (!currentUser) return false;

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex((u: any) => 
          u.email === currentUser.email && u.password === currentPassword
        );

        if (userIndex === -1) return false;

        users[userIndex].password = newPassword;
        localStorage.setItem('users', JSON.stringify(users));
        return true;
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);