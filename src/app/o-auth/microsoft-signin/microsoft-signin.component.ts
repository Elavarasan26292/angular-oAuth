import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MicrosoftApiService, UserInfo } from '../ms-api.service';

@Component({
  selector: 'app-microsoft-signin',
  templateUrl: './microsoft-signin.component.html',
  styleUrls: ['./microsoft-signin.component.scss']
})
export class MicrosoftSigninComponent implements OnInit {

  userinfo?:UserInfo;
  title = 'angular-oAuth-Microsoft';
  calenders:any;

  constructor(private readonly googleApi:MicrosoftApiService,
    private readonly router:Router) {
    googleApi.userProfileSubject.subscribe(info=>{
      this.userinfo=info;
    })
   }

  ngOnInit(): void {
  }

  isLoggedin():boolean{
    return this.googleApi.isLoggedIn();
  }

  signOut(){
    this.googleApi.signOut();
    this.router.navigate(['/home']);
  }

  revokeAccess(){
    this.googleApi.signOutandrevokeAccess();
    this.router.navigate(['/home']);
  }

  printUserDetails(){
    this.googleApi.printDetails();
    // this.getTokenInfo();
  }

  getCalenderList(){
    this.googleApi.getCalendes().subscribe(data=>{
      console.log("The calenders available is",data);
      this.calenders=data;
    });
  }

}
