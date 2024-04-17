import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { FooterComponent } from '../../../shared/footer/footer.component';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [CommonModule, NavBarComponent, FooterComponent],
  templateUrl: './item-detail.component.html',
  styleUrl: './item-detail.component.scss',
})
export default class ItemDetailComponent {}
