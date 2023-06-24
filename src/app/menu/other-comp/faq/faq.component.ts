import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent {

  my_card_list=[
    {title:'MyTeam11 Account',icon:'https://mt11-html-images.s3.ap-south-1.amazonaws.com/id-card.svg',content:'Registering Account, Using MyTeam11 & more.'},
    {title:'Playing on MyTeam11',icon:'https://mt11-html-images.s3.ap-south-1.amazonaws.com/how-to-play.svg',content:'Choosing Players, Creating Team & more.'},
    {title:'Scores and Points',icon:'https://mt11-html-images.s3.ap-south-1.amazonaws.com/points-ranking-system.svg',content:'Anything & Everything About Points System.'},
    {title:'Rematch',icon:'https://d2dff8b7n2b8d5.cloudfront.net/myteam11web/rematchChalang.svg',content:'Play Again, Settle Score & Win Big!'},
    {title:'Live Fantasy',icon:'https://d2dff8b7n2b8d5.cloudfront.net/mt11web/live_fantsy.svg',content:'Live Fantasy, 2nd Innings, rewards & more'},
    {title:'Contests',icon:'https://mt11-html-images.s3.ap-south-1.amazonaws.com/announcements.svg',content:'Winners, Contest Types & More.'},
    {title:'Cash Prizes',icon:'https://mt11-html-images.s3.ap-south-1.amazonaws.com/coins.svg',content:'All About Your Winnings!'},
    {title:'Account Balance',icon:'https://mt11-html-images.s3.ap-south-1.amazonaws.com/my-transactions.svg',content:'How to Earn & Use MyTeam11 Account Balance.'},
    {title:'Verification',icon:'https://mt11-html-images.s3.ap-south-1.amazonaws.com/verification.svg',content:'How to be a verified MyTeam11 Member.'},
    {title:'Withdrawals',icon:'https://mt11-html-images.s3.ap-south-1.amazonaws.com/withdrawals.svg',content:'Raising a Request, Crediting your withdrawals & more.'},
    {title:'Legality',icon:'https://mt11-html-images.s3.ap-south-1.amazonaws.com/auction.svg',content:'How is MyTeam11 legal?'},
    {title:'FairPlay Violation',icon:'https://mt11-html-images.s3.ap-south-1.amazonaws.com/fair-play.svg',content:'Things we don’t approve of'},
    {title:'Payment',icon:'https://mt11-html-images.s3.ap-south-1.amazonaws.com/payment.svg',content:'Payments on MyTeam11 & much more'},
  ]
}
