import { ILoginError, ILoginProps, IUpdatePassProps, TUpdatePassError } from "@/interfaces/types";
import { IRegisterProps, TRegisterError } from "@/interfaces/types";
import {IProduct,IProductsErrors} from "@/interfaces/types";
import {IFormErrors} from "@/interfaces/types";
import {IFormData} from "@/interfaces/types";
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

export function validateEmail(email: string): boolean {
  return /\S+@\S+\.\S+/.test(email);
}

export function validateUpdatePass(values: IUpdatePassProps): TUpdatePassError {
  const errors: TUpdatePassError = {};

  

  // Validación de contraseña
  if (!values.newPassword) {
    errors.newPassword = "La contraseña es obligatoria";
  } else if (values.newPassword.length < 8) {
    errors.newPassword = "La contraseña debe tener al menos 8 caracteres";
  } else if (!/[A-Z]/.test(values.newPassword)) {
    errors.newPassword =
      "La contraseña debe contener al menos una letra mayúscula";
  } else if (!/[a-z]/.test(values.newPassword)) {
    errors.newPassword =
      "La contraseña debe contener al menos una letra minúscula";
  } else if (!/[0-9]/.test(values.newPassword)) {
    errors.newPassword = "La contraseña debe contener al menos un número";
  } else if (!/[!@#$%^&*]/.test(values.newPassword)) {
    errors.newPassword =
      "La contraseña debe contener al menos un carácter especial (!@#$%^&*)";
  }
  
  if (!values.newPassword) {
    errors.newPassword = "La contraseña es obligatoria";
  } else if (values.newPassword !== values.confirmNewPass) {
    errors.confirmNewPass = "Las contraseñas no coinciden";
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
  } else if (Number(values.minStock) <= 0) {
      errors.minStock = "La cantidad mínima debe ser mayor a la que cero";
    } else if (Number(values.minStock) < 0) {
      errors.minStock = "El stock minimo no puede ser negativo.";
  }
  


// Validación de la capacidad máxima
if (!values.maxCapacity) {
  errors.maxCapacity = "La capacidad máxima es obligatoria.";
} else if (Number(values.maxCapacity) <= 0) {
  errors.maxCapacity = "La capacidad máxima debe ser un número mayor que cero.";
} else if (Number(values.maxCapacity) < 0) {
    errors.maxCapacity = "La capacidad maxima no puede ser negativo.";
}

// Validación del precio de entrada
if (!values.inPrice) {
  errors.inPrice = "El precio de entrada es obligatorio.";
} else if (Number(values.inPrice) <= 0) {
  errors.inPrice = "El precio de entrada debe ser mayor que cero.";
} else if (Number(values.inPrice) < 0) {
  errors.inPrice = "El precio de entrada no puede ser negativo.";
}

// Validación del código de bange
if (!values.bange) {
  errors.bange = "La moneda es obligatorio.";
} else if (!/^[A-Z0-9]+$/.test(values.bange)) {
  errors.bange = "la moneda debe contener solo letras mayúsculas y números.";
}

// Validación del precio de salida
if (!values.outPrice) {
  errors.outPrice = "El precio de salida es obligatorio.";
} else if (Number(values.outPrice) < 0) {
  errors.outPrice = "El precio de salida no puede ser negativo.";
}
if (!values.unids) {
  errors.unids = "La unidad de medida es obligatoria."; // Campo vacío
} else if (values.unids.trim().length < 2) {
  errors.unids = "La unidad de medida debe tener al menos 2 caracteres."; // Longitud mínima
} else if (values.unids !== values.unids.trim()) {
  errors.unids = "La unidad de medida no debe tener espacios al inicio o al final."; // Espacios en blanco
 // Caracteres permitidos
} else if (values.unids.length > 20) {
  errors.unids = "La unidad de medida no debe exceder los 20 caracteres."; // Longitud máxima
}

return errors;
}
 

  // Validación del precio
  // if (!values.price) {
  //     errors.price = "El precio es obligatorio";
  // } else if (isNaN(Number(values.price))) {
  //     errors.price = "El precio debe ser un número válido";
  // } else if (Number(values.price) <= 0) {
  //     errors.price = "El precio debe ser mayor que cero";

  // }

  // // Validación del ID de la tienda
  // if (!values.storeId) {
  //     errors.storeId = "El ID de la bodega es obligatorio";
  // } else if (!/^[A-Za-z0-9]+$/.test(values.storeId)) {
  //     errors.storeId = "El ID de la bodega solo puede contener letras y números";
  // }



// Validación para los datos generales
export function validateDataForm(values: IFormData): IFormErrors {
  const errors: IFormErrors = {};

  // Validación para el campo "CompanyName"
  if (!values.CompanyName.trim()) {
    errors.CompanyName = "El nombre de la empresa es obligatorio";
  } else if (values.CompanyName.length < 5) {
  errors.CompanyName = "El nombre de la empresa debe tener al menos 5 caracteres";
}

  // Validación para el campo "country"
  if (!values.country.trim()) {
    errors.country = "El país es obligatorio";
  }

  // Validación para el campo "address"
  if (!values.address.trim()) {
    errors.address = "La dirección es obligatoria";
} else if (values.address.length < 10) {
  errors.address = "La dirección debe tener al menos 10 caracteres";
}

// Validación para el campo "tel de contacto"
if (!values.contactPhone) {
  errors.contactPhone = "El tel de contacto es obligatorio";
} else if (Number(values.contactPhone) <= 0) {
  errors.contactPhone = "El tel de contacto no debe ser un numero negativo";
} else if (!/^\d{10}$/.test(String(values.contactPhone))) {
  errors.contactPhone = "El tel de contacto debe tener 10 dígitos";
}


  // Validación para el campo "email"
  if (!values.email.trim()) {
    errors.email = "El correo electrónico es obligatorio";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "El correo electrónico no es válido";
  }

   // Validación para el campo "industry"
   if (!values.industry.trim()) {
    errors.industry = "La industria es obligatoria";

  }
  
  return errors;
}