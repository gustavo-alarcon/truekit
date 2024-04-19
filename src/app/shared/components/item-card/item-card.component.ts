import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule, MatRippleModule],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None,
})
export class ItemCardComponent {
  @Input({ required: true }) title = '';
  @Input({ required: true }) images: string[] = [];
  @Input() withBorder = false;
  @Input() description = '';
}
