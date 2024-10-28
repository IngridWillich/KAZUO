export interface ILoginProps {
  email: string;
  password: string;
  name?: string
  userId?: string;
  token?: string;
}

export interface ILoginError {
  email?: string;
  password?: string;
}

export interface IRegisterProps {
  email: string;
  password: string;
  confirmPass: string;
  name: string;
  company: string;
}

export interface IUpdatePassProps {
  newPassword: string;
  confirmNewPass: string;
  token?: string;
}

export interface IUpdatePassError {
  newPassword?: string;
  confirmNewPass?: string;
  oldPassword?: string;
}

export type TRegisterError = Partial<IRegisterProps>;

export type TUpdatePassError = Partial<IUpdatePassProps>;

export interface userData {
  id: number;
  email: string;
  password: string;
  name: string;
  company: string;
  token: string;
  userId: string;
}

export interface IProduct {
  id?: string;
  name: string;
  quantity: number;
  price: number;
  minStock: number;
  storeId: string;
  userId: string
}

export interface IProductsErrors {
  [key: string]: string | undefined;
  name?: string;
  quantity?: string;
  price?: string;
  minStock?: string;
  storeId?: string;
}

export interface AppContextType {
  isLoggedIn: boolean;
  userData: userData | null;
  login: (loginData: any) => Promise<void>;
  logout: () => void;
}

export interface IStore {
  id: string;
  name: string;
  categoryName: string;
  categoryId: "string";
}

export interface ICategory {
  id: string;
  name: string;
}

export interface IEditStoreProps{
  storeId: string;
}

export interface InventarioProps {
  userId: string;
}
