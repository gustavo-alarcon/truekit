import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ItemCardComponent } from '../../../shared/components/item-card/item-card.component';
import { CategoryCardComponent } from '../../../shared/components/category-card/category-card.component';
import { BenefitCardComponent } from '../../../shared/components/benefit-card/benefit-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
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
    { images: ['www.google.com'], title: 'Google', description: 'description' },
    { images: ['www.google.com'], title: 'Google', description: 'description' },
    { images: ['www.google.com'], title: 'Google', description: 'description' },
  ];

  public categories = [
    { image: 'www.google.com', title: 'Google', description: 'description' },
    { image: 'www.google.com', title: 'Google', description: 'description' },
    { image: 'www.google.com', title: 'Google', description: 'description' },
  ];

  public benefits = [
    { image: 'www.google.com', title: 'Google', description: 'description 1' },
    { image: 'www.google.com', title: 'Google', description: 'description 2' },
    { image: 'www.google.com', title: 'Google', description: 'description 3' },
    { image: 'www.google.com', title: 'Google', description: 'description 4' },
    { image: 'www.google.com', title: 'Google', description: 'description 5' },
    { image: 'www.google.com', title: 'Google', description: 'description 6' },
  ];
}
