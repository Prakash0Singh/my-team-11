import { Component ,ElementRef,OnInit, ViewChild,OnDestroy} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderCompComponent } from 'src/app/loader-comp/loader-comp.component';
import { ApiCallService } from 'src/app/service/api-call.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css'],
  
})
export class TeamListComponent implements OnInit,OnDestroy{
  
  constructor(private activatedroute: ActivatedRoute, private _apiService: ApiCallService, public route: Router,private matdialog:MatDialog ) { }


  @ViewChild("canvasbtn") canvas!:ElementRef

  offcanvasdiv=true
  matchId!: any;
  myTeam: any;
  view=false
  n=0
  currentPlayer:any[]=[];
  joinedTeam: any;
  userjoinedteams: any[]=[];
  joinedId: any;
  multiEntry: any;
  balance: any;
  teamidDisable: any[]=[];
  swap: any[]=[];
  addNewTeam: any;
  swapJoinid: any;
  my_team: any[]=[];
  joinleagueteams_disable: any
  contestsList: any;
  matchTitle:any;
  AllMatchAmonutList:boolean=true;
  
  myTeamsMatchList:any[]=[]

  ngOnInit(): void {
  
      this.matdialog.open(LoaderCompComponent)
    
    this.matchId=this.activatedroute.snapshot.paramMap.get('id')    
    this.matchTitle=JSON.parse(localStorage.getItem('currTeam')||'')

    this.activatedroute.queryParams.subscribe(params => {

      this.joinedId=params['id']
      this.joinleagueteams_disable=params['team']
      this.addNewTeam=params['newteam']
      this.swapJoinid=params['joinid'] 
      
     })

     if (this.joinedId) {
        this.swap_api_functionality()

        if(this.swapJoinid ||this.joinleagueteams_disable) { this.team_disbale_on_swap_functionality() }

     }  
    setTimeout(() => {
      this.countPlayers()
    }, 2000);

  }

//for count players  
  countPlayers() {  
    this._apiService.myteamlist(this.matchId).subscribe({
      next:(data:any)=>{

        this.matdialog.closeAll()
  
        this.myTeamsMatchList=data
   
        console.log(data);
        data.filter((team:any)=>{
          const createTeam:any={
            'k':[],
            'al':[],
            'bat':[],
            'bow':[],
            'team1':[],
            'team2':[],
          }
          if(!!this.teamidDisable){
            this.teamidDisable.filter((data:any)=>{
              if (data==team.teamnumber) {
                team.isdisable=true;
              }
            })
          }
          console.log(createTeam);
          team.player.filter((player:any)=>{
            if (player.role=='keeper')  createTeam.k.push(player);
            if (player.role=='batsman')  createTeam.bat.push(player)
            if (player.role=='allrounder')  createTeam.al.push(player)
            if (player.role=='bowler')  createTeam.bow.push(player)
            if (player.team=='team1')  createTeam.team1.push(player)
            if (player.team=='team2')  createTeam.team2.push(player)
          })
          this.currentPlayer.push(createTeam)
        })
  
        console.log(this.currentPlayer);
      }
      ,error:(err:any)=>{
        this.matdialog.closeAll()
        this._apiService.snackMessage('Error Occour On API Call')
      }
    }
 )
    if (this.currentPlayer.length==1) {
      // localStorage.setItem('joinnow',this.currentPlayer[0].teamnumber)
      console.log('joinnow',this.currentPlayer[0])
    }
  }

  goingBack(){
    this.AllMatchAmonutList=false;
    this.route.navigate(['contest-team/tournaments',this.matchId])
  }

  viewTeam(team:any){
    console.log(team);
    this.myTeam=team.player
    this.view=true
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
  }

  editteam(team:any){
    // this._apiService.editteam(teamid).subscribe((data:any)=>{
    //   console.log(data);
    // })
    this.route.navigate(['contest-team/team-players',this.matchId],{ queryParams: { teamid:team.teamid ,teamnumber:team.teamnumber} })
  }

