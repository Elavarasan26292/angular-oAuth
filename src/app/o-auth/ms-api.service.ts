import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthConfig, OAuthService } from "angular-oauth2-oidc";
import { Observable, Subject } from "rxjs";

export interface UserInfo {
    info:{
      sub:string;
      email:string;
      name:string;
      picture:string;
    }
    }

const oAuthConfig:AuthConfig={
    issuer : "https://login.microsoftonline.com/26d6a9f1-a152-4657-9f18-89222a059a24/v2.0",
    strictDiscoveryDocumentValidation : false,
    redirectUri:window.location.origin+'/oauth/msauth',
    clientId:'',
    scope : "openid profile email Calendars.Read Calendars.Read.Shared AccessReview.Read.All User.Read User.Read.All"
  }

@Injectable({
    providedIn: 'root'
  })
  export class MicrosoftApiService {

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
    console.log("Data Token->",this.oAuthService.getAccessTokenExpiration());
  }

  public getCalendes(): Observable<any> {
    return this.http.get<any>("https://graph.microsoft.com/v1.0/me/calendars",{
      headers:{
        Authorization : "Bearer "+this.oAuthService.getAccessToken(),
      },
    })
  }

  }