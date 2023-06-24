import { Component ,OnInit,OnDestroy} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoaderCompComponent } from 'src/app/loader-comp/loader-comp.component';
import { ApiCallService } from 'src/app/service/api-call.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit,OnDestroy {

  constructor(public router:Router ,private formBulider: FormBuilder, public _apiService: ApiCallService,private dialog: MatDialog){}


 // --- Variable's Declaration ---

  selectedItem: any;
  today=new Date()
  maxdate:any=new Date(
    this.today.getFullYear()-18,
    this.today.getMonth(),
    this.today.getDate()
    )  
  bgImage:string='https://www.myteam11.com/fantasy-sports/assets/images/cricket_empty.png'

  account_options_list=[
    {title:'Refer & Earn',icon:'bi bi-people-fill',path:'/menu/refer-n-earn'},
    {title:'Golden Ticket',icon:'bi bi-ticket-detailed',path:'/menu/golden-ticket'},
    {title:'Leaderboard',icon:'bi bi-flag',path:'/menu/series-leaderboard'},
    {title:'Favourite Contest',icon:'bi bi-bookmark-heart',path:'/menu/favourite-contest'},
    {title:'Feedback',icon:'bi bi-chat-text',path:'/menu/feedback'},
    {title:'Support',icon:'bi bi-headset',path:'/menu/support'},
 
  ]

  menuOptions=[
    {name:'Home',logo:'bi bi-house-door-fill',link:'home' ,url:'/menu/home'},
    {name:'My Contests',logo:'bi bi-ticket-perforated-fill',link:'contests',url:'/menu/contests'},
    {name:'Wallet',logo:'bi bi-wallet',link:'wallet',url:'/menu/wallet'},
    {name:'More',logo:'bi bi-three-dots-vertical',link:'more',url:'/menu/more'}
  ]


// --- Function's Declaration ---
  ngOnDestroy(): void {
    this.dialog.closeAll()
  }

  ngOnInit(): void {

    // this.check_User_details_form()

  }

//   check_User_details_form() {
  
      
//     this._apiService.checkuserdetails().subscribe({next:(data:any)=>{

//       this.walletbalance=Math.floor(data[0].walletamaount)
//       this.userimage=data[0].image      
      // this.user_all_details=data[0]
//     }})
// }

  backbutton(){
    this.router.navigate(['menu/wallet'])
  }
  
  typeOfSports(event:any, newValue:any){
    // console.log(newValue);
    this.selectedItem = newValue;
  //  event.classList.add('active');
  }





  previousPage(){
    history.go(-1)
  }

}
