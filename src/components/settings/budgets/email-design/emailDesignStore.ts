import { create } from 'zustand';

interface EmailDesignState {
  senderEmail: string;
  subject: string;
  headerColor: string;
  headerTextColor: string;
  showHeader: boolean;
  showContent: boolean;
  showSocialMedia: boolean;
  logo: string;
  messageContent: string;
  setSenderEmail: (email: string) => void;
  setSubject: (subject: string) => void;
  setHeaderColor: (color: string) => void;
  setHeaderTextColor: (color: string) => void;
  setShowHeader: (show: boolean) => void;
  setShowContent: (show: boolean) => void;
  setShowSocialMedia: (show: boolean) => void;
  setLogo: (logo: string) => void;
  setMessageContent: (content: string) => void;
}

const defaultMessageContent = `Estimado/a paciente,

Esperamos que te encuentres muy bien. En Clínica A+ Salud, valoramos tu interés en nuestros servicios y estamos emocionados de poder ayudarte.

Adjunto presupuesto.

Clínica A+ Salud`;

export const useEmailDesignStore = create<EmailDesignState>((set) => ({
  senderEmail: '',
  subject: 'Presupuesto',
  headerColor: '#e08081',
  headerTextColor: '#ffffff',
  showHeader: true,
  showContent: true,
  showSocialMedia: true,
  logo: '',
  messageContent: defaultMessageContent,
  setSenderEmail: (email) => set({ senderEmail: email }),
  setSubject: (subject) => set({ subject: subject }),
  setHeaderColor: (color) => set({ headerColor: color }),
  setHeaderTextColor: (color) => set({ headerTextColor: color }),
  setShowHeader: (show) => set({ showHeader: show }),
  setShowContent: (show) => set({ showContent: show }),
  setShowSocialMedia: (show) => set({ showSocialMedia: show }),
  setLogo: (logo) => set({ logo: logo }),
  setMessageContent: (content) => set({ messageContent: content })
}));