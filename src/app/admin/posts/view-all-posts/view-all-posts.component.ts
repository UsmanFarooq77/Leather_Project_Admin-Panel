import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from '../../../services/adminservice.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ReversePipe } from 'ngx-pipes';
@Component({
  selector: 'app-view-all-posts',
  templateUrl: './view-all-posts.component.html',
  styleUrls: ['./view-all-posts.component.css'],
  providers: [ReversePipe]
})
export class ViewAllPostsComponent implements OnInit {
  Subcription: Subscription;
  Posts: { $key: string }[];
  postsFiltered: any[];
  DelPost;
  Hidden: boolean;
  Status: boolean;
  pageNumber: number;
  searchText: string;
  isPostsLoading: boolean;
  constructor(
    private adservice: AdminserviceService,
    private route: ActivatedRoute,
    public reversePipe: ReversePipe
  ) {
    this.pageNumber = 0;
    this.searchText = "";
    this.postsFiltered = [];
    this.isPostsLoading = true;
  }
  ngOnInit() {
    this.Subcription = this.adservice.getPost().subscribe(posts => {
      this.Posts = this.postsFiltered = posts
      this.isPostsLoading = false;
    });
  }
  deletePost(postId) {
    if (confirm("Are you sure to delete?")) {
      this.adservice.delete(postId);
      this.Hidden = true;
    }
    else {
      this.Hidden = false;
    }
  }
  filtered(query: string) {
    this.reversePipe.transform(this.postsFiltered = (query) ? this.Posts.filter(f => f.$key.toLowerCase().includes(query.toLowerCase()))
      : this.Posts);
  }
  Approved(key, event: any) {
    if (event.checked == true) {
      this.Status = true;
      this.adservice.updatePostStatus(key, this.Status);
    }
    else {
      this.Status = false;
      this.adservice.updatePostStatus(key, this.Status);
    }
  }
  ngOnDestroy() {
    this.Subcription.unsubscribe();
  }
}
