import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-benefit-card',
  standalone: true,
  imports: [],
  templateUrl: './benefit-card.component.html',
  styleUrl: './benefit-card.component.scss',
})
export class BenefitCardComponent {
  @Input({ required: true }) title = '';
  @Input({ required: true }) image: string = '';
  @Input() description = '';
}
