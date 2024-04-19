import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from '@angular/core';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CategoryCardComponent {
  @Input() title = '';
  @Input() image: string = '';
  @Input({ required: true }) categories: any[] = [];
  @Input() description = '';
}
