import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isContainer : boolean = false
  isApi : boolean = false
  categories : any[] = []
  http = inject(HttpClient)
  
  getUser(){
    debugger
    this.isApi = true
        this.http.get("https://localhost:7061/api/Home/GetCategories&Products").subscribe((res:any)=>{
          debugger
            this.categories = res

            // console.log(this.categories)
            this.isApi =false
        })
  }
}
