import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleSigninComponent } from './google-signin/google-signin.component';
import { MicrosoftSigninComponent } from './microsoft-signin/microsoft-signin.component';
import { OAuthRoutingModule } from './o-auth-routing.module';
import { GoogleApiService } from './google-api.service';
import { MicrosoftApiService } from './ms-api.service';


@NgModule({
  imports: [
    CommonModule,
    OAuthRoutingModule,
  ],
  declarations: [GoogleSigninComponent,MicrosoftSigninComponent],
  providers:[GoogleApiService,MicrosoftApiService]
})
export class OAuthModule { }