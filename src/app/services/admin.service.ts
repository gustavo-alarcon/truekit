import { Injectable, computed, inject, signal } from '@angular/core';
import { User } from '@angular/fire/auth';
import {
  Firestore,
  collection,
  collectionChanges,
  collectionData,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { IUser } from '../interfaces/user.interface';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  #firestore = inject(Firestore);
  #snackBar = inject(MatSnackBar);

  public getUserList(): Observable<IUser[]> {
    const usersRef = collection(this.#firestore, 'users');
    const q = query(usersRef, orderBy('createdAt', 'desc'));

    return collectionData(q, { idField: 'id' }) as Observable<IUser[]>;
  }

  public markAsActive(user: IUser) {
    const userRef = doc(this.#firestore, 'users', user.id);

    // update status
    updateDoc(userRef, { status: 'active', updatedAt: serverTimestamp() }).then(
      () => {
        console.log(user.name + ' marked as active');
      }
    );
  }

  public markAsInactive(user: IUser) {
    const userRef = doc(this.#firestore, 'users', user.id);

    // update status
    updateDoc(userRef, {
      status: 'inactive',
      updatedAt: serverTimestamp(),
    }).then(() => {
      console.log(user.name + ' marked as inactive');
    });
  }

  public markAsPending(user: IUser) {
    const userRef = doc(this.#firestore, 'users', user.id);

    // update status
    updateDoc(userRef, {
      status: 'pending',
      updatedAt: serverTimestamp(),
    }).then(() => {
      console.log(user.name + ' marked as pending');
    });
  }

  public deleteUser(user: IUser) {
    // delete user
    deleteDoc(doc(this.#firestore, 'users', user.id)).then(() => {
      this.#snackBar.open(`Usuario: ${user.username}, eliminado`, 'Aceptar', {
        duration: 3000,
      });
    });
  }
}
