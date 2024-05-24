import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ViewChild,
  computed,
  inject,
} from '@angular/core';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { Platform } from '@angular/cdk/platform';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ItemsService } from '../../../services/items.service';
import { IItem } from '../../../interfaces/item.interface';
import { ItemCardComponent } from '../../../shared/components/item-card/item-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, startWith } from 'rxjs';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [
    CommonModule,
    NavBarComponent,
    FooterComponent,
    ItemCardComponent,
    RouterModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss',
})
export default class ItemListComponent implements AfterViewInit {
  #platform = inject(Platform);
  #itemService = inject(ItemsService);

  viewType = 'images';
  items: IItem[] = [];

  public isMobile = computed(
    () => this.#platform.ANDROID || this.#platform.IOS
  );

  displayedColumns: string[] = [
    'position',
    'name',
    'category',
    'franchise',
    'state',
    'sku',
    'createdAt',
  ];

  searchControl = new FormControl('');

  filteredItems = new MatTableDataSource<IItem>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    this.filteredItems.paginator = this.paginator;

    this.#itemService.getFeaturedItems().subscribe((items) => {
      this.items = items;
    });
  }

  ngAfterViewInit() {
    // table filter with observables
    this.searchControl.valueChanges
      .pipe(startWith(''), debounceTime(300))
      .subscribe((value) => {
        if (!value || value === '') {
          this.filteredItems.data = this.items;
          console.log('complete');
        } else {
          this.filteredItems.data = this.items.filter(
            (user) =>
              user.name.toLowerCase().includes(value.toLowerCase()) ||
              user.category.toLowerCase().includes(value.toLowerCase()) ||
              user.franchise.toLowerCase().includes(value.toLowerCase()) ||
              user.state.toLowerCase().includes(value.toLowerCase()) ||
              user.sku.toLowerCase().includes(value.toLowerCase())
          );
          console.log('filtered');
        }
      });
  }

  toggleViewType() {
    if (this.viewType === 'images') {
      this.viewType = 'table';
    } else {
      this.viewType = 'images';
    }
  }
}
