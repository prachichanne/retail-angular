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
  selectedFilter : number[] = []
  filteredCategoriesList : any[] = []
  sortBy: string = ''; 

 constructor( private retailService: RetailServiceService) { }

  ngOnInit(): void {
    this.getUser();
    
    throw new Error('Method not implemented.');
  }

toggleFilter(categoryId: number, event: Event) {
  const inputElement = event.target as HTMLInputElement;  // Cast event.target to HTMLInputElement
  const isChecked = inputElement.checked;  // Now we can access the 'checked' property

  if (isChecked) {
    this.selectedFilter.push(categoryId);  // Add the selected categoryId
  } else {
    const index = this.selectedFilter.indexOf(categoryId);
    if (index > -1) {
      this.selectedFilter.splice(index, 1);  // Remove the deselected categoryId
    }
  }

  console.log(this.selectedFilter)
}

filterBtn() {
  console.log('Selected Filters:', this.selectedFilter);  // Check selected filter state
  console.log('Categories before filtering:', this.categories);  // Check categories list
  // Debugging: Check for categoryId type consistency
  this.categories.forEach(category => {
    console.log(`Category ID type for ${category.cid}:`, typeof category.cid);
  });

  if (this.selectedFilter.length === 0) {
    this.filteredCategoriesList = [...this.categories];  // No filter, so return all categories
  } else {
    this.filteredCategoriesList = this.categories.filter(category =>
      this.selectedFilter.includes(category.cid)
    );
    console.log('Filtered Categories:', this.filteredCategoriesList);  // Check filtered result
  }
}
removeAllFilters() {
  this.selectedFilter = [];  // Clear the selected filters array
  console.log('All filters removed!');
  // Optionally, you can also reset or clear other parts of the UI if needed
  this.filteredCategoriesList = [...this.categories];  // If you're using a filtered list
}

sortCategories(sortBy: string) {
  this.sortBy = sortBy;  // Update the selected sort option
  switch (sortBy) {
    case 'nameAsc':
      this.filteredCategoriesList.sort((a, b) => a.categoryName.localeCompare(b.categoryName));
      break;
    case 'nameDesc':
      this.filteredCategoriesList.sort((a, b) => b.categoryName.localeCompare(a.categoryName));
      break;
    case 'idAsc':
      this.filteredCategoriesList.sort((a, b) => a.categoryId - b.categoryId);
      break;
    case 'idDesc':
      this.filteredCategoriesList.sort((a, b) => b.categoryId - a.categoryId);
      break;
    default:
      // No sorting or custom default sorting
      break;
  }
  console.log('Sorted Categories:', this.filteredCategoriesList);
}

  getUser(){
    debugger
    this.isApi = true
        this.retailService.getCategoriesProducts().subscribe((res:any)=>{
          debugger
            this.categories = res
            this.filteredCategoriesList = res
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
