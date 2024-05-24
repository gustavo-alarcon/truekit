import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  computed,
  inject,
} from '@angular/core';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {
  MatNativeDateModule,
  MatRippleModule,
  NativeDateAdapter,
} from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Platform } from '@angular/cdk/platform';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UploadImagesService } from '../../../services/upload-images.service';
import { MatButtonModule } from '@angular/material/button';
import { ItemsService } from '../../../services/items.service';
import { MatProgressBar } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-item',
  standalone: true,
  imports: [
    CommonModule,
    NavBarComponent,
    FooterComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatRippleModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatProgressBar,
    RouterModule,
  ],
  templateUrl: './create-item.component.html',
  styleUrl: './create-item.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export default class CreateItemComponent implements OnInit {
  #platform = inject(Platform);
  #fb = inject(FormBuilder);
  #snackBar = inject(MatSnackBar);
  #uploadImageService = inject(UploadImagesService);
  #itemService = inject(ItemsService);

  public isMobile = computed(
    () => this.#platform.ANDROID || this.#platform.IOS
  );
  public imagesState = computed(() => {
    return this.#uploadImageService.getState();
  });

  newItemFormGroup: FormGroup = new FormGroup({});

  brandList = ['Marvelix', 'Marvel', 'DC'];

  categoryList = ['Comics', 'Movies', 'TV Shows'];

  franchiseList = [
    'Spider-Man',
    'Avengers',
    'X-Men',
    'Batman',
    'Superman',
    'Justice League',
  ];

  statusList = ['Nuevo', 'Abierto', 'Con daños'];

  photoURLList: string[] = [];

  itemState = computed(() => {
    const state = this.#itemService.itemState().state;

    if (state === 'registering') {
      this.#snackBar.open('⏳ Registrando artículo ...', 'Aceptar', {
        duration: 6000,
      });
    }

    if (state === 'registered') {
      this.#snackBar.open('✅ Artículo registrado ...', 'Aceptar', {
        duration: 6000,
      });

      this.newItemFormGroup.reset();
      this.photoURLList = [];
    }

    return this.#itemService.itemState();
  });

  constructor() {}

  ngOnInit(): void {
    this.newItemFormGroup = this.#fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      launchDate: ['', Validators.required],
      status: ['', Validators.required],
      isLimitedEdition: ['', Validators.required],
      category: ['', Validators.required],
      franchise: ['', Validators.required],
      withBox: ['', Validators.required],
      serialNumber: ['', Validators.required],
      sku: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  public uploadFile(input: HTMLInputElement) {
    if ((input.files ? input.files.length : 0) < 2) {
      this.#snackBar.open('👉🏻 Debes adjuntar por menos dos imágenes', 'Ok', {
        duration: 3000,
      });
      return;
    }

    this.#uploadImageService.uploadFile(input, 'items');

    setTimeout(() => {
      this.imagesState();
    }, 4000);
  }

  deleteImage(image: string, index: number) {
    this.#uploadImageService.deleteImage(image, index);
  }

  createItem() {
    // validate form is valid
    if (this.newItemFormGroup.invalid) {
      this.#snackBar.open('⚠️ Completa el formulario', 'Aceptar');
      return;
    }

    // validate there are two images
    if (this.imagesState().images.length < 2) {
      this.#snackBar.open(
        '⚠️ Debes cargar por lo menos dos imágenes de tu arítuclo',
        'Aceptar'
      );
      return;
    }

    // create item
    this.#itemService.createItem(
      this.newItemFormGroup.value,
      this.imagesState().images
    );
  }
}
