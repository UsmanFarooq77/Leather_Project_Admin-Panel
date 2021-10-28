import { Product } from '../../../interfaces/Product';
import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from '../../../services/adminservice.service';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';
import * as firebase from 'firebase';
import { FormBuilder, FormGroup, Validators, FormsModule, NgForm, FormGroupDirective } from '@angular/forms';
import { product } from '../../../models/product-model';
declare var tinymce: any;
declare var $: any;
// function editor() {
//   tinymce.init({
//     selector: 'textarea#mytextarea',
//     skin: 'bootstrap',
//     plugins: 'lists, link, image, media',
//     toolbar: 'h1 h2 bold italic strikethrough blockquote bullist numlist backcolor | link image media | removeformat help',
//     menubar: false
//   });
// }
@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  categories$;
  public post = new product();
  id;
  actual_price: string;
  post_tags: string;
  downloadUrl1: string;
  downloadUrl2: string;
  downloadUrl3: string;
  downloadUrl4: string;
  downloadUrl5: string;
  downloadUrl6: string;
  addpost: FormGroup;
  post_title: string;
  post_category: string;
  post_phone_num: string;
  picker: Date = null;
  discountPrice: number;
  actualPrice: any;
  specialPrice: any;
  isLoadingImage1: boolean;
  isLoadingImage2: boolean;
  isLoadingImage3: boolean;
  isLoadingImage4: boolean;
  postButton: string;
  isAlertHide: boolean;
  autoGenerateId: any;
  isUpdateAlertHide: boolean;
  constructor(
    private adservice: AdminserviceService,
    route: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    this.discountPrice = 0;
    this.isLoadingImage1 = false;
    this.isLoadingImage2 = false;
    this.isLoadingImage3 = false;
    this.isLoadingImage4 = false;
    this.postButton = "Add";
    this.categories$ = adservice.getCategories();
    this.id = route.snapshot.paramMap.get('id');
    if (this.id) 
    {
      this.postButton = "Update";
      adservice.getIdObject(this.id).take<Product>(1).subscribe(p => this.post = p)
    };
    this.isAlertHide = null;
    this.isUpdateAlertHide = null;
  }
  EMAIL_REGEXP = /^[^@]+@([^@\.]+\.)+[^@\.]+$/i;
  ngOnInit(): void {
    this.addpost = this.fb.group({
      'post_title': [null, Validators.required],
      'post_actual_price': [null],
      'post_special_price': [null],
      'post_category': [null, Validators.required],
      'post_discount': [null, Validators.required,],
      'image1': [null, Validators.required],
      'image2': [null, Validators.required],
      'image3': [null, Validators.required],
      'image4': [null, Validators.required],
      // 'image5': [null],
      // 'image6': [null],
      'post_sku': [null, Validators.required],
      'post_status': [true],
      // 'file' : [null,Validators.required],
      // 'post_email': [null, Validators.pattern(this.EMAIL_REGEXP)],
      'post_content': [null, Validators.compose([Validators.required, Validators.maxLength(5000), Validators.minLength(20)])],
      'picker': [null]
    });
    // editor();
    this.addpost.get('post_actual_price').valueChanges.subscribe(value => this.actualPrice = value);
    this.addpost.get('post_special_price').valueChanges.subscribe(value => {
      this.specialPrice = value;
      this.discountPrice = this.actualPrice - this.specialPrice
      if (this.discountPrice && this.discountPrice > 0 && this.specialPrice > 0) {
        this.post.post_discount = this.discountPrice / this.actualPrice * 100;
      }
      else {
        this.post.post_discount = 0;
      }
    });
  }
  AddPost(addpost: FormGroup, formD: FormGroupDirective) {
    if (this.id) {
      if (confirm("Are You Sure To Update Post?")) {
        this.autoGenerateId = this.adservice.updatePost(this.id, addpost.value);
        if (this.autoGenerateId) {
          this.isUpdateAlertHide = true;
        }
        else {
          this.isUpdateAlertHide = false;
        }
        addpost.reset();
        formD.resetForm();
        this.postButton = "Add"
        this.scroll();
      }
      else {
        this.isUpdateAlertHide = false;
      }
    }
    else {
      if (confirm("Are You Sure To Add Post?")) {
        this.autoGenerateId = this.adservice.addPost(addpost.value);
        if (this.autoGenerateId) {
          this.isAlertHide = true;
        }
        else {
          this.isAlertHide = false;
        }
        addpost.reset();
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
  imageOne(even: any, photoName: string) {
    this.isLoadingImage1 = true;
    const file: File = even.target.files[0];
    const metadata = { 'contentType': file.type };
    const storageReference: firebase.storage.Reference = firebase.storage().ref('/photos/' + file.name);
    const uploadT: firebase.storage.UploadTask = storageReference.put(file, metadata);
    uploadT.then((uploadSnapShot: firebase.storage.UploadTaskSnapshot) => {
      this.downloadUrl1 = uploadSnapShot.downloadURL;
      this.isLoadingImage1 = false;
    })
  }
  imageTwo(even: any, photoName: string) {
    this.isLoadingImage2 = true;
    const file: File = even.target.files[0];
    const metadata = { 'contentType': file.type };
    const storageReference: firebase.storage.Reference = firebase.storage().ref('/photos/' + file.name);
    const uploadT: firebase.storage.UploadTask = storageReference.put(file, metadata);
    uploadT.then((uploadSnapShot: firebase.storage.UploadTaskSnapshot) => {
      this.downloadUrl2 = uploadSnapShot.downloadURL;
      this.isLoadingImage2 = false;
    })
  }
  imageThree(even: any, photoName: string) {
    this.isLoadingImage3 = true;
    const file: File = even.target.files[0];
    const metadata = { 'contentType': file.type };
    const storageReference: firebase.storage.Reference = firebase.storage().ref('/photos/' + file.name);
    const uploadT: firebase.storage.UploadTask = storageReference.put(file, metadata);
    uploadT.then((uploadSnapShot: firebase.storage.UploadTaskSnapshot) => {
      this.downloadUrl3 = uploadSnapShot.downloadURL;
      this.isLoadingImage3 = false;
    })
  }
  imageFour(even: any, photoName: string) {
    this.isLoadingImage4 = true;
    const file: File = even.target.files[0];
    const metadata = { 'contentType': file.type };
    const storageReference: firebase.storage.Reference = firebase.storage().ref('/photos/' + file.name);
    const uploadT: firebase.storage.UploadTask = storageReference.put(file, metadata);
    uploadT.then((uploadSnapShot: firebase.storage.UploadTaskSnapshot) => {
      this.downloadUrl4 = uploadSnapShot.downloadURL;
      this.isLoadingImage4 = false;
    })
  }
  // image5(even: any, photoName: string) {
  //   const file: File = even.target.files[0];
  //   const metadata = { 'contentType': file.type };
  //   const storageReference: firebase.storage.Reference = firebase.storage().ref('/photos/' + file.name);
  //   const uploadT: firebase.storage.UploadTask = storageReference.put(file, metadata);
  //   uploadT.then((uploadSnapShot: firebase.storage.UploadTaskSnapshot) => {
  //     this.downloadUrl5 = uploadSnapShot.downloadURL;
  //   })
  // }
  // image6(even: any, photoName: string) {
  //   const file: File = even.target.files[0];
  //   const metadata = { 'contentType': file.type };
  //   const storageReference: firebase.storage.Reference = firebase.storage().ref('/photos/' + file.name);
  //   const uploadT: firebase.storage.UploadTask = storageReference.put(file, metadata);
  //   uploadT.then((uploadSnapShot: firebase.storage.UploadTaskSnapshot) => {
  //     this.downloadUrl6 = uploadSnapShot.downloadURL;
  //     // console.log("change is", this.downloadUrl6);
  //   })
  // }
  closeAlert(): void {
    this.isAlertHide = null;
  }
  closeUpdateAlert(): void {
    this.isUpdateAlertHide = null;
  }
}
