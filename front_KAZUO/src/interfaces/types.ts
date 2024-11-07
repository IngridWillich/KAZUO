export interface ILoginProps {
  email: string;
  password: string;
  name?: string;
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
  id: number | string;
  email: string;
  password: string;
  name: string;
  company?: string;
  token: string;
  userId: string;
  igmUrl?: string;
  auth0Id?: string;
  isAdmin?: boolean;
  isSuperAdmin?: boolean;
}

export interface IProduct {
  id?: string;
  name: string;
  quantity: number;
  unids: string;
  maxCapacity: number;
  inPrice: number;
  bange: string;
  outPrice: number;
  minStock: number;
  storeId: string;
  userId: string;
  store?: {
    name: string;
  };
  [key: string]: any;
}

export interface IUpdateProduct {
  id?: string;
  name?: string;
  unids?: string;
  maxCapacity?: number;
  inPrice?: number;
  bange?: string;
  outPrice?: number;
  storeId?: string;
  userId?: string;
  store?: {
    name: string;
  };
  [key: string]: any;
}

export interface IProductsErrors {
  [key: string]: string | undefined;
  name?: string;
  quantity?: string;
  // price?: string;
  minStock?: string;
  storeId?: string;
}

export interface AppContextType {
  isLoggedIn: boolean;
  userData: userData | null;
  setUserData: React.Dispatch<React.SetStateAction<userData | null>>;
  login: (loginData: any) => Promise<void>;
  logout: () => void;
}

export interface IFormData {
  CompanyName: string;
  country: string;
  address: string;
  contactPhone: number;
  email: string;
  industry: string;
  userId: string;
}

export interface IFormErrors {
  CompanyName?: string;
  country?: string;
  address?: string;
  contactPhone?: String;
  email?: string;
  industry?: string;
}

export interface CompanyData {
  id?: string;
  CompanyName: string;
  country: string;
  address: string;
  contactPhone: string;
  email: string;
  industry: string;
}
export interface TeamMember {
  id: string;
  name: string;
  email: string;
  position: string;
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

export interface IEditStoreProps {
  storeId: string;
}

export interface InventarioProps {
  userId: string;
}

export interface IEditProductProps {
  productId: string;
}

export interface IStatisticsProps {
  storeId: string;
}

export interface IStoreInfo {
  id: string;
  name: string;
  createdAt: string;
  category: ICategory;
  products: IProduct[];
}
