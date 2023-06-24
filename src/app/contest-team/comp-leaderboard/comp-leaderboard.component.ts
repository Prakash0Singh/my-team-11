import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderCompComponent } from 'src/app/loader-comp/loader-comp.component';
import { ContestApiService } from 'src/app/service/contest-api.service';

@Component({
  selector: 'app-comp-leaderboard',
  templateUrl: './comp-leaderboard.component.html',
  styleUrls: ['./comp-leaderboard.component.css']
})
export class CompLeaderboardComponent implements OnInit,OnDestroy {
  
  contestsList: any;
  matchTitle: any;
  challenge_id: any | null;
  currentData: any;
  view=false
  my_team:any[]=[];
  currTeam: any;
  matchId: any;
  teamslist: any;
  matchKey: any;
  match_data: any;
  show_spinner_on_modal=false
  
  @ViewChild('openModal') openModal!: ElementRef
  player_info: any;

  constructor(private activatedroute:ActivatedRoute,public route:Router,private _conteastapi:ContestApiService,private matdialog:MatDialog){}


  ngOnInit(): void {

    this.matdialog.open(LoaderCompComponent)

    this.challenge_id=this.activatedroute.snapshot.paramMap.get('id')  
    this.matchKey=this.activatedroute.snapshot.paramMap.get('matchid')
      
    this._conteastapi.getleaderboard_challenge(this.challenge_id).subscribe({
      next:(data:any)=>{
        this.contestsList=data
      },error:(err:any)=>{
        this.matdialog.closeAll()
        this._conteastapi.snackMessage('Error Occour On API Call')
        
      }
      ,
      complete:()=>{
        this.leaugesdetails();
      }
    }
    )
  
    let currTeam=JSON.parse(localStorage.getItem('currTeam')||'')
    this.matchTitle=currTeam
  }

  leaugesdetails(){
    this._conteastapi.getleaugesdetails(this.challenge_id).subscribe({
      next:(data:any)=>{
        this.currentData=data[0]
      },
      complete:()=>{
        this.livescores()
      }
    }
   )
  }

  livescores() {
    this._conteastapi.getlivescores(this.matchKey).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.match_data=res
      },
      complete:()=>{
        this.matdialog.closeAll()
      }
  })
  }
  
  showTeam(para:any){
    this.matdialog.open(LoaderCompComponent)

    console.log(para);
    this.currTeam=para
    
      this.view=true;
    this._conteastapi.viewteam(para).subscribe({
    next: (data:any)=>{
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
    },error:(err:any)=>{
      this.matdialog.closeAll()
      this._conteastapi.snackMessage('Error Occour On API Call')
    }
    ,
    complete:()=>{
      this.matdialog.closeAll()
    }
     })

  }

  user_info_modal(playerid:number){

    this.show_spinner_on_modal=true
    this.openModal.nativeElement.click();
    this.player_info={}
    this._conteastapi.getplayerinfo(playerid,this.matchKey).subscribe(
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

  ngOnDestroy(): void {
    this.matdialog.closeAll();
  }
  
}
