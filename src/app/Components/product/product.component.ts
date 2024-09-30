import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ProductModalComponent } from '../product-modal/product-modal.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

 
  ngOnInit(): void {
    this.getUser();
    throw new Error('Method not implemented.');
  }
  
  constructor(private dialog: MatDialog) {}

  
  Product : FormGroup = new FormGroup ({
    
      productName : new FormControl('',[Validators.required,Validators.maxLength(30)]),
      quantity : new FormControl('',[Validators.required]),
      price : new FormControl('',[Validators.required]),
      categoryId : new FormControl('',[Validators.required])

  })

  productId: number | undefined;
  isContainer : boolean = false
  isApi : boolean = false
  products : any[] = []
  product :any
  http = inject(HttpClient)
  dialogRef: any;
  filteredProducts: any[] = []; // To hold filtered products
  searchAttempted: boolean = false; // Flag to track if a search was attempted

 

  openModal() {
   
  //   const dialogRef = this.dialog.open(ProductModalComponent); 
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed with result:', result);
  //     // You can handle the result here as needed
  //   });
  const dialogRef = this.dialog.open(ProductModalComponent, {
   //Use the custom class
    
   panelClass: 'custom-dialog-content',
  });
   }

  // searchById() {
  //   this.searchAttempted = true; // Set flag to true when search is attempted
  //   if (this.productId) {
  //     this.filteredProducts = this.products.filter(product => product.pid === this.productId);
  //     console.log(this.filteredProducts[0])
  //   } else {
  //     this.filteredProducts = [...this.products]; // Reset to all products if searchId is empty
  //   }
  // }
  searchById(){

    this.searchAttempted = true; // Set flag to true when search is attempted
      this.http.get("https://localhost:7061/api/Home/GetProduct/"+this.productId).subscribe((res :any)=> {

        debugger
        
        if(res){
          this.filteredProducts = [res]; // Wrap the object in an array
          console.log(res)
        }
        else{
          alert(res.message)
        }
      })
  }

  
  getUser(){
    debugger
    this.searchAttempted = false;
    this.isApi = true
        this.http.get("https://localhost:7061/api/Home/GetProducts").subscribe((res:any)=>{
          debugger
            this.products = res
            // console.log(this.categories)
            this.isApi =false
        })
  }

  onDelete(id:any){
    debugger
    const isDelete = confirm("Are you sure?")
    if(isDelete){
      this.http.delete("https://localhost:7061/api/Home/DeleteProduct/" +id).subscribe((res:any)=>{
        debugger
        alert("department deleted")
        this.getUser();
       
        // debugger
        // if(res.result){
        //   debugger
        //  this.getUser();
        //   alert("department deleted")
        
        // }else{
        //   alert(res.message)
        // }
      })
    }
  }
}
