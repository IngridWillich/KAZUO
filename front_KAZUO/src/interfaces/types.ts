export interface ILoginProps {
    email: string;
    password: string; 
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


export type TRegisterError = Partial<IRegisterProps>;

export interface userData {
        id: number;  
        email: string; 
        password: string;
        name: string;
        company: string;
 }

 export interface IProduct {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    minStock: number;
    storeId: number
}

export interface AppContextType {
    isLoggedIn: boolean;
  userData: userData | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  }