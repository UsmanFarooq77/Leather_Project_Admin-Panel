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
  Hidden: boolean;
  Subcription: Subscription;
  contactFiltered: any[];
  pageNumber: number;
  isContactLoading: boolean;
  constructor(private adservice: AdminserviceService, public reversePipe: ReversePipe) {
    this.pageNumber = 0;
    this.contactFiltered = [];
    this.isContactLoading = true;
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
      this.adservice.deleteContact(key);
      this.Hidden = true;
    }
    else {
      this.Hidden = false;
    }
  }
  ngOnDestroy() {
    this.Subcription.unsubscribe();
  }
}
