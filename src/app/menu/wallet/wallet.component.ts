import { Component ,OnInit} from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoaderCompComponent } from 'src/app/loader-comp/loader-comp.component';
import { ApiCallService } from 'src/app/service/api-call.service';
import { RedeemCouponComponent } from '../wallet-comp/redeem-coupon/redeem-coupon.component';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit{
  
  constructor( public _apiService: ApiCallService,public router:Router,private matbottomSheet:MatBottomSheet){}

// --- Variable's Declaration ---

  walletList:any[]=[
    {title:'Scratch Card',info:'Check your scratched rewards here',logo:'https://www.myteam11.com/fantasy-sports/assets/images/nc_scratchcard.svg',path:'/menu/scratch-card'},
    {title:'Golden Ticket',info:'Your ticket to exclusive discounts & entries',logo:'https://www.myteam11.com/fantasy-sports/assets/images/ic_golden_ticket.svg',path:'/menu/golden-ticket'},
    {title:'Withdraw Money',info:'Verify your Account First',logo:'https://www.myteam11.com/fantasy-sports/assets/images/ic_withdraw_money_gray.svg',path:'/menu/withdraw-money'},
    {title:'Redeem Coupon',info:'Redeem your MyTeam11 Coupon',logo:'https://www.myteam11.com/fantasy-sports/assets/images/ic_redeem_coupon.svg',path:'/menu/redeem-coupon'},
  ]

// --- Function's Declaration ---

  ngOnInit(): void {
    // this.dialog.open(LoaderCompComponent)

    // this._apiService.checkuserdetails().subscribe({next:(data:any)=>{
    //   this.dialog.closeAll()
    //   this.userValue=data[0]
    //   console.log(this.userValue);
    // }})
  }
  
  ngOnDestroy(): void {
    // this.dialog.closeAll()
  }

  addmorecash(){
    localStorage.setItem('totalbalance',this._apiService.user_details?.walletamaount)
    this.router.navigate(['menu/addcash'])
  }

  myFunction(){
    console.log("It Works");
    this.matbottomSheet.open(RedeemCouponComponent)
  }
}
