export const dictionariesErrors = {
  required: {
    expressable: false,
    message: 'Este campo es obligatorio.'
  },
  min: {
    expressable: true,
    message: 'El campo debe tener un mínimo valor de'
  },
  max: {
    expressable: true,
    message: 'El campo debe tener un máximo valor de'
  },
  minlength: {
    expressable: true,
    message: 'El campo debe tener un largo mínimo de'
  },
  maxlength: {
    expressable: true,
    message: 'El campo debe tener un largo máximo de'
  },
  validatorEmail: {
    expressable: false,
    message: 'No es un email válido'
  },
  validatorUniversalMinlength: {
    expressable: true,
    message: 'El campo debe tener un largo mínimo de'
  },
  validatorUniversalMaxlength: {
    expressable: true,
    message: 'El campo debe tener un largo máximo de'
  },
  validatorDate: {
    expressable: true,
    message: 'El campo debe tener una fecha válida.'
  },
  documentInvalid: {
    expressable: false,
    message: 'El campo debe tener un documento válido y disponible.'
  },
  validatorPassword: {
    expressable: false,
    message: 'Mínimo un carácter especial y una mayúscula.'
  },
  validatorNotEqual: {
    expressable: false,
    message: 'Los campos no coinciden'
  },
  validatorComparateDate: {
    expressable: false,
    message: 'Las fechas no coinciden.'
  }
}
