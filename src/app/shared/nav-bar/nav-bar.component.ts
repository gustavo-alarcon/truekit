import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../interfaces/user.interface';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatRippleModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  #authService = inject(AuthService);
  #router = inject(Router);

  user$ = this.#authService.user$;
  user: IUser = {} as IUser;

  constructor() {
    this.user$.subscribe((user) => {
      this.user = user as IUser;
    });
  }

  public login() {
    if (this.user) {
      this.#router.navigate(['/my-account']);
    } else {
      this.#router.navigate(['/auth/login']);
    }
  }

  public logout() {
    this.#authService.logout().then(() => {
      this.#authService.reset();
    });
  }
}
