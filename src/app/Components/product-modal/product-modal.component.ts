import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [FormsModule,RouterModule,MatDialogModule,ReactiveFormsModule,ProductComponent],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.css'
})
export class ProductModalComponent  {

  constructor(private dialogRef: MatDialogRef<ProductModalComponent>) {}

  http = inject(HttpClient)
  productForm : FormGroup = new FormGroup ({
    
    productName : new FormControl('',[Validators.required,Validators.maxLength(30)]),
    quantity : new FormControl('',[Validators.required]),
    price : new FormControl('',[Validators.required]),
    categoryId : new FormControl('',[Validators.required])

})

formValue: any;

 products : any[] = []
 isApi : boolean = false

getUser(){
  debugger
  this.isApi =true
      this.http.get("https://localhost:7061/api/Home/GetProducts").subscribe((res:any)=>{
        debugger
          this.products = res

          // console.log(this.categories)
          this.isApi =false
      })
}

onSave(){
  
  debugger
  this.formValue = this.productForm.value;
    this.http.post("https://localhost:7061/api/Home/AddProduct",this.formValue).subscribe((res:any)=>{
      debugger
      console.log(res.result)
      this.dialogRef.close(); 
      if(res){
        alert("product add success")
        this.getUser();
      }else{
        alert(res.message)
      }
    })
}


  
  
  close() {
    this.dialogRef.close(); // Passing data back to the caller
  }
}
