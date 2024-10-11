import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RetailServiceService } from '../../retail-service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  isContainer : boolean = false
  isApi : boolean = false
  categories : any[] = []
  http = inject(HttpClient)
  totalPrice: number = 0;
  productCount: any;
  categoriesCount: number = 0;

 constructor( private retailService: RetailServiceService) { }

  ngOnInit(): void {
    this.getUser();
    throw new Error('Method not implemented.');
  }


  getUser(){
    debugger
    this.isApi = true
        this.retailService.getCategoriesProducts().subscribe((res:any)=>{
          debugger
            this.categories = res
            this.categoriesCount = this.categories.length;
            this.productCount = this.getTotalProductCount();
            this.calculateTotalPrice();
            
            // console.log(this.categories)
            this.isApi =false
        })
  }

  getTotalProductCount() {
    return this.categories.reduce((total, category) => {
      return total + category.products.length;
    }, 0);
  }

  calculateTotalPrice() {
    this.totalPrice = 0; // Initialize totalPrice
    for (const product of this.categories) {
      this.totalPrice += Number(product.price); // Add each price to totalPrice
    }
  }
  
  onDelete(id:number){
    debugger
    const isDelete = confirm("Are you sure?")
    if(isDelete){
      this.retailService.onDelete(id).subscribe((res:any)=>{
        debugger
        alert("Product deleted")
        this.getUser();
      })
    }



  }
}
