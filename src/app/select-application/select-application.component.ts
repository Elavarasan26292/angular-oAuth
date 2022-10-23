import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-application',
  templateUrl: './select-application.component.html',
  styleUrls: ['./select-application.component.scss']
})
export class SelectApplicationComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  nativetePage(navigateto:string){
    this.router.navigate(navigateto==='google'?['/oauth/googleauth']:['/oauth/msauth']);
  }

}
