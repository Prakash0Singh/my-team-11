import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderCompComponent } from 'src/app/loader-comp/loader-comp.component';
import { ApiCallService } from 'src/app/service/api-call.service';
import { ContestApiService } from 'src/app/service/contest-api.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent {
  contestsList: any;
  matchTitle: any;
  challenge_id: any | null;
  currentData: any;
  view=false
  my_team:any[]=[];
  currTeam: any;
  matchId: any;
  teamslist: any;
  mytotal_teams=0;
  show_create_team=false
  show_spinner_on_modal=false
  new_team_switch_id=0
  @ViewChild('openModal') openModal!: ElementRef
  player_info: any;
  
  constructor(private activatedroute:ActivatedRoute,public route:Router,private _conteastapi:ContestApiService,private matdialog:MatDialog){}

  ngOnInit(): void {
    this.matdialog.open(LoaderCompComponent)

    this.challenge_id=this.activatedroute.snapshot.paramMap.get('id')    
    this.activatedroute.queryParams.subscribe(params => {
      this.matchId=params['matchid']
      this.teamslist=params['team']
    })

    let currTeam=JSON.parse(localStorage.getItem('currTeam')||'')
    this.matchTitle=currTeam

    this.api_call();
  }

  api_call() {
    this._conteastapi.getleaugesdetails(this.challenge_id).subscribe({
      next:(data:any)=>{
        this.currentData=data[0]
        this.contestsList=data[0].jointeams
        data[0].jointeams.filter((user_team:any)=>{
          if(user_team.usernumber>0)
          {
            this.mytotal_teams++;
          }
        })
        // this.mytotal_teams=this.contestsList.length;
      },error:(err:any)=>{
        this._conteastapi.snackMessage('Error Occour On API Call')
      },complete:()=>{
        this.matdialog.closeAll();
      }
    }
    )
}

  showTeam(para:any,user_no:any){
    console.log(user_no);
    this.currTeam=para
    if(user_no>0){
      this.view=true;
    this._conteastapi.viewteam(para).subscribe({
      next:(data:any)=>{
        console.log(data);
        const my_data=data;

        // Team view-edited code here
    let unique_value=[...new Set(my_data.map((x:any)=>x.role))]

    const transactions:any=[]
    let list:any[]=[]

    unique_value.filter((titles:any,index:number)=>{
      list=[]
      my_data.filter((data:any,index:number)=>{ 
        if (titles==data.role) {
          list.push(data)
        }
      })
    
      transactions.push({title:titles,list:list})
      
    })
    console.log(transactions);
    this.my_team=transactions
    // Team view-edited code here
      },
      complete:()=>{
        
      }
    }
   )
  }
    else{
      this._conteastapi.snackMessage(`Hold Up! Please wait till match starts.`)
    }
  }


  switchuserteam(data:any,event:Event){
    console.log(this.mytotal_teams);
    event.stopPropagation();

    this.view=false
    console.log('Switching team Number',data.teamnumber);
    console.log(this.matchId);
    this._conteastapi.myteamlist(this.matchId).subscribe({next:(res:any)=>{
      console.log(res);
      if (res.length==1 || res.length==this.mytotal_teams) {
        this._conteastapi.snackMessage(`Create a new team for switch team. `)
        this.new_team_switch_id=data.jid
        this.show_create_team=true
        console.log(data.jid);
      }
      else{
        this.show_create_team=false
        this.route.navigate(['contest-team/team-list',this.matchId],{queryParams:{id:this.challenge_id,joinid:data.jid}})
      }
    }})
  }

  goingBack(){
    history.go(-1)
  }

  user_info_modal(playerid:number){
    this.show_spinner_on_modal=true
    this.openModal.nativeElement.click();
    this.player_info={}
    this._conteastapi.getplayerinfo(playerid,this.matchId).subscribe(
      {
        next:(res:any)=>{
          console.log(res);
          this.player_info=res[0]
        },
        complete:()=>{
          this.show_spinner_on_modal=false
        }
      }
      )
  }
}
