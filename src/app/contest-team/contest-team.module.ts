import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContestTeamRoutingModule } from './contest-team-routing.module';
import { ContestTeamComponent } from './contest-team.component';

import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ToastrModule } from 'ngx-toastr';
import {MatSnackBarModule} from '@angular/material/snack-bar'
import { RouterModule } from '@angular/router';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import { TeamPlayersComponent } from './team-players/team-players.component';
import { TournamentsComponent } from './tournaments/tournaments.component';
import { SaveTeamComponent } from './save-team/save-team.component';
import { TeamListComponent } from './team-list/team-list.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule } from '@angular/material/core';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { TeamLayoutComponent } from './team-layout/team-layout.component';
import { JoinedTeamComponent } from './joined-team/joined-team.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { CompLeaderboardComponent } from './comp-leaderboard/comp-leaderboard.component';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { BalanceModalComponent } from './balance-modal/balance-modal.component';
import {MatSortModule} from '@angular/material/sort';
import { SortUsersPipe } from '../sort-users.pipe';
import { ContestLeaderboardComponent } from './contest-leaderboard/contest-leaderboard.component';
import { CustomPipePipe } from '../custom-pipe.pipe';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    ContestTeamComponent,
    TeamPlayersComponent,
    TournamentsComponent,
    SaveTeamComponent,
    TeamListComponent,
    TeamLayoutComponent,
    JoinedTeamComponent,
    LeaderboardComponent,
    CompLeaderboardComponent,
    BalanceModalComponent,
    SortUsersPipe,
    CustomPipePipe,
    ContestLeaderboardComponent,

  ],
  imports: [ClipboardModule,MatSortModule,MatProgressSpinnerModule,
    CommonModule,MatIconModule,MatSidenavModule,MatSelectModule,MatTabsModule,MatCardModule,MatFormFieldModule,MatButtonModule,MatInputModule,MatSnackBarModule,MatBottomSheetModule,MatDialogModule,
    ContestTeamRoutingModule,RouterModule,MatProgressBarModule,MatTooltipModule,ToastrModule,MatDatepickerModule,MatNativeDateModule, ToastrModule.forRoot(
      {timeOut: 1000,
        positionClass: 'toast-top-right',
        preventDuplicates:true,
        autoDismiss:true,
        maxOpened:1,
        newestOnTop:true
      })
  ],
  
})
export class ContestTeamModule { }
