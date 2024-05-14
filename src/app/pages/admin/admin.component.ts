import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  computed,
  inject,
  signal,
} from '@angular/core';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { AdminService } from '../../services/admin.service';
import { IUser } from '../../interfaces/user.interface';
import { debounceTime, startWith } from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    NavBarComponent,
    FooterComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatDividerModule,
    MatMenuModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export default class AdminComponent {
  private adminService = inject(AdminService);

  displayedColumns: string[] = [
    'position',
    'status',
    'username',
    'name',
    'lastname',
    'dni',
    'city',
    'phone',
    'updatedAt',
    'actions',
  ];

  searchControl = new FormControl('');

  dataSource: IUser[] = [];

  filteredUsers = new MatTableDataSource<IUser>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    this.adminService.getUserList().subscribe((users) => {
      this.dataSource = users;
      this.filteredUsers.data = users;
    });
  }

  ngAfterViewInit() {
    this.filteredUsers.paginator = this.paginator;

    // table filter with observables
    this.searchControl.valueChanges
      .pipe(startWith(''), debounceTime(300))
      .subscribe((value) => {
        if (!value || value === '') {
          this.filteredUsers.data = this.dataSource;
          console.log('complete');
        } else {
          this.filteredUsers.data = this.dataSource.filter(
            (user) =>
              user.username.toLowerCase().includes(value.toLowerCase()) ||
              user.name.toLowerCase().includes(value.toLowerCase()) ||
              user.lastname.toLowerCase().includes(value.toLowerCase()) ||
              user.dni.toLowerCase().includes(value.toLowerCase()) ||
              user.city.toLowerCase().includes(value.toLowerCase())
          );
          console.log('filtered');
        }
      });
  }

  public markAsActive(user: IUser) {
    this.adminService.markAsActive(user);
  }

  public markAsInactive(user: IUser) {
    this.adminService.markAsInactive(user);
  }

  public markAsPending(user: IUser) {
    this.adminService.markAsPending(user);
  }

  public deleteUser(user: IUser) {
    this.adminService.deleteUser(user);
  }
}
