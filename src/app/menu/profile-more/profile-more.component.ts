import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-more',
  templateUrl: './profile-more.component.html',
  styleUrls: ['./profile-more.component.css']
})
export class ProfileMoreComponent {

  constructor(public router:Router){}

  logoutUser(){
    localStorage.clear();
    this.router.navigate(['/user-login'])
  }

}
