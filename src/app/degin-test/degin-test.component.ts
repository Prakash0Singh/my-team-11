import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-degin-test',
  templateUrl: './degin-test.component.html',
  styleUrls: ['./degin-test.component.css']
})
export class DeginTestComponent implements OnInit {
  selectedItem: any;
  bgImage:string='https://www.myteam11.com/fantasy-sports/assets/images/cricket_empty.png'
  constructor(public router:Router){}

  ngOnInit(): void {
    // console.log(this.router.url);
    if (this.router.url=='/menu') {
      this.router.navigate(['/menu/home'])
    }
  }

  typeOfSports(event:any, newValue:any){
    // console.log(newValue);
    this.selectedItem = newValue;
  //  event.classList.add('active');
  }
  myContestSports=[
    {label:'Fixtures',text:'You have not joined any upcoming match contests.'},
    {label:'Live',text:'You have not joined any live matches yet.'},
    {label:'Completed',text:'You have not joined any contests in recently completed matches.'},

  ]

  menuOptions=[
    {name:'Home',logo:'bi bi-house-door-fill',link:'home' ,url:'/menu/home'},
    {name:'My Contests',logo:'bi bi-ticket-perforated-fill',link:'contests',url:'/menu/contests'},
    {name:'Wallet',logo:'bi bi-wallet-fill',link:'wallet',url:'/menu/wallet'},
    {name:'More',logo:'bi bi-three-dots-vertical',link:'more',url:'/menu/more'}
  ]

  showBackgroundImage(event:any){
    console.log(event.target.value);
    if (event.target.value=='football') {
      this.bgImage='https://www.myteam11.com/fantasy-sports/assets/images/football_empty.png'
    }
    else if(event.target.value=='basketball')
    {
      this.bgImage='https://www.myteam11.com/fantasy-sports/assets/images/nba_empty.png'
    }
    else if(event.target.value='cricket'){
      this.bgImage='https://www.myteam11.com/fantasy-sports/assets/images/cricket_empty.png'
    }
  }
  logoutUser(){
    localStorage.clear();
    this.router.navigate(['/user-login'])
  }

}
