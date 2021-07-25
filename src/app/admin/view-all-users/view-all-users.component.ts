import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from '../../services/adminservice.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ReversePipe } from 'ngx-pipes';
@Component({
  selector: 'app-view-all-users',
  templateUrl: './view-all-users.component.html',
  styleUrls: ['./view-all-users.component.css'],
  providers: [ReversePipe]
})
export class ViewAllUsersComponent implements OnInit {
  Users: { user_id: string }[];
  id : any;
  filteredUser: any[];
  Subcription: Subscription;
  Hidden: boolean;
  pageNumber: number;
  searchText: string;
  isUserLoading: boolean;
  constructor(private adservice: AdminserviceService,
    private route: ActivatedRoute,
    public reversePipe: ReversePipe) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.pageNumber = 0;
    this.searchText = "";
    this.filteredUser = [];
    this.isUserLoading = true;
  }
  ngOnInit() {
    this.Subcription = this.adservice.getUsers().subscribe(Users => {
      this.Users = this.filteredUser = Users
      this.isUserLoading = false;
    });
  }
  filteredUserById(query) {
    this.reversePipe.transform(this.filteredUser = (query) ? this.Users.filter(f => f.user_id.toLowerCase().includes(query.toLowerCase())) :
      this.Users);
  }
  delete(key) {
    if (confirm("Are you sure to delete?")) {
      this.adservice.deleteUser(key);
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
