import { CommonModule } from '@angular/common';
import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { Platform, PlatformModule } from '@angular/cdk/platform';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable, debounceTime, filter, map, startWith } from 'rxjs';
import peruMap from './peru-map.json';
import { UploadImagesService } from '../../../services/upload-images.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { IRegisterState } from '../../../interfaces/register.interface';
import { RegisterService } from '../../../services/register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    FooterComponent,
    NavBarComponent,
    ButtonComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    PlatformModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatProgressBarModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export default class RegisterComponent {
  private platform = inject(Platform);
  private builder = inject(FormBuilder);
  private uploadImageService = inject(UploadImagesService);
  private snackBar = inject(MatSnackBar);
  private registerService = inject(RegisterService);
  private router = inject(Router);

  public registerState = computed(() => {
    const state = this.registerService.getRegisterState();
    if (state.state === 'Esperando') return state;

    this.snackBar.open(state.message, 'Aceptar');

    if (state.state === 'Registrado') this.router.navigateByUrl('home');
    return state;
  });

  public usernameState = computed(() => {
    const state = this.registerService.getUsernameState();

    if (state.state === 'Esperando') return state;

    if (state.state === 'Duplicado') {
      this.registerFormGroup.get('username')?.setErrors({ invalidName: true });
    } else {
      this.registerFormGroup.get('username')?.setErrors(null);
    }
    this.snackBar.open(state.message, 'Aceptar');

    return state;
  });

  #formState = signal<IRegisterState>({
    state: 'Esperando',
    message: 'Esperando',
  });

  public getFormState = computed(() => this.#formState());

  public isMobile = computed(() => this.platform.ANDROID || this.platform.IOS);

  public registerFormGroup!: FormGroup;
  public filteredOptions!: Observable<any> | undefined;
  public getCities = computed(() => {
    if (!peruMap) {
      return [];
    } else {
      const cities = Object.keys(peruMap);
      console.log(cities);

      return cities ? cities : [];
    }
  });
  public imagesState = computed(() => this.uploadImageService.getState());

  ngOnInit() {
    this.initForm();
    this.registerService.initSignals();

    this.filteredOptions = this.registerFormGroup
      .get('city')
      ?.valueChanges.pipe(
        startWith(''),
        map((value) => {
          return this.getCities().filter((option) =>
            option.toLowerCase().includes(value.toLowerCase())
          );
        })
      );

    this.registerFormGroup
      .get('username')
      ?.valueChanges.pipe(
        debounceTime(500),
        filter((value) => value.length > 1)
      )
      .subscribe((value) => {
        this.registerService.checkUsername(value);
      });
  }

  private initForm() {
    this.registerFormGroup = this.builder.group({
      username: ['', [Validators.required]],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      dni: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, this.validatePassword(), Validators.minLength(6)],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          this.validateConfirmPassword(),
          Validators.minLength(6),
        ],
      ],
      country: ['Perú'],
      city: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  private validateUsername(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const username = control.value;
      if (!username) {
        return { required: true };
      }

      // Verificar si la contraseña cumple con los criterios
      this.registerService.checkUsername(username);

      return null;
    };
  }

  private validatePassword(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const password = control.value;
      if (!password) {
        return { required: true };
      }

      const hasNumber = /\d/.test(password);
      const hasUppercase = /[A-Z]/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

      const errors: { [key: string]: boolean } = {};

      if (!hasNumber) {
        errors['missingNumber'] = true;
      }
      if (!hasUppercase) {
        errors['missingUppercase'] = true;
      }
      if (!hasSpecialChar) {
        errors['missingSpecialChar'] = true;
      }

      return Object.keys(errors).length !== 0 ? errors : null;
    };
  }

  private validateConfirmPassword(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const confirmPassword = control.value;
      if (!confirmPassword) {
        return { required: true };
      }

      // Verificar si la contraseña cumple con los criterios
      const password = this.registerFormGroup.get('password')?.value;

      if (password !== confirmPassword) {
        return { notEqual: true };
      }

      return null;
    };
  }

  public uploadFile(input: HTMLInputElement) {
    console.log(input.files);

    if ((input.files ? input.files.length : 0) < 2) {
      this.snackBar.open('👉🏻 Debes adjuntar dos imágenes', 'Ok', {
        duration: 3000,
      });
      return;
    }

    if (this.imagesState().images.length) {
      this.snackBar.open(
        '👉🏻 Ya adjuntantes dos imagenes. Por favor, actualiza la página si deseas cargar imágenes nuevas',
        'Ok'
      );
      return;
    }

    this.uploadImageService.uploadFile(input, 'register');

    setTimeout(() => {
      this.imagesState();
    }, 4000);
  }

  public register() {
    // check if form is complete and user upload both images
    console.log(this.registerFormGroup.value);

    if (this.registerFormGroup.invalid) {
      this.#formState.update(() => {
        return {
          state: 'Error',
          message: '👉🏻 Debes completar todo el formulario',
        };
      });
      this.snackBar.open(this.getFormState().message, 'Aceptar');
      return;
    }

    if (this.imagesState().images.length < 2) {
      this.#formState.update(() => {
        return {
          state: 'Error',
          message:
            '👉🏻 Debes adjuntar dos imágenes (una de cada lado de tu DNI)',
        };
      });
      this.snackBar.open(this.getFormState().message, 'Aceptar');
      return;
    }

    this.#formState.update(() => {
      return { state: 'Cargando', message: '✳️ Registrando...' };
    });

    // this.snackBar.open(this.getFormState().message, 'Aceptar');

    this.registerService.registerUser(
      this.registerFormGroup.value,
      this.imagesState().images
    );
  }
}