  cloneteam(teamid:string){
    this.route.navigate(['contest-team/team-players',this.matchId],{ queryParams: { teamid:teamid ,clone:teamid} })
  }

  createteam(){
    this.route.navigate(['/contest-team/team-players',this.matchId])
  }

  addteam(target:any,data:any){ 
    // console.log(target.checked);
    console.log(data.teamid);
    if (target.checked && this.multiEntry) {
        this.userjoinedteams.push(data.teamid)
    }
    else if(target.checked && !this.multiEntry){
      this.userjoinedteams[0]=data.teamid
    }
    else{
      this.userjoinedteams.filter((e:any,index:number) =>{
        if(e==data.teamid)
        {
          target.checked=false
          this.userjoinedteams.splice(index,1)
          console.log(this.userjoinedteams);  
        }
       
      } )
    }
    console.log(this.userjoinedteams);

  }

  getbalance(){
    if (this.userjoinedteams.length) {
      this._apiService.getusableleBalance(this.joinedId,this.userjoinedteams.length).subscribe((data:any)=>{
        this.balance=data[0]
        console.log(this.balance);
      })
      console.log(this.userjoinedteams);
      console.log(this.userjoinedteams.toString());
      this.offcanvasdiv=false
      this.canvas.nativeElement.click();
      // document.getElementById('btn')?.click()
    }
    else{
      this._apiService.snackMessage('Please Select At least one Team')
    }
  }

  joincontest(){
    this.matdialog.open(LoaderCompComponent)
    let data=new FormData()
    data.append('matchkey',this.matchId)
    data.append('challengeid',this.joinedId)
    data.append('teamid',this.userjoinedteams.toString())
    this._apiService.joincontestapi(data).subscribe({
      next:(res:any)=>{
        if (res.success) {
          console.log(data);
          this.route.navigate(['contest-team/tournaments',this.matchId])
          this._apiService.snackMessage(res.message)
          this.offcanvasdiv=!this.offcanvasdiv
          this.canvas.nativeElement.click();
        }
        else{
          this._apiService.snackMessage(res.message)
        }
      },error:(err:any)=>{
        this.matdialog.closeAll()
        this._apiService.snackMessage('Error Occour On API Call')
      },complete:()=>{
        this.matdialog.closeAll();
      }
    })
    
  }

  switchteams(){

    this.matdialog.open(LoaderCompComponent)

    console.log('Switch Team');
    console.log(this.userjoinedteams);
    console.log('swap id -',this.swapJoinid);
    console.log('challenge id -',this.joinedId);

    if (this.userjoinedteams.length) {
      
    let data=new FormData();
    data.append('matchkey',this.matchId)
    data.append('teamid',this.userjoinedteams.toString())
    data.append('joinid',this.swapJoinid)
    data.append('challengeid',this.joinedId)
    
    this._apiService.swapteam(data).subscribe({
      next:(res:any)=>{
        if (res.success) {
          this._apiService.snackMessage(res.message)
          history.go(-1)
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
 
// swap api functionality
  swap_api_functionality() {
  this._apiService.getcontest(this.matchId).subscribe({
    next:(res:any)=>{
    let myMatch=res.find((val:any )=>val.id==this.joinedId)
    if (this.swapJoinid) {
      this.multiEntry=0
    }
    else{
    this.multiEntry=Number(myMatch.multi_entry)
    }
    this.joinedTeam=true
    }
  })
  }

// disable team's on swap functionality

  team_disbale_on_swap_functionality() {
  this._apiService.getleaugesdetails(this.joinedId).subscribe({
    next:(res:any)=>{
      console.log(res[0].jointeams);
      res[0].jointeams.filter((data:any)=>{
        if (data.usernumber>0) {
          this.teamidDisable.push(data.teamnumber)  
        }
       
      })
    }
  })
  }

  ngOnDestroy(): void {
    this.matdialog.closeAll()

  }
}

