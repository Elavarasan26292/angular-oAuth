import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectApplicationComponent } from './select-application/select-application.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: SelectApplicationComponent},
  {path: 'oauth',loadChildren: () => import('./o-auth/o-auth.module').then(m => m.OAuthModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }  