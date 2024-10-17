import { ILoginError, ILoginProps } from "@/interfaces/types";
import { IRegisterProps, TRegisterError } from "@/interfaces/types";

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
  if (values.confirmPass || values.password) {
    if (values.password !== values.confirmPass) {
      errors.confirmPass = "Las contraseñas no coinciden";
    }
  }
  return errors;
}
