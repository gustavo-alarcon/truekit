import { Timestamp } from '@angular/fire/firestore';

export interface IUser {
  id: string;
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
  status: 'active' | 'inactive' | 'pending';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
