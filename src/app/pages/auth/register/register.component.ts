import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation, inject } from '@angular/core';
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
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export default class RegisterComponent {
  public registerFormGroup!: FormGroup;

  private builder = inject(FormBuilder);

  ngOnInit() {
    this.initForm();
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
      country: ['', Validators.required],
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
