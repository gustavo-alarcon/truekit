export interface IRegisterUser {
  name: string;
  lastname: string;
  username: string;
  dni: string;
  dniPhotoURL: Array<string>;
  phone: string;
  city: string;
  password: string;
  confirmPassword: string;
  description: string;
  country: string;
}

export interface IRegisterForm extends Omit<IRegisterUser, 'dniPhotoURL'> {}

export interface IRegisterState {
  state: 'Esperando' | 'Cargando' | 'Registrado' | 'Error';
  message: string;
}

export interface IUsernameState {
  state: 'Esperando' | 'Revisando' | 'Disponible' | 'Duplicado';
  message: string;
}
