import { Injectable } from '@angular/core';
import { OAuthService,AuthConfig  } from "angular-oauth2-oidc";
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const oAuthConfig:AuthConfig={
  issuer : "https://accounts.google.com",
  strictDiscoveryDocumentValidation : false,
  redirectUri:window.location.origin+'/oauth/googleauth',
  clientId:'',
  scope : "openid profile email https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/calendar.readonly"
}

export interface UserInfo {
info:{
  sub:string;
  email:string;
  name:string;
  picture:string;
}
}

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {

  userProfileSubject = new Subject<UserInfo>()


  constructor(private readonly oAuthService:OAuthService,
    private readonly http:HttpClient) { 
    oAuthService.configure(oAuthConfig)
    oAuthService.loadDiscoveryDocument().then(()=>{
      oAuthService.tryLoginImplicitFlow().then(()=>{
        if(!oAuthService.hasValidAccessToken()){
          oAuthService.initCodeFlow();
        }else{
          oAuthService.loadUserProfile().then((userProfile)=>{
              console.log(JSON.parse(JSON.stringify(userProfile)));
              this.userProfileSubject.next(userProfile as UserInfo)
          })
        }
      })
    })
  }

  isLoggedIn():boolean{
    return this.oAuthService.hasValidAccessToken();
  }

  signOut(){
    this.oAuthService.logOut();
  }

  signOutandrevokeAccess(){
    this.oAuthService.revokeTokenAndLogout();
  }



  printDetails(){
    console.log(this.oAuthService.clientId);
    console.log("Accesstoken->",this.oAuthService.getAccessToken());
    // console.log("RefreshToken->",this.oAuthService.refreshToken());
  }

  public getCalendes(): Observable<any> {
    return this.http.get<any>("https://www.googleapis.com/calendar/v3/users/me/calendarList",{
      headers:{
        Authorization : "Bearer "+this.oAuthService.getAccessToken(),
      },
    })
  }



  public getCalenderEvents(calenderId:string): Observable<any> {
    // ?timeMin=2022-10-14T10:00:00Z&timeMax=2022-12-03T10:00:00Z
    return this.http.get<any>("https://www.googleapis.com/calendar/v3/calendars/"+calenderId+"/events",{
      headers:{
        Authorization : "Bearer "+this.oAuthService.getAccessToken(),
      },
    })
  }


  public getTokenInfo(): Observable<any> {
    return this.http.get<any>("https://www.googleapis.com/oauth2/v1/tokeninfo?access_token="+this.oAuthService.getAccessToken(),{
      headers:{
        Authorization : "Bearer "+this.oAuthService.getAccessToken(),
      },
    })
  }
}
