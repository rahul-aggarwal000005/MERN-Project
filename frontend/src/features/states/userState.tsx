export type User = {
  email: string
  isAdmin: boolean
  name: string
  pic: string
  token: string
  _id: string
}

export interface UserState {
  loading: null | boolean
  error: string | null | boolean
  userInfo?: User | null
  success?: boolean | null
}
