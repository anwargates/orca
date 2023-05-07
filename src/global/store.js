import { create } from 'zustand'

export const useStore = create((set) => ({
  isLoggedIn: false,
  setLoggedIn: (login) => set(() => ({ isLoggedIn: login })),
  authRefreshing: true,
  setAuthRefreshing: (refresh) => set(() => ({ authRefreshing: refresh })),
  actionLoading: false,
  setActionLoading: (loading) => set(() => ({ actionLoading: loading })),
}))

export const reauthStore = create((set) => ({
  reauthFormState: {
    email: '',
    password: '',
  },
  setReauthFormState: (form) => set(() => ({ reauthFormState: form })),
}))
