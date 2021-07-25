import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from '../../services/adminservice.service';
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
Comment$;
  constructor(private adservice:AdminserviceService) {
    
   }
  ngOnInit() {
    this.Comment$=this.adservice.getComment();
  }
}
