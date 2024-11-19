import { create } from 'zustand';

interface LogoState {
  logo: string | null;
  setLogo: (logo: string | null) => void;
}

export const useLogoStore = create<LogoState>((set) => ({
  logo: null,
  setLogo: (logo) => set({ logo })
}));