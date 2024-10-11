import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-cat-modal',
  standalone: true,
  imports: [FormsModule,RouterModule,MatDialogModule,ReactiveFormsModule],
  templateUrl: './cat-modal.component.html',
  styleUrl: './cat-modal.component.css'
})
export class CatModalComponent {
      onSave(){

      }

      close(){

      }
}
