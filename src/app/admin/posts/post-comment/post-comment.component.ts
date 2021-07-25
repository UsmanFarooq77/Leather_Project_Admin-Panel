import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from '../../../services/adminservice.service';
import { ReversePipe } from 'ngx-pipes';
@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.css'],
  providers: [ReversePipe]
})
export class PostCommentComponent implements OnInit {
  Comment$;
  Hidden: boolean;
  Status: string="";
  toggle:any;
  pageNumber: number;
  searchText: string;
  constructor(private adservice:AdminserviceService,public reversePipe: ReversePipe) {
    this.Comment$=this.adservice.getComment();
    this.pageNumber = 0;
    this.searchText = "";
   }
   deleteComment(key){
    if(confirm("Are you sure to delete?")){
      this.adservice.deleteComment(key);
       this.Hidden=true;
      }
      else{
       this.Hidden=false;
      }
   }
   Approved(key,status,event:any){
    if(event.checked==true){ 
      if(status=='unapproved'){
       status="approved"
       this.toggle=true;
     this.adservice.updateComment(key,status,this.toggle);
    }
  }
     else{
       status="unapproved";
       this.toggle=false;
       this.adservice.updateComment(key,status,this.toggle);
     }
   }
  ngOnInit() {
  }
}
