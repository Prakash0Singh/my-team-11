import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { HomeComponent } from './home/home.component';
import { MoreComponent } from './more/more.component';
import { WalletComponent } from './wallet/wallet.component';
import { ContestsComponent } from './contests/contests.component';
// Material
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ToastrModule } from 'ngx-toastr';
import { NgOtpInputModule } from  'ng-otp-input';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CountdownModule } from 'ngx-countdown';
import { IntroComponent } from './intro/intro.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule } from '@angular/material/core';
import { AddcashComponent } from './addcash/addcash.component';
import { NotifyComponent } from './notify/notify.component';
import {MatExpansionModule} from '@angular/material/expansion';

import { TransactionsComponent } from './transactions/transactions.component';
import { UserDetailsFormComponent } from './user-details-form/user-details-form.component';
import { AboutUsComponent } from './other-comp/about-us/about-us.component';
import { HowPlayComponent } from './other-comp/how-play/how-play.component';
import { PointSysComponent } from './other-comp/point-sys/point-sys.component';
import { TutorialComponent } from './other-comp/tutorial/tutorial.component';
import { FaqComponent } from './other-comp/faq/faq.component';
import { TCComponent } from './other-comp/t-c/t-c.component';
import { PrivacyPolicyComponent } from './other-comp/privacy-policy/privacy-policy.component';
import { LegalitiesComponent } from './other-comp/legalities/legalities.component';
import { ScratchCardComponent } from './wallet-comp/scratch-card/scratch-card.component';
import { GoldenTicketComponent } from './wallet-comp/golden-ticket/golden-ticket.component';
import { WithdrawMoneyComponent } from './wallet-comp/withdraw-money/withdraw-money.component';
import { RedeemCouponComponent } from './wallet-comp/redeem-coupon/redeem-coupon.component';
import { ReferCodeComponent } from './profile-comp/refer-code/refer-code.component';
import { SeriesLeaderboadComponent } from './profile-comp/series-leaderboad/series-leaderboad.component';
import { FavContestComponent } from './profile-comp/fav-contest/fav-contest.component';
import { FeedbackComponent } from './profile-comp/feedback/feedback.component';
import { SupportComponent } from './profile-comp/support/support.component';
import { ProfileMoreComponent } from './profile-more/profile-more.component';

@NgModule({
  declarations: [
    HomeComponent,
    MoreComponent,
    WalletComponent,
    ContestsComponent,
    IntroComponent,
    AddcashComponent,
    NotifyComponent,
    TransactionsComponent,
    UserDetailsFormComponent,
    AboutUsComponent,
    HowPlayComponent,
    PointSysComponent,
    TutorialComponent,
    FaqComponent,
    TCComponent,
    PrivacyPolicyComponent,
    LegalitiesComponent,
    ScratchCardComponent,
    GoldenTicketComponent,
    WithdrawMoneyComponent,
    RedeemCouponComponent,
    ReferCodeComponent,
    SeriesLeaderboadComponent,
    FavContestComponent,
    FeedbackComponent,
    SupportComponent,
    ProfileMoreComponent,
  ],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,MatDatepickerModule,MatNativeDateModule,
    MenuRoutingModule,MatTooltipModule,MatProgressBarModule,MatExpansionModule,
    MatIconModule,MatSidenavModule,MatSelectModule,MatTabsModule,MatCardModule,MatFormFieldModule,MatInputModule,MatButtonModule,ToastrModule,NgOtpInputModule,RouterModule,
    ToastrModule.forRoot(
      {timeOut: 1000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
      }),
      CountdownModule
  ],
  // providers:[{provide:HTTP_INTERCEPTORS,useClass:ApiHeadInterceptor,multi : true}]
})
export class MenuModule { }
