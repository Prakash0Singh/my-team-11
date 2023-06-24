import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContestApiService } from 'src/app/service/contest-api.service';
import { BalanceModalComponent } from '../balance-modal/balance-modal.component';
import { ApiCallService } from 'src/app/service/api-call.service';
import { LoaderCompComponent } from 'src/app/loader-comp/loader-comp.component';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-contest-leaderboard',
  templateUrl: './contest-leaderboard.component.html',
  styleUrls: ['./contest-leaderboard.component.css']
})
export class ContestLeaderboardComponent {
  contestsList: any;
  matchTitle: any;
  challenge_id: any | null;
  currentData: any;
  matchKey: any;
  myNumber=0;

  join_team_id: any;
  
  
  constructor(private activatedroute:ActivatedRoute,public route:Router,private _conteastapi:ContestApiService,private _apiService:ApiCallService,private matdialog:MatDialog,private matbottomSheet:MatBottomSheet){}

  ngOnInit(): void {
    
    this.matdialog.open(LoaderCompComponent)

    this.challenge_id=this.activatedroute.snapshot.paramMap.get('id')  
    this.matchKey=this.activatedroute.snapshot.paramMap.get('matchid')
      
    this._conteastapi.getleaderboard_challenge(this.challenge_id).subscribe({
      next:(data:any)=>{
        // console.log(data);
        this.contestsList=data
      },
      error:(error:any)=>{
        this.matdialog.closeAll()
        this.route.navigate(['menu/home'])
      },
      complete:()=> {

        this._conteastapi.getleaugesdetails(this.challenge_id).subscribe({
          next:  (data:any)=>{
            this.currentData=data[0]
          },
          error:(error:any)=>{
            this.matdialog.closeAll()
            this.route.navigate(['menu/home'])
          },
          complete:()=>{
            this.matdialog.closeAll();
          }
        })
      },
    })

  

    let currTeam=JSON.parse(localStorage.getItem('currTeam')||'')
    this.matchTitle=currTeam

    this.mycreatedTeams();
    console.log(this.matchKey);
  }

  mycreatedTeams()
  {
    this._apiService.myteamlist(this.matchKey).subscribe({next:(res:any)=>{
      if (res.length) {
        this.join_team_id=res[0]?.teamid
          console.log(this.join_team_id);
          this.myNumber=res.length
      }
    },error:(err:any)=>{
      console.log(err);
      this._apiService.snackMessage('Error Occour On API Call')
    }
  }
    )
  }

  showTeam(i:any){

    console.log("YOu Clicked Here");

      if(this.myNumber==1){
        console.log(i);
        this.matbottomSheet.open(BalanceModalComponent,{data:{challenge_id:i.id,teams:this.myNumber,matchid:this.matchKey,teamno:this.join_team_id}})
      }
      else if (this.myNumber==0) {
        this.route.navigate(['/contest-team/team-players',this.matchKey],{ queryParams: {id:i.id} })
      }
      else if (this.myNumber>1){
        this._apiService.myjoinedteamsapi(this.matchKey).subscribe({next:(res:any)=>{
          console.log(res);
         let boolean= res.find((e: any) => e.challenge_id== i.id )
          if (boolean==undefined) {
            console.log('Not Found');
            this.route.navigate(['/contest-team/team-list',this.matchKey],{ queryParams: {id:i.id} })
          }
          else{
            console.log(boolean.joinid,'Found');
            this.route.navigate(['/contest-team/team-list',this.matchKey],{ queryParams: {id:i.id,team:boolean.joinid} })
          }
        }})
      }
  }

  
  
}
