const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const isEmail = email => email && emailRegExp.test(email);

export const checkEmail = (_, value, cb) =>
  isEmail(value) ? cb() : cb(new Error('Email inválido'));

export const checkBool = (_, value, cb) =>
  value === true
    ? cb()
    : cb(new Error('Acepta las condiciones para continuar'));

export const checkLength = (_, value, cb) =>
  value && value.length >= 6
    ? cb()
    : cb(new Error('La contraseña tiene que tener al menos 6 caracteres'));