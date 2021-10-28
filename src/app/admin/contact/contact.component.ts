import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminserviceService } from '../../services/adminservice.service';
import { Subscription } from 'rxjs/Subscription';
import { ReversePipe } from 'ngx-pipes';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [ReversePipe]
})
export class ContactComponent implements OnInit, OnDestroy {
  Contacts: { phone: string }[];
  Subcription: Subscription;
  contactFiltered: any[];
  pageNumber: number;
  isContactLoading: boolean;
  isDeleteAlertHide: boolean;
  autoGenerateId: any;
  constructor(private adservice: AdminserviceService, public reversePipe: ReversePipe) {
    this.pageNumber = 0;
    this.contactFiltered = [];
    this.isContactLoading = true;
    this.isDeleteAlertHide = null;
  }
  ngOnInit() {
    this.Subcription = this.adservice.getContact().subscribe(contact => {
      this.Contacts = this.contactFiltered = contact
      this.isContactLoading = false;
    });
  }
  filtered(query: string) {
    this.reversePipe.transform(this.contactFiltered = (query) ? this.Contacts.filter(f => f.phone.toLowerCase().includes(query.toLowerCase()))
      : this.Contacts);
  }
  deleteContact(key) {
    if (confirm("Are you sure to delete?")) {
      this.autoGenerateId = this.adservice.deleteContact(key);
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
