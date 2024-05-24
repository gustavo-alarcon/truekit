import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthService } from '../../services/auth.service';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { MatRippleModule } from '@angular/material/core';
import { ItemCardComponent } from '../../shared/components/item-card/item-card.component';
import { RouterModule } from '@angular/router';

export interface IRequest {
  username: string;
  createdAt: number;
  status: string;
  exchangeFrom: { name: string };
  exchangeTo: { name: string };
}

export interface IExchange {
  exchangeFrom: string;
  exchangeTo: string;
}

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [
    CommonModule,
    NavBarComponent,
    FooterComponent,
    ButtonComponent,
    ItemCardComponent,
    MatIconModule,
    MatProgressBarModule,
    MatRippleModule,
    RouterModule
  ],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.scss',
})
export default class MyAccountComponent {
  #authService = inject(AuthService);

  public user$ = this.#authService.user$;

  requestList: IRequest[] = [
    {
      username: 'Sarah Smith',
      status: 'check',
      exchangeFrom: { name: 'Naruto Shippuden' },
      exchangeTo: { name: 'One Peace' },
      createdAt: Date.now(),
    },
    {
      username: 'Sarah Smith',
      status: 'check',
      exchangeFrom: { name: 'Naruto Shippuden' },
      exchangeTo: { name: 'One Peace' },
      createdAt: Date.now(),
    },
    {
      username: 'Sarah Smith',
      status: 'check',
      exchangeFrom: { name: 'Naruto Shippuden' },
      exchangeTo: { name: 'One Peace' },
      createdAt: Date.now(),
    },
    {
      username: 'Sarah Smith',
      status: 'check',
      exchangeFrom: { name: 'Naruto Shippuden' },
      exchangeTo: { name: 'One Peace' },
      createdAt: Date.now(),
    },
    {
      username: 'Sarah Smith',
      status: 'check',
      exchangeFrom: { name: 'Naruto Shippuden' },
      exchangeTo: { name: 'One Peace' },
      createdAt: Date.now(),
    },
    {
      username: 'Sarah Smith',
      status: 'checked',
      exchangeFrom: { name: 'Naruto Shippuden' },
      exchangeTo: { name: 'One Peace' },
      createdAt: Date.now(),
    },
    {
      username: 'Sarah Smith',
      status: 'checked',
      exchangeFrom: { name: 'Naruto Shippuden' },
      exchangeTo: { name: 'One Peace' },
      createdAt: Date.now(),
    },
    {
      username: 'Sarah Smith',
      status: 'check',
      exchangeFrom: { name: 'Naruto Shippuden' },
      exchangeTo: { name: 'One Peace' },
      createdAt: Date.now(),
    },
    {
      username: 'Sarah Smith',
      status: 'check',
      exchangeFrom: { name: 'Naruto Shippuden' },
      exchangeTo: { name: 'One Peace' },
      createdAt: Date.now(),
    },
    {
      username: 'Sarah Smith',
      status: 'check',
      exchangeFrom: { name: 'Naruto Shippuden' },
      exchangeTo: { name: 'One Peace' },
      createdAt: Date.now(),
    },
    {
      username: 'Sarah Smith',
      status: 'check',
      exchangeFrom: { name: 'Naruto Shippuden' },
      exchangeTo: { name: 'One Peace' },
      createdAt: Date.now(),
    },
    {
      username: 'Sarah Smith',
      status: 'check',
      exchangeFrom: { name: 'Naruto Shippuden' },
      exchangeTo: { name: 'One Peace' },
      createdAt: Date.now(),
    },
    {
      username: 'Sarah Smith',
      status: 'check',
      exchangeFrom: { name: 'Naruto Shippuden' },
      exchangeTo: { name: 'One Peace' },
      createdAt: Date.now(),
    },
    {
      username: 'Sarah Smith',
      status: 'check',
      exchangeFrom: { name: 'Naruto Shippuden' },
      exchangeTo: { name: 'One Peace' },
      createdAt: Date.now(),
    },
    {
      username: 'Sarah Smith',
      status: 'check',
      exchangeFrom: { name: 'Naruto Shippuden' },
      exchangeTo: { name: 'One Peace' },
      createdAt: Date.now(),
    },
    {
      username: 'Sarah Smith',
      status: 'checked',
      exchangeFrom: { name: 'Naruto Shippuden' },
      exchangeTo: { name: 'One Peace' },
      createdAt: Date.now(),
    },
    {
      username: 'Sarah Smith',
      status: 'checked',
      exchangeFrom: { name: 'Naruto Shippuden' },
      exchangeTo: { name: 'One Peace' },
      createdAt: Date.now(),
    },
  ];

  public itemList = [
    {
      images: ['https://picsum.photos/300/320?random=1'],
      title: 'Google',
      description:
        'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    },
    {
      images: ['https://picsum.photos/300/320?random=2'],
      title: 'Google',
      description:
        'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    },
    {
      images: ['https://picsum.photos/300/320?random=3'],
      title: 'Google',
      description:
        'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    },
    {
      images: ['https://picsum.photos/300/320?random=1'],
      title: 'Google',
      description:
        'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    },
    {
      images: ['https://picsum.photos/300/320?random=2'],
      title: 'Google',
      description:
        'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    },
    {
      images: ['https://picsum.photos/300/320?random=3'],
      title: 'Google',
      description:
        'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    },
  ];

  constructor() {}
}
