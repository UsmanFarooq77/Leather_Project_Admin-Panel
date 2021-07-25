import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from '../../services/adminservice.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  Categories$;
  Hidden: boolean;
  categoryModel:any
  SubmitFeedback: boolean;
  categoryKey:string;
  pageNumber: number;
  submitButton:string;
  constructor(private adService:AdminserviceService, private route:ActivatedRoute) {
    this.pageNumber = 0;
    this.submitButton = "Add"
   }
   ngOnInit() {
    this.Categories$=this.adService.getCategories();
  }
  addCategory(category:NgForm){
    if(this.categoryKey){
      if(confirm("Are You Sure To Update Category?")){
        this.adService.updateCategory(category.value,this.categoryKey);
         this.SubmitFeedback=true;
         category.resetForm();
         this.submitButton = "Add";
         return;
        }
        else{
        this.SubmitFeedback=false;
        return;
        }
    }
    if(confirm("Are You Sure To Add Category?")){
      this.adService.addCategory(category.value,this.categoryModel);
      debugger;
       this.SubmitFeedback=true;
       category.resetForm();
      }
      else{
       this.SubmitFeedback=false;
      }
   }
   deleteCategories(key){
     if(confirm("Are you sure to delete?")){
      this.adService.deleteCategories(key);
       this.Hidden=true;
      }
      else{
       this.Hidden=false;
      }
   }
   updateCategory(key){
     this.submitButton = "Update"
     this.categoryModel = key;
     this.categoryKey=key; 
   }

}
