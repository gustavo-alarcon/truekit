import { FieldValue, Timestamp } from '@angular/fire/firestore';

export interface IItemForm {
  name: string;
  brand: string;
  launchDate: Date;
  status: string;
  isLimitedEdition: string;
  category: string;
  franchise: string;
  serialNumber: string;
  sku: string;
  withBox: string;
  description: string;
}

export interface IItemDTO extends IItemForm {
  id?: string;
  ownerId: string;
  exchangeId: string;
  requesterId: string;
  images: string[];
  state: 'ready' | 'in-exchange' | 'exchanged';
  createdAt: FieldValue;
  updatedAt: FieldValue;
}

export interface IItem {
  id?: string;
  name: string;
  brand: string;
  status: string;
  isLimitedEdition: string;
  category: string;
  franchise: string;
  serialNumber: string;
  sku: string;
  withBox: string;
  description: string;
  launchDate: Timestamp;
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
  data: IItemDTO | null;
  error: string;
}
