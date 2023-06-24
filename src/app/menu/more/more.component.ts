import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.css']
})
export class MoreComponent {

  constructor(public router:Router){}
 // --- Variable's Declaration ---

  moreitemlist:any[]=[
    {title:'About Us',logo:'https://www.myteam11.com/fantasy-sports/assets/images/myteam11_icon.svg',path:'/menu/about-us'},
    {title:'MyTeam11 Blog',logo:'https://www.myteam11.com/fantasy-sports/assets/images/blog.svg',path:'/menu/faq'},
    {title:'How to Play',logo:'https://www.myteam11.com/fantasy-sports/assets/images/how_play.svg',path:'/menu/how-to-play'},
    {title:'Fantasy Point System',logo:'https://www.myteam11.com/fantasy-sports/assets/images/point_sys.svg',path:'/menu/points-system'},
    {title:'Tutorial',logo:'https://www.myteam11.com/fantasy-sports/assets/images/tutorial.svg',path:'/menu/tutorial'},
    {title:`FAQ's`,logo:'https://www.myteam11.com/fantasy-sports/assets/images/faq.svg',path:'/menu/faq'},
    {title:'Terms & Conditions',logo:'https://www.myteam11.com/fantasy-sports/assets/images/trems.svg',path:'/menu/t&c'},
    {title:'Privacy Policy',logo:'https://www.myteam11.com/fantasy-sports/assets/images/privacy-policy.svg',path:'/menu/privacy-policy'},
    {title:'Legalities',logo:'https://www.myteam11.com/fantasy-sports/assets/images/legalitie.svg',path:'/menu/legalities'},
  ]

  myFunction() {
    location.replace("https://blog.myteam11.com/")
  }
}
