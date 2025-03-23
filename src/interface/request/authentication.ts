export interface ISignIn {
  username: string
  password: string
  gate: string
}

export interface IRegister {
  username: string
  password: string
  email: string
  phone: string
  fullName: string
  invitationCode: string
}

export interface IUpdateBank {
  bankName: string
  accountNumber: string
  accountHolder: string
  branch?: string
}

export interface IUpdateUser {
  fullName?: string
  email?: string
  phone?: string
  address?: string
  avatar?: string
  storeName?: string
  storeAddress?: string
}

export interface IChangePassword {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

