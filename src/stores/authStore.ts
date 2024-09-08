import { create } from 'zustand'


interface IUser{
    code: string
}

interface IState {
    token: string
    user: IUser
    login: (code: string, password: string) => Promise<IUser>
  }

export const useAuthStore = create<IState>((set) => ({
  token: '',
  user:{} as IUser,
  login: async (code: string, password: string) => {
        return {} as IUser  
  } 
}))
