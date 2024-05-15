import { Platform, PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
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
    PlatformModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export default class LoginComponent {
  private platform = inject(Platform);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  public isMobile = computed(() => this.platform.ANDROID || this.platform.IOS);

  public loginFormGroup!: FormGroup;

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    this.authService.login(
      this.loginFormGroup.value['email'],
      this.loginFormGroup.value['password']
    );
  }
}
