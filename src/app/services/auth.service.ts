import { Injectable, inject } from '@angular/core';
import {
  Auth,
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { IUser } from '../interfaces/user.interface';
import { Observable, of } from 'rxjs';
import {
  DocumentData,
  DocumentReference,
  Firestore,
  addDoc,
  collection,
  doc,
  docData,
  serverTimestamp,
  setDoc,
} from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IRegisterForm, IRegisterUser } from '../interfaces/register.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #auth = inject(Auth);
  #firestore = inject(Firestore);
  #snackBar = inject(MatSnackBar);
  #router = inject(Router);

  user!: User;
  user$: Observable<IUser | DocumentData | undefined> = of(undefined);
  canAccessMain = false;

  constructor() {
    onAuthStateChanged(this.#auth, (user) => {
      if (user !== null) {
        this.user = user;

        const userReference = doc(this.#firestore, `users/${user.uid}`);

        // this.canAccessMain = true;
        this.user$ = docData(userReference, { idField: 'id' });

        this.#router.navigate(['/home']);
      } else {
        this.#router.navigate(['/']);
      }
    });
  }

  login(email: string, password: string): Promise<UserCredential | null> {
    if (!email && !password) return Promise.resolve(null);
    let emailCurated = email.trim().toLowerCase();
    let passwordCurated = password.trim();

    return signInWithEmailAndPassword(
      this.#auth,
      emailCurated,
      passwordCurated
    );
  }

  logout(): Promise<void> {
    this.canAccessMain = false;
    this.#router.navigate(['/']);
    return this.#auth.signOut();
  }

  createUser(formUser: IRegisterForm, images: string[]) {
    console.log(formUser);

    return createUserWithEmailAndPassword(
      this.#auth,
      formUser.email,
      formUser.password
    )
      .then((userCredential) => {
        // Signed in
        const userAuth = userCredential.user;

        const user: IRegisterUser = {
          ...formUser,
          dniPhotoURL: [...images],
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          status: 'pending',
        };

        return setDoc(doc(this.#firestore, 'users', userAuth.uid), user);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorCode);
        console.log(errorMessage);
      });
  }

  reset() {
    this.user$ = of(undefined);
    this.user = {} as User;
  }
}
