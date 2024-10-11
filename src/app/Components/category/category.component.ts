import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RetailServiceService } from '../../retail-service.service';
import { CommonModule } from '@angular/common';
import { CatModalComponent } from '../cat-modal/cat-modal.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {

  dialogRef: any;
  filteredProducts: any[] = []; // To hold filtered products
  searchAttempted: boolean = false; // Flag to track if a search was attempted

  category: any
  categoryId: number | undefined
  totalPrice: number | undefined
  categoryCount: number | undefined
  categories: any[] = []

  filteredCategories: any[] = [];
  searchTerm: string = '';

  ngOnInit(): void {
    this.getAllCategory();
    throw new Error('Method not implemented.');
  }

  constructor(private dialog: MatDialog, private retailService: RetailServiceService) { }

  Category: FormGroup = new FormGroup({

    categoryName: new FormControl('', [Validators.required, Validators.maxLength(30)]),

  })



  // getAllCategory(){

  //     debugger
  //     this.retailService.getCategories().subscribe((res) => {
  //       if (res) {
  //         this.categories = res;                                         // Wrap the object in an array
  //         console.log(res)
  //       }
  //       else {
  //         alert("Incorrect URL")
  //       }
  //     })
  // }

  getAllCategory() {
    debugger
    this.searchAttempted = false;

    this.retailService.getCategories().subscribe((res: any) => {
      debugger
      this.categories = res
      console.log(this.categories)

    })
  }

  onDelete(id: number) {
    debugger
    const isDelete = confirm("Are you sure?")
    if (isDelete) {
      console.log(id)
      this.retailService.deleteCatById(id).subscribe((res: any) => {
        debugger
        alert("Category deleted")
        this.getAllCategory();
      })
    }
  }
  openModal() {
    const dialogRef = this.dialog.open(CatModalComponent, {
      panelClass: 'custom-dialog-content',
    });
  }

  searchCatById() {
    debugger
    this.searchAttempted = true;                                               // Set flag to true when search is attempted

    if (this.categoryId==0) {
      this.filteredCategories = this.categories;
    } else {
      debugger
      const term = Number(this.categoryId);
      console.log(this.categoryId)
      console.log(this.categories[0].cid)
      console.log(typeof this.categories[0].cid, typeof term);
      this.filteredCategories = this.categories.filter(category =>
        category.cid === term
      );

      console.log(this.filteredCategories)
    }

  }

  
}
