import { Injectable, computed, inject, signal } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from '@angular/fire/firestore';
import {
  IRegisterForm,
  IRegisterState,
  IRegisterUser,
  IUsernameState,
} from '../interfaces/register.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  #firestore = inject(Firestore); //#endregion
  #authServicet = inject(AuthService);

  #registerState = signal<IRegisterState>({
    state: 'Esperando',
    message: '',
  });

  #usernameState = signal<IUsernameState>({
    state: 'Esperando',
    message: '',
  });

  public getRegisterState = computed(() => this.#registerState());

  public getUsernameState = computed(() => this.#usernameState());

  public registerUser(form: IRegisterForm, images: Array<string>) {
    this.#registerState.set({
      state: 'Cargando',
      message: '✳️ Registrando usuario',
    });

    this.#authServicet.createUser(form, images).then(() => {
      this.#registerState.set({
        state: 'Registrado',
        message: `✅ Usuario: ${form.username} | Registrado satisfactoriamente!`,
      });
    });
  }

  public async checkUsername(username: string) {
    // check for username duplicate in users collection
    this.#usernameState.set({
      state: 'Revisando',
      message: ``,
    });

    const usersRef = collection(this.#firestore, 'users');
    const q = query(usersRef, where('username', '==', username));

    const docs = await getDocs(q);

    if (docs.empty) {
      this.#usernameState.set({
        state: 'Disponible',
        message: `✅ ${username} está disponible`,
      });
    } else {
      this.#usernameState.set({
        state: 'Duplicado',
        message: `❌ ${username} ya está en uso`,
      });
    }
  }

  public initSignals() {
    this.#registerState.set({
      state: 'Esperando',
      message: '',
    });

    this.#usernameState.set({
      state: 'Esperando',
      message: '',
    });
  }
}
