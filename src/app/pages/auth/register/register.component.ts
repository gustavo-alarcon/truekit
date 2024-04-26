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
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RegisterForm } from '../../../interfaces/register.interface';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { Platform, PlatformModule } from '@angular/cdk/platform';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {
  Observable,
  catchError,
  filter,
  map,
  startWith,
  throwError,
} from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PeruMap } from '../../../interfaces/peruMap.interface';
import peruMap from './peru-map.json';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    FooterComponent,
    NavBarComponent,
    ButtonComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    PlatformModule,
    MatAutocompleteModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export default class RegisterComponent {
  private platform = inject(Platform);
  private builder = inject(FormBuilder);
  private http = inject(HttpClient);

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

  // private jsonData = signal<any>(null);

  ngOnInit() {
    this.initForm();

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
  }

  private initForm() {
    this.registerFormGroup = this.builder.group({
      username: ['', [Validators.required, this.validateUsername()]],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      dni: ['', Validators.required],
      dniPhotoURL: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '/^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]+$/'
          ),
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '/^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]+$/'
          ),
          this.validateConfirmPassword(),
        ],
      ],
      country: ['Perú', Validators.required],
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

      if (true) {
        return { invalidName: true };
      }

      return null;
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
      console.log(password);

      if (password !== confirmPassword) {
        return { notEqual: true };
      }

      return null;
    };
  }
}
