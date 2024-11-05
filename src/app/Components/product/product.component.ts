import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { RetailServiceService } from '../../retail-service.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  productCount!: number;
  totalPrice: number = 0;

  ngOnInit(): void {
    this.getUser();
    throw new Error('Method not implemented.');
  }

  constructor(private dialog: MatDialog, private retailService: RetailServiceService) { }


  Product: FormGroup = new FormGroup({

    productName: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    quantity: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    categoryId: new FormControl('', [Validators.required])

  })

  productId: number | undefined;
  isContainer: boolean = false
  isApi: boolean = false
  products: any[] = []
  product: any
  http = inject(HttpClient)
  dialogRef: any;
  filteredProducts: any[] = []; // To hold filtered products
  searchAttempted: boolean = false; // Flag to track if a search was attempted



  openModal() {

    debugger
    const dialogRef = this.dialog.open(ProductModalComponent, {
      panelClass: 'custom-dialog-content',    
    });

    dialogRef.afterClosed().subscribe(()=>{
      this.getUser();
    }
      
    );
  }

  searchById() {
    this.searchAttempted = true;                                               // Set flag to true when search is attempted
    this.retailService.searchById(this.productId).subscribe((res: any) => {
      debugger
      if (res) {
        this.filteredProducts = [res];                                         // Wrap the object in an array
        console.log(res)
      }
      else {
        alert(res.message)
      }
    })
  }

  getUser() {
    debugger
    this.searchAttempted = false;
    this.isApi = true
    this.retailService.getProducts().subscribe((res: any) => {
      debugger
      this.products = res
      this.productCount = this.products.length;
      this.calculateTotalPrice();
      // console.log(this.categories)
      this.isApi = false
    })
  }

  calculateTotalPrice() {
    this.totalPrice = 0; // Initialize totalPrice
    for (const product of this.products) {
      this.totalPrice += Number(product.price); // Add each price to totalPrice
    }
  }
  onDelete(id: any) {
    debugger
    const isDelete = confirm("Are you sure?")
    if (isDelete) {
      this.retailService.onDelete(id).subscribe((res: any) => {
        debugger
        alert("Product deleted")
        this.getUser();
      })
    }
  }
}
