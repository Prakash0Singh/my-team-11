import { Component,OnInit,OnDestroy } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiCallService } from 'src/app/service/api-call.service';
import { BalanceModalComponent } from '../balance-modal/balance-modal.component';
import { LoaderCompComponent } from 'src/app/loader-comp/loader-comp.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-save-team',
  templateUrl: './save-team.component.html',
  styleUrls: ['./save-team.component.css'],
})
export class SaveTeamComponent implements OnInit,OnDestroy {
  matchId: any ;
  team_Card: any;
  myTeam: any[]=[];
  captainid:number=0;
  vicecaptainid:number=0
  showNextButton:any=false;
  cap:any=0;
  vic:any=0;
  allplayers: any;
  myTeamsNumber: any;
  myNumber=0
  teamid: any;
  // teamnumber: any;
  mykeeper: any[]=[];
  mybatsman: any[]=[];
  myallrounder: any[]=[];
  mybowler: any[]=[];
  tourid: any;
  my_team: any[]=[];
  challenge_id: any;
  join_id: any;
  switch_teamid: any;
  
  constructor(private activatedroute: ActivatedRoute, private _apiService: ApiCallService, public route: Router ,private toaster: ToastrService,private matbottomSheet:MatBottomSheet,private matdialog:MatDialog) { }

  ngOnInit(): void {
    this.myTeam=JSON.parse(localStorage.getItem('myteam')||'[]')
    
    this.matchId = this.activatedroute.snapshot.paramMap.get('id')
    this.activatedroute.queryParams.subscribe(params => {
      this.teamid = params['teamid'];
      // this.teamnumber=params['teamnumber']
      this.tourid=params['tourid'];
      this.challenge_id=params['challengeId']
      this.join_id=params['joinId']
      console.log(this.tourid);
    })
    
    //  for blocking direct access(!)--recently added
     if(!this.teamid){
        if (this.myTeam.length==0) {
          console.log('GO to Home');
          history.go(-1)
        }
    //  if (!localStorage['myteam']||this.teamid) {
    //   history.go(-1)
    //  }
    }

    this.team_Card=JSON.parse(localStorage.getItem('currTeam')||'')

    this.forCapVice()
  }

  forCapVice() {

    let players:any[]=[]

    if(this.teamid) {
    this.myTeam.filter((data:any)=>{
      if (data.vicecaptain) {
        this.vic=data.id
      }
      if (data.captain) {
        this.cap=data.id
      }
    })
    }
    else{
    this.myTeam=this.myTeam.map((element:any) => ({...element, captain:0,vicecaptain:0}))
    console.log(this.myTeam);
    }

    this.myTeam.filter((data:any)=>players.push(data.id))
    
  // Team view-edited code here
    let unique_value=[...new Set(this.myTeam.map((x:any)=>x.role))]

    const transactions:any=[]
    let list:any[]=[]

    unique_value.filter((titles:any,index:number)=>{
      list=[]
      this.myTeam.filter((data:any,index:number)=>{ 
        if (titles==data.role) {
          list.push(data)
        }
      })
    
      transactions.push({title:titles,list:list})
      
    })
    console.log(transactions);
    this.my_team=transactions
  // Team view-edited code here
    this.allplayers=players.toString()
    console.log(this.allplayers);
  }

  goingback() {
    history.go(-1)
  }
  chooseCaptain(event:any){

    // console.log(event.srcElement.checked);
    this.myTeam.filter((data:any)=>{
      if (data.id==event) {
        data.captain=true;
        if(data.vicecaptain){
          this.vic=0
        }
        data.vicecaptain=false;
        console.log('Id match',data.id);
        this.cap=data.id
      }
      else{ 
        data.captain=false
      }
    })

  

  }

  chooseViceCaptain(event:any){
    // console.log(event.srcElement.checked);
      this.myTeam.filter((data:any)=>{
        if (data.id==event ) {
          data.vicecaptain=true;
          if (data.captain) {
            this.cap=0
          }
          data.captain=false
          console.log('Id match',data.id);
          this.vic=data.id
        }
        else{ 
        data.vicecaptain=false
        }
        
      })

    }
  
    saveTeam(){

      if (this.vic && this.cap) {

        this._apiService.myteamlist(this.matchId).subscribe(
          {
            next:(data:any)=>{
            console.log(data.length);
            this.myNumber=1+(data.length)
            console.log(this.myNumber);
            console.log(data);
  
            if (this.teamid) {
              data.filter((n:any)=>{
                if(n.teamid==this.teamid)
                {
                  console.log(n);
                  this.myNumber=n.teamnumber
                }
              })
            }
          },
          complete:()=>
          {
            console.log(this.myNumber);
            let data=new FormData()
            data.append('matchkey',this.matchId);
            data.append('teamnumber',this.myNumber.toString());
            data.append('players',this.allplayers)
            data.append('captain',this.cap);
            data.append('vicecaptain',this.vic)
  
            this._apiService.createmyteam(data).subscribe({
              next:(response:any)=>{
                if (response.success) {
                  console.log(response.teamid);
                  this.switch_teamid=response.teamid
                  if (response) {
                    if (this.tourid && this.myNumber==1) {
                      this.matbottomSheet.open(BalanceModalComponent,{data:{challenge_id:this.tourid,teams:this.myNumber,matchid:this.matchId,teamno:response.teamid}})
                      console.log('Bottom Sheet Open');
                    }
                    else if(this.join_id && this.challenge_id){
                      this.switchteams()
                      console.log(this.challenge_id,this.matchId);
                    }
                    else{
                      console.log('Redirected');
                      this.route.navigate(['/contest-team/team-list',this.matchId])
                    }
                  }
                }
                else{
                  this.toaster.error('',`${response.message}`)
                }
              }
            })
          }
          }

        )


      }
      else{
        this._apiService.snackMessage('Cap And VC is Required')
      }
    }

    
    switchteams(){

      this.matdialog.open(LoaderCompComponent)
  
      console.log('Switch Team');
      // console.log(this.switch_teamid);

      if (this.switch_teamid) {
        
      let data=new FormData();
      data.append('matchkey',this.matchId)
      data.append('teamid',this.switch_teamid.toString())
      data.append('joinid',this.join_id)
      data.append('challengeid',this.challenge_id)
      
      this._apiService.swapteam(data).subscribe({
        next:(res:any)=>{
          if (res.success) {
            this._apiService.snackMessage(res.message)
            // history.go(-1)
            this.route.navigate(['/contest-team/leaderboard',this.challenge_id],{queryParams:{matchid:this.matchId} })

          }
          else{
            this._apiService.snackMessage(res.message)
          }
        },
        complete:()=>{
          this.matdialog.closeAll();
        }
      })
    }
    else{
      this._apiService.snackMessage(`Please Select At least 1 Team for Switch`)
    }


    }

    ngOnDestroy(): void {
      if (this.route.url!= `/contest-team/team-players/${this.matchId}`) {
        sessionStorage.clear()   
      }
       localStorage.removeItem('myteam')
    }

}
