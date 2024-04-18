import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ItemCardComponent } from '../../../shared/components/item-card/item-card.component';
import { CategoryCardComponent } from '../../../shared/components/category-card/category-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    ItemCardComponent,
    CategoryCardComponent,
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
}
