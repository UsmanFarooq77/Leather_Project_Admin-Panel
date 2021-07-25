import { Review } from './../../../interfaces/review';
import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from '../../../services/adminservice.service';
import { ActivatedRoute } from '@angular/router';
import { ReversePipe } from 'ngx-pipes';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
  providers: [ReversePipe]
})
export class ReviewsComponent implements OnInit {
  reviews: Review[];
  Subcription: any;
  reviewsFiltered: any[];
  pageNumber: number;
  searchText: string;
  Hidden: boolean;
  Status: boolean;
  isReviewsLoading: boolean;

  constructor(
    private adservice: AdminserviceService,
    private route: ActivatedRoute,
    public reversePipe: ReversePipe
  ) {
    // this.Subcription  =  adservice.getPost().subscribe(posts => this.reviews = this.reviewsFiltered = posts);
    this.pageNumber = 0;
    this.searchText = ""
    this.isReviewsLoading = true;
    this.reviewsFiltered = [];
  }
  ngOnInit() {
    this.Subcription = this.adservice.getReviews().subscribe((review) => {
      this.isReviewsLoading = false;
      this.reviews = this.reviewsFiltered = review;
    })
  }
  filtered(query: string) {
    this.reversePipe.transform(this.reviewsFiltered = (query) ? this.reviews.filter(f => f.$key.toLowerCase().includes(query.toLowerCase()))
      : this.reviews);
  }
  deleteReview(reviewId) {
    if (confirm("Are you sure to delete?")) {
      this.adservice.deleteReview(reviewId);
      this.Hidden = true;
    }
    else {
      this.Hidden = false;
    }
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
