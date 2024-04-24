import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ItemCardComponent } from '../../../shared/components/item-card/item-card.component';
import { CategoryCardComponent } from '../../../shared/components/category-card/category-card.component';
import { BenefitCardComponent } from '../../../shared/components/benefit-card/benefit-card.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonComponent,
    ItemCardComponent,
    CategoryCardComponent,
    BenefitCardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export default class HomeComponent {
  public featuredItems = [
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

  public categories = [
    { imageURL: '', title: 'Google', description: 'description' },
    { imageURL: '', title: 'Google', description: 'description' },
    { imageURL: '', title: 'Google', description: 'description' },
    { imageURL: '', title: 'Google', description: 'description' },
    { imageURL: '', title: 'Google', description: 'description' },
    { imageURL: '', title: 'Google', description: 'description' },
    { imageURL: '', title: 'Google', description: 'description' },
    { imageURL: '', title: 'Google', description: 'description' },
    { imageURL: '', title: 'Google', description: 'description' },
  ];

  public benefits = [
    {
      image: 'https://picsum.photos/200/200?random=2',
      title: 'Google',
      description:
        'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    },
    {
      image: 'https://picsum.photos/200/200?random=2',
      title: 'Google',
      description:
        'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    },
    {
      image: 'https://picsum.photos/200/200?random=2',
      title: 'Google',
      description:
        'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    },
    {
      image: 'https://picsum.photos/200/200?random=2',
      title: 'Google',
      description:
        'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    },
    {
      image: 'https://picsum.photos/200/200?random=2',
      title: 'Google',
      description:
        'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    },
    {
      image: 'https://picsum.photos/200/200?random=2',
      title: 'Google',
      description:
        'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    },
  ];
}
