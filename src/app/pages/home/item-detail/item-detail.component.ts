import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Platform } from '@angular/cdk/platform';
import { ItemsService } from '../../../services/items.service';
import { IItem } from '../../../interfaces/item.interface';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [
    CommonModule,
    NavBarComponent,
    FooterComponent,
    MatIconModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './item-detail.component.html',
  styleUrl: './item-detail.component.scss',
})
export default class ItemDetailComponent {
  #platform = inject(Platform);
  #itemService = inject(ItemsService);
  #route = inject(ActivatedRoute);

  public isMobile = computed(
    () => this.#platform.ANDROID || this.#platform.IOS
  );
  item: IItem = {} as IItem;

  constructor() {
    this.#route.params
      .pipe(
        switchMap((params) => {
          return this.#itemService.getItemById(params['id']);
        })
      )
      .subscribe((item) => {
        console.log(item.launchDate.seconds);

        this.item = item;
      });
  }
}
