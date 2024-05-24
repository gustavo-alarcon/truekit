import { FieldValue } from '@angular/fire/firestore';

export interface IItemForm {
  name: string;
  brand: string;
  dateLaunch: Date;
  status: string;
  isLimitedEdition: string;
  category: string;
  franchise: string;
  serialNumber: string;
  sku: string;
  withBox: string;
  description: string;
}

export interface IItem extends IItemForm {
  id?: string;
  ownerId: string;
  exchangeId: string;
  requesterId: string;
  images: string[];
  state: 'ready' | 'in-exchange' | 'exchanged';
  createdAt: FieldValue;
  updatedAt: FieldValue;
}

export interface IItemSignal {
  state: 'pending' | 'registered' | 'error' | 'registering';
  data: IItem | null;
  error: string;
}
