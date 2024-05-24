import { Injectable, computed, inject, signal } from '@angular/core';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';

interface State {
  images: Array<any>;
  percentage: string;
  state: string;
}

@Injectable({
  providedIn: 'root',
})
export class UploadImagesService {
  private readonly storage = inject(Storage);

  #state = signal<State>({
    images: [],
    percentage: '0',
    state: 'Esperando',
  });

  public getImages = computed(() => {
    return this.#state;
  });
  public getState = computed(() => {
    return this.#state();
  });

  constructor() {
    this.resetSignals();
  }

  public uploadFile(input: HTMLInputElement, path: string) {
    if (!input.files) return;

    const files: FileList = input.files;

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file == null) return;

      const filePath = `${path}/${Date.now()}_${file.name}`;

      const storageRef = ref(this.storage, filePath);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              this.#state.update((value) => {
                return {
                  ...value,
                  state: 'Pausado',
                  percentage: progress.toFixed(0),
                };
              });
              break;
            case 'running':
              console.log('Upload is running');
              this.#state.update((value) => {
                return {
                  ...value,
                  state: 'Subiendo',
                  percentage: progress.toFixed(0),
                };
              });
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case 'storage/unauthorized':
              console.log('User does not have permission to access the object');
              this.#state.update((value) => {
                return {
                  ...value,
                  state: 'unauthorized',
                };
              });
              break;
            case 'storage/canceled':
              console.log('User canceled the upload');
              this.#state.update((value) => {
                return {
                  ...value,
                  state: 'canceled',
                };
              });
              break;

            case 'storage/unknown':
              console.log(
                'Unknown error occurred, inspect the server response'
              );
              this.#state.update((value) => {
                return {
                  ...value,
                  state: 'unknown',
                };
              });
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            this.#state.update((value) => {
              return {
                images: [...value.images, downloadURL],
                state: 'Finalizado',
                percentage: '100',
              };
            });

            console.log('File available at', downloadURL);
          });
        }
      );
    }
  }

  public deleteImage(image: string, index: number) {
    this.#state.update((value) => {
      const images = [...value.images];
      images.splice(index, 1);

      return {
        ...value,
        images,
      };
    });
  }

  public resetSignals() {
    this.#state.set({
      images: [],
      percentage: '0',
      state: 'Esperando',
    });
  }
}
