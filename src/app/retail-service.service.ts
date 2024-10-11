import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RetailServiceService {

  constructor(private http:HttpClient) { }

  getProducts(){
    return this.http.get("https://localhost:7061/api/Home/GetProducts")
  }

  onDelete(id:any){
    return this.http.delete("https://localhost:7061/api/Home/DeleteProduct/"+id)
  }

  searchById(id:any){
    return this.http.get("https://localhost:7061/api/Home/GetProduct/"+id)
  }

  getCategoriesProducts(){
    return this.http.get("https://localhost:7061/api/Home/GetCategories&Products")
  }

  getCategories(){
    return this.http.get("https://localhost:7061/api/Home/GetCategories")
  }

  searchCatById(id:any){
    return this.http.get("https://localhost:7061/api/Home/GetCategories/")
  }

  deleteCatById(id:any){
    return this.http.delete("https://localhost:7061/api/Home/DeleteCategory/"+id)
  }
}
