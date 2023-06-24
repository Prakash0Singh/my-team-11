import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContestsComponent } from './contests/contests.component';
import { HomeComponent } from './home/home.component';
import { MoreComponent } from './more/more.component';
import { WalletComponent } from './wallet/wallet.component';
import { IntroComponent } from './intro/intro.component';
import { AddcashComponent } from './addcash/addcash.component';
import { NotifyComponent } from './notify/notify.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { UserDetailsFormComponent } from './user-details-form/user-details-form.component';
import { AboutUsComponent } from './other-comp/about-us/about-us.component';
import { FaqComponent } from './other-comp/faq/faq.component';
import { HowPlayComponent } from './other-comp/how-play/how-play.component';
import { LegalitiesComponent } from './other-comp/legalities/legalities.component';
import { PointSysComponent } from './other-comp/point-sys/point-sys.component';
import { PrivacyPolicyComponent } from './other-comp/privacy-policy/privacy-policy.component';
import { TCComponent } from './other-comp/t-c/t-c.component';
import { TutorialComponent } from './other-comp/tutorial/tutorial.component';
import { GoldenTicketComponent } from './wallet-comp/golden-ticket/golden-ticket.component';
import { RedeemCouponComponent } from './wallet-comp/redeem-coupon/redeem-coupon.component';
import { ScratchCardComponent } from './wallet-comp/scratch-card/scratch-card.component';
import { WithdrawMoneyComponent } from './wallet-comp/withdraw-money/withdraw-money.component';
import { FavContestComponent } from './profile-comp/fav-contest/fav-contest.component';
import { FeedbackComponent } from './profile-comp/feedback/feedback.component';
import { ReferCodeComponent } from './profile-comp/refer-code/refer-code.component';
import { SeriesLeaderboadComponent } from './profile-comp/series-leaderboad/series-leaderboad.component';
import { SupportComponent } from './profile-comp/support/support.component';
import { ProfileMoreComponent } from './profile-more/profile-more.component';


const routes: Routes = [
  {
    path: '', component: IntroComponent, 
    children: [
      { path: '', redirectTo:'home', pathMatch:'full' },
      { path: 'home', component: HomeComponent },
      { path: 'contests', component: ContestsComponent },
      { path: 'wallet', component: WalletComponent },
      { path: 'more', component: MoreComponent },
      { path: 'addcash', component: AddcashComponent },
      { path: 'notify', component: NotifyComponent },
      { path: 'transactions', component: TransactionsComponent },
      { path:'fill-form',component:UserDetailsFormComponent},

      { path:'about-us',component:AboutUsComponent},
      { path:'faq',component:FaqComponent},
      { path:'how-to-play',component:HowPlayComponent},
      { path:'legalities',component:LegalitiesComponent},
      { path:'points-system',component:PointSysComponent},
      { path:'privacy-policy',component:PrivacyPolicyComponent},
      { path:'t&c',component:TCComponent},
      { path:'tutorial',component:TutorialComponent},

      { path:'scratch-card',component:ScratchCardComponent},
      { path:'golden-ticket',component:GoldenTicketComponent},
      { path:'withdraw-money',component:WithdrawMoneyComponent},
      { path:'redeem-coupon',component:RedeemCouponComponent},
      
      { path:'refer-n-earn',component:ReferCodeComponent},
      { path:'series-leaderboard',component:SeriesLeaderboadComponent},
      { path:'favourite-contest',component:FavContestComponent},
      { path:'feedback',component:FeedbackComponent},
      { path:'support',component:SupportComponent},
      
      { path:'my-profile',component:ProfileMoreComponent},
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
