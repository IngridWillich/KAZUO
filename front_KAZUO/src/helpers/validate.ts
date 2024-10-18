import { ILoginError, ILoginProps } from "@/interfaces/types";
import { IRegisterProps, TRegisterError } from "@/interfaces/types";
import {IProduct,IProductsErrors} from "@/interfaces/types";

export function validateLoginForm(values: ILoginProps): ILoginError {
  const errors: ILoginError = {};

  // Validar el email
  if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "El email no es válido";
  }

  // Validar la contraseña
  if (!values.password) {
    errors.password = "La contraseña es obligatoria";
  } else {
    if (values.password.length < 8) {
      errors.password = "La contraseña debe tener al menos 8 caracteres";
    }
    if (!/[A-Z]/.test(values.password)) {
      errors.password =
        "La contraseña debe contener al menos una letra mayúscula";
    }
    if (!/[a-z]/.test(values.password)) {
      errors.password =
        "La contraseña debe contener al menos una letra minúscula";
    }
    if (!/[0-9]/.test(values.password)) {
      errors.password = "La contraseña debe contener al menos un número";
    }
    if (!/[!@#$%^&*]/.test(values.password)) {
      errors.password =
        "La contraseña debe contener al menos un carácter especial (!@#$%^&*)";
    }
  }

  return errors;
}

export function validateRegisterForm(values: IRegisterProps): TRegisterError {
  const errors: TRegisterError = {};

  // Validación de email
  if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "El email no es válido";
  }

  // Validación de contraseña
  if (!values.password) {
    errors.password = "La contraseña es obligatoria";
  } else if (values.password.length < 8) {
    errors.password = "La contraseña debe tener al menos 8 caracteres";
  } else if (!/[A-Z]/.test(values.password)) {
    errors.password =
      "La contraseña debe contener al menos una letra mayúscula";
  } else if (!/[a-z]/.test(values.password)) {
    errors.password =
      "La contraseña debe contener al menos una letra minúscula";
  } else if (!/[0-9]/.test(values.password)) {
    errors.password = "La contraseña debe contener al menos un número";
  } else if (!/[!@#$%^&*]/.test(values.password)) {
    errors.password =
      "La contraseña debe contener al menos un carácter especial (!@#$%^&*)";
  }

  // Validación de nombre
  if (!values.name) {
    errors.name = "El nombre es obligatorio";
  }

  if (!values.company) {
    errors.company = "El nombre de la compañia es obligatorio";
  }
  if (!values.password) {
    errors.password = "La contraseña es obligatoria";
  } else if (values.password !== values.confirmPass) {
    errors.confirmPass = "Las contraseñas no coinciden";
  }

  return errors;
};

// Función de validación del formulario
export function validateProductForm(values: IProduct): IProductsErrors {
  const errors: IProductsErrors = {};

  // Validación del nombre
  if (!values.name) {
      errors.name = "El nombre del producto es obligatorio";
  } else if (values.name.length < 5) {
      errors.name = "El nombre del producto debe tener al menos 5 letras";
 
  } else if (/[^a-zA-Z0-9\s]/.test(values.name)) {
      errors.name = "El nombre del producto solo puede contener letras y números";
  }
  
  // Validación de la cantidad
  if (!values.quantity) {
      errors.quantity = "La cantidad es obligatoria";
  } else if (Number(values.quantity) <= 0) {
      errors.quantity = "La cantidad debe ser mayor que cero";
  }

  // Validación del stock mínimo
  if (!values.minStock) {
      errors.minStock = "La cantidad mínima es obligatoria";
  } else if (isNaN(Number(values.minStock))) {
      errors.minStock = "La cantidad mínima debe ser un número válido";
  } else if (Number(values.minStock) <= 0) {
      errors.minStock = "La cantidad mínima debe ser mayor que cero";
  }

  // Validación del precio
  if (!values.price) {
      errors.price = "El precio es obligatorio";
  } else if (isNaN(Number(values.price))) {
      errors.price = "El precio debe ser un número válido";
  } else if (Number(values.price) <= 0) {
      errors.price = "El precio debe ser mayor que cero";

  }

  // Validación del ID de la tienda
  if (!values.storeId) {
      errors.storeId = "El ID de la bodega es obligatorio";
  } else if (!/^[A-Za-z0-9]+$/.test(values.storeId)) {
      errors.storeId = "El ID de la bodega solo puede contener letras y números";
  }

  // Validación de la imagen
  if (!values.image) {
      errors.image = "La imagen es obligatoria";
  } else if (!/\.(jpg|jpeg|png|gif)$/i.test(values.image)) {
      errors.image = "La imagen debe ser en formato jpg,png ";
  }

  return errors;
}
