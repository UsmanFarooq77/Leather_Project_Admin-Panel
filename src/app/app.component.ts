import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from './components/auth.service';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  isLoginLoading: boolean;
  userName: void;
  isAdmin: boolean;
  admin: firebase.User;
  isGoogleLogin: boolean;
  isFacebookLogin: boolean;
  constructor(public router: Router, public authService: AuthService) {
    this.isLoginLoading = false;
    this.isGoogleLogin = false;
    this.isFacebookLogin = false;
    // this.isAdmin = true;
  }
  ngOnInit() {
    if (localStorage.getItem('google')) {
      this.isGoogleLogin = true;
    }
    if (localStorage.getItem('facebook')) {
      this.isFacebookLogin = true;
    }
    $(document).ready(function () {
      $('#exampleModalCenter').modal('show');
    });
    this.authService.User$.subscribe(admin => {
      if (admin) {
        this.admin = admin;
        this.isAdmin = true;
        // let returnUrl = localStorage.getItem('returnUrl');
        // this.router.navigateByUrl(returnUrl);
        this.hideModel();
        this.router.navigate(['/dashboard']);
      }
      else {
        this.isAdmin = false;
        this.isGoogleLogin = false;
        this.isFacebookLogin = false;
        localStorage.clear();
      }
    })
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  socialLogin(value : string) {
    if (value === 'google') {
      this.isGoogleLogin = true;
      localStorage.setItem('google', value);
    }
    else {
      this.isFacebookLogin = true;
      localStorage.setItem('facebook', value);
    }
    this.authService.login(value);
    // if (this.userName != null || this.userName != undefined) {
    //   this.isLoginLoading = false;
    // }
  }
  hideModel(){
    $(document).ready(function () {
      $('#exampleModalCenter').modal('hide');
    });
  }
  logout() {
    this.isGoogleLogin = false;
    this.isFacebookLogin = false;
    this.isAdmin = false;
    this.authService.logout();
  }
}
