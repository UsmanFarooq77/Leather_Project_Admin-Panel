import { Component, OnInit } from '@angular/core';
import { ReversePipe } from 'ngx-pipes';
import { Subscription } from 'rxjs';
import { newsLetterModel } from '../../models/newsletter-model';
import { AdminserviceService } from '../../services/adminservice.service';

@Component({
  selector: 'app-view-all-newsletter',
  templateUrl: './view-all-newsletter.component.html',
  styleUrls: ['./view-all-newsletter.component.css'],
  providers: [ReversePipe]
})
export class ViewAllNewsletterComponent implements OnInit {
  public newLetterModel: newsLetterModel[];
  Subcription: Subscription;
  newsLetterFiltered: any[];
  pageNumber: number;
  isNewsLetterLoading: boolean;
  isDeleteAlertHide: boolean;
  autoGenerateId: any;
  constructor(private adservice: AdminserviceService,
    public reversePipe: ReversePipe) {
    this.pageNumber = 0;
    this.newsLetterFiltered = [];
    this.isNewsLetterLoading = true;
    this.isDeleteAlertHide = null;
  }

  ngOnInit() {
    this.Subcription = this.adservice.getNewsLetter().subscribe(newsletter => {
      this.newLetterModel = this.newsLetterFiltered = newsletter
      this.isNewsLetterLoading = false;
    });
  }
  filtered(query: string) {
    this.reversePipe.transform(this.newsLetterFiltered = (query) ? this.newLetterModel.filter(f => f.email.toLowerCase().includes(query.toLowerCase()))
      : this.newLetterModel);
  }
  deleteNewsletter(key) {
    if (confirm("Are you sure to delete?")) {
      this.autoGenerateId = this.adservice.deleteNewsletter(key);
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
  closeDeleteAlert(): void {
    this.isDeleteAlertHide = null;
  }
  ngOnDestroy() {
    this.Subcription.unsubscribe();
  }

}
