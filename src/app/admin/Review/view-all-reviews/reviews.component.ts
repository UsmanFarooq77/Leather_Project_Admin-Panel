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
  isDeleteAlertHide: boolean;
  autoGenerateId: any;

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
    this.isDeleteAlertHide = null;
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
      this.autoGenerateId = this.adservice.deleteReview(reviewId);
      if (this.autoGenerateId) {
        this.isDeleteAlertHide = true;
      }
      else {
        this.isDeleteAlertHide = false;
      }
    }
    else {
      this.isDeleteAlertHide = false;
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
  closeDeleteAlert(): void {
    this.isDeleteAlertHide = null;
  }
  ngOnDestroy() {
    this.Subcription.unsubscribe();
  }

}
