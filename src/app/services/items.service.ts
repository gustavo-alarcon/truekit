import { Injectable, OnDestroy, computed, inject, signal } from '@angular/core';
import { IItem, IItemForm, IItemSignal } from '../interfaces/item.interface';
import { AuthService } from './auth.service';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemsService implements OnDestroy {
  #authService = inject(AuthService);
  #firestore = inject(Firestore);

  #item = signal<IItemSignal>({
    state: 'pending',
    data: null,
    error: '',
  });

  #subscriptions = new Subscription();

  constructor() {
    this.resetSignals();
  }

  public itemState = computed(() => this.#item());

  createItem(form: IItemForm, images: string[]) {
    this.#subscriptions.add(
      // first retrive user id
      this.#authService.user$.subscribe((user) => {
        if (user) {
          // update signal
          this.#item.set({
            state: 'registering',
            data: null,
            error: '',
          });

          // construct Item data
          const data: IItem = {
            ...form,
            ownerId: user.id,
            requesterId: '',
            exchangeId: '',
            state: 'ready',
            images,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          };

          addDoc(collection(this.#firestore, 'items'), data).then(() => {
            // update signal
            this.#item.set({
              state: 'registered',
              data: data,
              error: '',
            });
          });
        } else {
          // update signal
          this.#item.set({
            state: 'error',
            data: null,
            error: 'not user logged in',
          });
        }
      })
    );
  }

  resetSignals() {
    this.#item.set({
      state: 'pending',
      data: null,
      error: '',
    });
  }

  ngOnDestroy(): void {
    this.#subscriptions.unsubscribe();
  }
}
