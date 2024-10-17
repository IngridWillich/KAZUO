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

 export interface IProduct{
    name: string;
    quantity: string;
    price: string;
    image: string;
    minStock: string;
    storeId: string;
  }

  export interface IProductsErrors { [key: string]: string | undefined;
    name?: string;
    quantity?: string;
    price?: string
    minStock?: string;
    storeId?: string;
  }
