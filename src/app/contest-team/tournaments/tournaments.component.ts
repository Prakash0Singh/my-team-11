import { Component, OnInit,OnDestroy } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCallService } from 'src/app/service/api-call.service';
import { BalanceModalComponent } from '../balance-modal/balance-modal.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoaderCompComponent } from 'src/app/loader-comp/loader-comp.component';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit,OnDestroy{
  contestsList: any[]=[];
  matchTitle:any;
  matchId: any ='';
  AllMatchAmonutList:boolean=true;
  myNumber=0;
  join_team_id: any;
  filter_tournament_Values: any[]=[];
  mytournaments_list:any[]=[]
  show_home_button_empty_msg: boolean=false;

  constructor(private activatedroute:ActivatedRoute,private _apiService: ApiCallService,public route:Router,private matbottomSheet:MatBottomSheet,private matdialog:MatDialog){}

  ngOnDestroy(): void {
    this.matdialog.closeAll()

  }
  ngOnInit(): void {
    
      this.matdialog.open(LoaderCompComponent)

    this.matchId=this.activatedroute.snapshot.paramMap.get('id') 

    this._apiService.getcontest(this.matchId).subscribe({next:(res:any)=>{

      this.contestsList=res
       
      let unique_value=[...new Set(res.map((x:any)=>x.catname))]

      const tournaments:any=[]
      let list:any[]=[]

      unique_value.filter((titles:any,index:number)=>{
        list=[]
        res.filter((data:any,index:number)=>{ 
          if (titles==data.catname) {
            list.push(data)
          }
        })
      
        tournaments.push({title:titles,matches:list})
        
      })
      // console.log(tournaments);
      this.mytournaments_list=tournaments
    } ,error:(err:any)=>{
      this.matdialog.closeAll()
      this._apiService.snackMessage('Error Occour On API Call')
    },
    complete:()=>{
      
      this.matdialog.closeAll()

      if (!(this.contestsList.length)) {
        this.show_home_button_empty_msg=true
      }
    }
  })

    let currTeam=JSON.parse(localStorage.getItem('currTeam')||'')
    this.matchTitle=currTeam
    

    this.mycreatedTeams()
  }

  mycreatedTeams()
  {        

    this._apiService.myteamlist(this.matchId).subscribe({next:(res:any)=>{
      console.log(res);
      if (res.length) {
        this.join_team_id=res[0]?.teamid
          console.log(this.join_team_id);
          this.myNumber=res.length
      }
    }}
    )
  }

  goingBack(){
    this.AllMatchAmonutList=false;
    // history.go(-1)
    this.route.navigate(['menu'])
  }

  showTeam(i:any,event:Event){
    event.stopPropagation();

    console.log("YOu Clicked Here");

      if(this.myNumber==1){
        console.log(i);
        this.matbottomSheet.open(BalanceModalComponent,{data:{challenge_id:i.id,teams:this.myNumber,matchid:this.matchId,teamno:this.join_team_id}})
      }
      else if (this.myNumber==0) {
        this.route.navigate(['/contest-team/team-players',this.matchId],{ queryParams: {id:i.id} })
      }
      else if (this.myNumber>1){
        this._apiService.myjoinedteamsapi(this.matchId).subscribe({next:(res:any)=>{
          console.log(res);
         let boolean= res.find((e: any) => e.challenge_id== i.id )
          if (boolean==undefined) {
            console.log('Not Found');
            console.log(i.id);
            this.route.navigate(['/contest-team/team-list',this.matchId],{ queryParams: {id:i.id} })
          }
          else{
            console.log(boolean.joinid,'Found');
            this.route.navigate(['/contest-team/team-list',this.matchId],{ queryParams: {id:i.id,team:boolean.joinid} })
          }
        }})
      }
  }
  createTeam(){
    this.route.navigate(['/contest-team/team-players',this.matchId])
  }
  showmyteamlist(){
    this.route.navigate(['/contest-team/team-list',this.matchId])
  }

  gotoleaderboard(id:any){

  this.route.navigate(['contest-team/contest-leaderboard',id,this.matchId])

  }
}

