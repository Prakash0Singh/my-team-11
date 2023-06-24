import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ContestApiService } from 'src/app/service/contest-api.service';
import {Clipboard} from '@angular/cdk/clipboard';
import { LoaderCompComponent } from 'src/app/loader-comp/loader-comp.component';
@Component({
  selector: 'app-joined-team',
  templateUrl: './joined-team.component.html',
  styleUrls: ['./joined-team.component.css']
})
export class JoinedTeamComponent implements OnInit,OnDestroy {

  @ViewChild('callAPIDialog') callAPIDialog!: TemplateRef<any>; 
  
  
  matchId: any ;
  contestsList: any;
  matchTitle: any;
  joinedtournaments: any;
  inviteCode: any;
  status: any;

  constructor(private activatedroute:ActivatedRoute,private _contestService: ContestApiService,public route:Router,private dialog: MatDialog,private clipboard: Clipboard){}
  
  ngOnDestroy(): void {
    this.dialog.closeAll()
  }

  ngOnInit(): void {

    this.dialog.open(LoaderCompComponent)
    
    this.matchId=this.activatedroute.snapshot.paramMap.get('id')   

    this.activatedroute.queryParams.subscribe(params => {

      this.status = params['status'];
      console.log(this.status);
     })
      
    this.contestsList=this._contestService.getcontest(this.matchId)
    let currTeam=JSON.parse(localStorage.getItem('currTeam')||'')
    this.matchTitle=currTeam

    this.fun_myjoinedtournaments()
  }

  fun_myjoinedtournaments(){
    this._contestService.myjoinedteamsapi(this.matchId).subscribe({
      next:(res:any)=>{
        this.dialog.closeAll()
        console.log(res);
        this.joinedtournaments=res
      },error:(err:any)=>{
        this.dialog.closeAll()
        this._contestService.snackMessage('Error Occour On API Call')
      },
      complete:()=>{
        this.dialog.closeAll()
      }
    })
  }
  showTeam(para:any){
    if (this.status=='opened') {
      
    
    let teamnum:any=[]
    let data=para.teams
    console.log(para);
    data.filter((number:any)=>{
      console.log(number.teamnumber);
      teamnum.push(number.teamnumber)
    })
    console.log(para);
    this.route.navigate(['contest-team/leaderboard',para.challenge_id],{ queryParams: {matchid:this.matchId} })
  }
  else if (this.status=='closed') {
    this.route.navigate(['contest-team/result-lead',para.challenge_id,this.matchId])
  }

  }

  addnewTeam(para:any,event:Event){
    event.stopPropagation();
    // console.log(para.teams);
    let teamnum:any=[]
    let data=para.teams
    data.filter((number:any)=>{
      console.log(number.teamnumber);
      teamnum.push(number.teamnumber)
    })
   
    console.log(teamnum);
    this.route.navigate(['contest-team/team-list',this.matchId],{queryParams:{id:para.challenge_id,jt:true,multi:0,newteam:true,num:teamnum}})
  }
  inviteUser(event:Event,data:any){
    event.stopPropagation();
    console.log(data);
    this.inviteCode=data.refercode
    this.dialog.open(this.callAPIDialog)
  }

  copyCode(code:string){
    this.clipboard.copy(code);
    this._contestService.snackMessage('Invite Code Copied Successfully')
  }
}
