import { reviews } from './../../../models/review-model';
import { Review } from './../../../interfaces/review';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective, Validators, FormBuilder } from '@angular/forms';
import { AdminserviceService } from '../../../services/adminservice.service';
import * as firebase from 'firebase';
declare var $ : any;

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {
  id: any;
  downloadUrl1: string;
  downloadUrl2: string;
  addReview: FormGroup;
  public review = new reviews();
  isLoadingImage1: boolean;
  isLoadingImage2: boolean;
  submitReview: string;
  isAlertHide: boolean;
  autoGenerateId: any;
  isUpdateAlertHide: boolean;

  constructor(private adservice: AdminserviceService, 
    private fb: FormBuilder,
    private route: ActivatedRoute) {
      this.isLoadingImage1 = false;
      this.isLoadingImage2 = false;
      this.submitReview = "Publish";
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) 
    {
      this.submitReview = "Update";
      adservice.getReviewObject(this.id).take<Review>(1).subscribe((review) => this.review = review);
    }
    this.isAlertHide = null;
    this.isUpdateAlertHide = null;
   }

  ngOnInit(): void {
    this.addReview = this.fb.group({
      'user_name': [null, Validators.required],
      'user_city': [null, Validators.compose([Validators.required, Validators.maxLength(15), Validators.minLength(3)])],
      'user_phone_num': [null, Validators.required,],
      'user_address': [null, Validators.required],
      'user_status': [null],
      'image1': [null, Validators.required],
      'image2': [null, Validators.required],
      // 'file' : [null,Validators.required],
      'user_content': [null, Validators.compose([Validators.required, Validators.maxLength(5000), Validators.minLength(20)])],
      'date': [null]
    });
  }  

  addReviewForm(addreview: FormGroup, formD: FormGroupDirective) {
    if (this.id) {
      if (confirm("Are You Sure To Update Post?")) {
        this.autoGenerateId = this.adservice.updateReview(this.id, addreview.value);
        if (this.autoGenerateId) {
          this.isUpdateAlertHide = true;
        }
        else {
          this.isUpdateAlertHide = false;
        }
        addreview.reset();
        formD.resetForm();
        this.submitReview = "Publish";
        this.scroll();
      }
      else {
        this.isUpdateAlertHide = false;
      }
    }
    else {
      if (confirm("Are You Sure To Add Post?")) {
        this.autoGenerateId = this.adservice.addReview(addreview.value);
        if (this.autoGenerateId) {
          this.isAlertHide = true;
        }
        else {
          this.isAlertHide = false;
        }
        addreview.reset();
        formD.resetForm();
        this.scroll();
      }
      else {
        this.isAlertHide = false;
      }
    }
  }

  scroll(){
    window.scrollTo({
      top:20,
      behavior:'smooth'
    });
  }
  imageOne(eve: any, photoName: string) {
    this.isLoadingImage1 = true;
    const file: File = eve.target.files[0];
    const metadata = { 'contentType': file.type };
    const strge: firebase.storage.Reference = firebase.storage().ref('/photos/' + file.name);
    const uploadT: firebase.storage.UploadTask = strge.put(file, metadata);
    uploadT.then((uploadSnapShot: firebase.storage.UploadTaskSnapshot) => {
      this.downloadUrl1 = uploadSnapShot.downloadURL;
      this.isLoadingImage1 = false;
    })
  }
  imageTwo(eve: any, photoName: string) {
    this.isLoadingImage2 = true;
    const file: File = eve.target.files[0];
    const metadata = { 'contentType': file.type };
    const strge: firebase.storage.Reference = firebase.storage().ref('/photos/' + file.name);
    const uploadT: firebase.storage.UploadTask = strge.put(file, metadata);
    uploadT.then((uploadSnapShot: firebase.storage.UploadTaskSnapshot) => {
      this.downloadUrl2 = uploadSnapShot.downloadURL;
      this.isLoadingImage2 = false;
    })
  }
  closeAlert(): void {
    this.isAlertHide = null;
  }
  closeUpdateAlert(): void {
    this.isUpdateAlertHide = null;
  }

}
