import { Component, OnInit } from '@angular/core';
import { GoogleApiService, UserInfo } from 'src/app/o-auth/google-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-google-signin',
  templateUrl: './google-signin.component.html',
  styleUrls: ['./google-signin.component.scss']
})
export class GoogleSigninComponent implements OnInit {

  userinfo?:UserInfo;
  title = 'angular-oAuth-Google';

  calenders:any;
  calenderEvents:any;

  constructor(private readonly googleApi:GoogleApiService,private readonly router:Router){
    googleApi.userProfileSubject.subscribe(info=>{
      console.log("Data recived",info)
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

  getCalenderList(){
    this.googleApi.getCalendes().subscribe(data=>{
      console.log("The calenders available is",data);
      this.calenders=data;
    });
  }

  getCalenderDetails(calenderId:any){
    this.googleApi.getCalenderEvents(calenderId as any).subscribe(data=>{
      console.log("The calender result is",data);
      this.calenderEvents=data;
    });
  }

  printUserDetails(){
    this.googleApi.printDetails();
    this.getTokenInfo();
  }

  getTokenInfo(){
    this.googleApi.getTokenInfo().subscribe(data=>{
      console.log("The Token result is",data);
    });
  }
}
