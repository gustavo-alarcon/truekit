import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { FooterComponent } from '../../../shared/footer/footer.component';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, NavBarComponent, FooterComponent],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss',
})
export default class ItemListComponent {}
