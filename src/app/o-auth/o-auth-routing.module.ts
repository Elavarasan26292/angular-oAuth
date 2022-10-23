import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoogleSigninComponent } from './google-signin/google-signin.component';
import { MicrosoftSigninComponent } from './microsoft-signin/microsoft-signin.component';

const routes: Routes = [
  {
    path: 'googleauth',
    component: GoogleSigninComponent
  }, {
    path: 'msauth',
    component: MicrosoftSigninComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OAuthRoutingModule { }