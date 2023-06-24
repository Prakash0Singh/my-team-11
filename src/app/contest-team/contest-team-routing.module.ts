import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContestTeamComponent } from './contest-team.component';
import { TeamPlayersComponent } from './team-players/team-players.component';
import { TournamentsComponent } from './tournaments/tournaments.component';
import { SaveTeamComponent } from './save-team/save-team.component';
import { TeamListComponent } from './team-list/team-list.component';
import { JoinedTeamComponent } from './joined-team/joined-team.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { CompLeaderboardComponent } from './comp-leaderboard/comp-leaderboard.component';
import { ContestLeaderboardComponent } from './contest-leaderboard/contest-leaderboard.component';

const routes: Routes = [
  { path: '',component:ContestTeamComponent,children:[
    {path:'tournaments/:id',component:TournamentsComponent},
    {path:'team-players/:id',component:TeamPlayersComponent},
    {path:'save-team/:id',component:SaveTeamComponent},
    {path:'team-list/:id',component:TeamListComponent},
    {path:'joined-list/:id',component:JoinedTeamComponent},
    {path:'result-lead/:id/:matchid',component:CompLeaderboardComponent},
    {path:'contest-leaderboard/:id/:matchid',component:ContestLeaderboardComponent},
    {path:'leaderboard/:id',component:LeaderboardComponent},
    // {path:'demolayout',component:TeamLayoutComponent},
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContestTeamRoutingModule { }
