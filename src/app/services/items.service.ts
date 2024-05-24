import { Injectable, OnDestroy, computed, inject, signal } from '@angular/core';
import {
  IItem,
  IItemDTO,
  IItemForm,
  IItemSignal,
} from '../interfaces/item.interface';
import { AuthService } from './auth.service';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  docData,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { Observable, Subscription, of, switchMap } from 'rxjs';

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

  getLoggedUserItems(): Observable<IItem[]> {
    // first retrive user id
    return this.#authService.user$.pipe(
      switchMap((user) => {
        if (user) {
          const itemsRef = collection(this.#firestore, 'items');
          const q = query(
            itemsRef,
            orderBy('createdAt', 'desc'),
            where('ownerId', '==', user?.id)
          );

          return collectionData(q, { idField: 'id' }) as Observable<IItem[]>;
        } else {
          return of([]);
        }
      })
    );
  }

  getFeaturedItems(): Observable<IItem[]> {
    return this.#authService.user$.pipe(
      switchMap((user) => {
        if (user) {
          const itemsRef = collection(this.#firestore, 'items');
          const q = query(itemsRef, orderBy('createdAt', 'desc'), limit(8));

          return collectionData(q, { idField: 'id' }) as Observable<IItem[]>;
        } else {
          return of([]);
        }
      })
    );
  }

  getItemById(id: string): Observable<IItem> {
    const itemsRef = doc(this.#firestore, 'items', id);

    return docData(itemsRef) as Observable<IItem>;
  }

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
          const data: IItemDTO = {
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
