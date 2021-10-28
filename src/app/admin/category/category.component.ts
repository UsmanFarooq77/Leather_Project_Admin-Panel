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
  categoryModel:any
  SubmitFeedback: boolean;
  categoryKey:string;
  pageNumber: number;
  submitButton:string;
  isAlertHide: boolean;
  autoGenerateId: any;
  isDeleteAlertHide: boolean;
  constructor(private adService:AdminserviceService, private route:ActivatedRoute) {
    this.pageNumber = 0;
    this.submitButton = "Add"
    this.isAlertHide = null;
    this.isDeleteAlertHide = null;
   }
   ngOnInit() {
    this.Categories$=this.adService.getCategories();
  }
  addCategory(category:NgForm){
    if(this.categoryKey){
      if(confirm("Are You Sure To Update Category?")){
        this.autoGenerateId = this.adService.updateCategory(category.value,this.categoryKey);
        //  this.SubmitFeedback=true;
        if (this.autoGenerateId) {
          this.isAlertHide = true;
        }
        else {
          this.isAlertHide = false;
        }
         category.resetForm();
         this.submitButton = "Add";
         return;
        }
        else{
        // this.SubmitFeedback=false;
        this.isAlertHide = false;
        return;
        }
    }
    if(confirm("Are You Sure To Add Category?")){
      this.autoGenerateId = this.adService.addCategory(category.value,this.categoryModel);
      //  this.SubmitFeedback=true;
      if (this.autoGenerateId) {
        this.isAlertHide = true;
      }
      else {
        this.isAlertHide = false;
      }
       category.resetForm();
      }
      else{
      //  this.SubmitFeedback=false;
      this.isAlertHide = false;
      }
   }
   deleteCategories(key){
     if(confirm("Are you sure to delete?")){
      this.autoGenerateId = this.adService.deleteCategories(key);
      if (this.autoGenerateId) {
        this.isDeleteAlertHide = true;
      }
      else {
        this.isDeleteAlertHide = false;
      }
      }
      else{
      this.isDeleteAlertHide = false;
      }
   }
   updateCategory(key){
     this.submitButton = "Update"
     this.categoryModel = key;
     this.categoryKey=key; 
   }
   closeAlert(): void {
    this.isAlertHide = null;
  }
  closeDeleteAlert(): void {
    this.isDeleteAlertHide = null;
  }


}
