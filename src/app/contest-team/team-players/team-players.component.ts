import { Component, OnInit,OnDestroy} from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiCallService } from 'src/app/service/api-call.service';

@Component({
  selector: 'app-team-players',
  templateUrl: './team-players.component.html',
  styleUrls: ['./team-players.component.scss']
})
export class TeamPlayersComponent implements OnInit,OnDestroy{

  matchId: any;
  // totalPalyers: any;
  allKeepers: any[] = [];
  allBatsman: any[] = [];
  allAllRounder: any[] = [];
  allBowler: any[] = [];
  getData: any = this.allKeepers
  checkMinimum=false
  team:any={
    'keeper':{
      'min':1,
      'max':4,
      'currMem':0,
      'players':[],
    },
    'batsman':{
      'min':2,
      'max':6,
      'currMem':0,
      'players':[],
    },
    'allrounder':{
      'min':1,
      'max':6,
      'currMem':0,
      'players':[],
    },
    'bowler':{
      'min':2,
      'max':6,
      'currMem':0,
      'players':[],
    },
    'totalplayers':[],
    'team1':0,
    'team2':0,
    'max_players':11,
    'cur_players':0,
  }
  remaingPoints: number = 0
  totalPoints: number =100;
  team_Card: any;
  showNextButton:boolean=false;
  teamid: any;
  cloneid: any;
  teamnumber: any;
  sessionTeam=[]
  tourid: any;
  join_id: any;
  challenge_id: any;
  constructor(private activatedroute: ActivatedRoute, private _apiService: ApiCallService, public route: Router ,private toaster: ToastrService) { }

  ngOnInit(): void {

    this.activatedroute.queryParams.subscribe(params => {
        this.teamid = params['teamid'];
        this.cloneid = params['clone'];
        this.teamnumber=params['teamnumber']
        this.tourid=params['id'];
        this.challenge_id=params['challengeId']
        this.join_id=params['joinId']
    })

    this.matchId = this.activatedroute.snapshot.paramMap.get('id')
    this.team_Card=JSON.parse(localStorage.getItem('currTeam')||'')

    this.teamapi()
    if ((!this.teamid) && JSON.parse(sessionStorage.getItem('tmpsave')||'false')) {
      console.log(JSON.parse(sessionStorage.getItem('tmpsave')||'false'));
      this.sessionTeam=JSON.parse(sessionStorage.getItem('tmpsave')||'[]')
    }
  }
// api calling
  teamapi() {
    this._apiService.getAllplayers(this.matchId).subscribe(
      {
        next: (data: any) => {

          if(this.teamid || JSON.parse(sessionStorage.getItem('tmpsave')||'false') ) {

            this._apiService.editteam(this.teamid).subscribe((d:any)=>{
              if ((!this.teamid) && JSON.parse(sessionStorage.getItem('tmpsave')||'false')) {
                d=this.sessionTeam
              }
              data.filter((mp:any,index:number)=>{
                d.filter((sp:any)=>{
                  if (mp.id==sp.id) {
                    mp.isSelected=true
                    if (sp.captain) {
                      mp.captain=1
                    }
                    else if(sp.vicecaptain)
                    {
                      mp.vicecaptain=1
                    }
                    console.log(index);
                  }
                })
            })
            console.log(data);
            data.filter((s:any)=>{
            if (s.isSelected) {
              if (s.role=='keeper') {
                this.team.keeper.players.push(s)
                this.team.keeper.currMem++
                this.team.cur_players++
                this.remaingPoints=this.totalPoints-s.credit
                this.totalPoints=this.remaingPoints
              }
              if (s.role=='batsman') {
                this.team.batsman.players.push(s)
                this.team.batsman.currMem++
                this.team.cur_players++
                this.remaingPoints=this.totalPoints-s.credit
                this.totalPoints=this.remaingPoints
              }
              if (s.role=='allrounder') {
                this.team.allrounder.players.push(s)
                this.team.allrounder.currMem++
                this.team.cur_players++
                this.remaingPoints=this.totalPoints-s.credit
                this.totalPoints=this.remaingPoints
              }
              if (s.role=='bowler') {
                this.team.bowler.players.push(s)
                this.team.bowler.currMem++
                this.team.cur_players++
                this.remaingPoints=this.totalPoints-s.credit
                this.totalPoints=this.remaingPoints
              }
              if (s.team=='team1') {
                this.team.team1++
              }
              if (s.team=='team2') {
                this.team.team2++
              }
              this.team.totalplayers.push(s)
            }

            })
        })
        }
          
          if (data.length) {
            data.filter((players: any) => {
              if (players.role == 'keeper') {
                this.allKeepers.push(players)
              }
              if (players.role == 'batsman') {
                this.allBatsman.push(players)
              }
              if (players.role == 'allrounder') {
                this.allAllRounder.push(players)
              }
              if (players.role == 'bowler') {
                this.allBowler.push(players)
              }
            })
          }
        },error:(err:any)=>{
          this._apiService.snackMessage('Error Occour On API Call')
        }
      })
  }

//for showing particular role players
showpAllPlayersList(target: any) {


  if (target.value == 'allKeepers') {
    this.getData = []
    this.getData = this.allKeepers
    console.log('Keepers clicked');
    this.checking_minimum('keeper')
  }
  if (target.value == 'allBatsman') {
    this.getData = []
    this.getData = this.allBatsman
    console.log('allBatsman');
    this.checking_minimum('batsman')

  }
  if (target.value == 'allAllRounder') {
    this.getData = []
    this.getData = this.allAllRounder
    console.log('All-rounder');
    this.checking_minimum('allrounder')
  }
  if (target.value == 'allBowler') {
    this.getData = []
    this.getData = this.allBowler
    console.log('allBowler');
    this.checking_minimum('bowler')
  }

}

// for creating team 
  creatingUserTeam(p: any) {
    if(!p.isSelected){

      let currentTeamPlayers:boolean=true;
      let  minimumPlayers:boolean=true
      if (this.team.cur_players==7) {
        console.log(this.team.cur_players);
      if((this.team.batsman.currMem==0 && this.team.bowler.currMem==0 )){
        if (p.role=="allrounder" || p.role=="keeper") {
          minimumPlayers=false;
          this._apiService.snackMessage('Please Select Atleast 1 Batsman 0r 1 Bowler')
        }
      }
      }
      if (this.team.cur_players==8) {
        // console.log(this.team.cur_players);
        let remain=this.team[p.role].currMem - this.team[p.role].min
        // console.log(remain,"Current Players");
          let k=this.team.keeper.currMem -this.team.keeper.min
          let b=this.team.batsman.currMem -this.team.batsman.min
          let al=this.team.allrounder.currMem -this.team.allrounder.min
          let bw=this.team.bowler.currMem -this.team.bowler.min
          let tr=0 

          if (k<0) {
            if (!(p.role=='keeper') && (k==-1) && remain >0 )  this._apiService.snackMessage('Keeper is Required')
            // console.log(k,"keeper");
            tr+=k;
          }
          if (b<0) {
            if (!(p.role=='batsman') && (b==-2) && remain >0 && tr==-2)  this._apiService.snackMessage('Batsman is Required')
            // console.log(b,"batsman");
            tr+=b;
          }
          if (al<0) {
            if (!(p.role=='alrounder') && (al==-1) && remain >0 )  this._apiService.snackMessage('Alrounder is Required')
            // console.log(al,"alrounder");
            tr+=al;
          }
          if (bw<0) {
            console.log(remain);
            if (!(p.role=='bowler') && (bw==-2) && remain >0 && tr==-2)  this._apiService.snackMessage('Bowler is Required')
            console.log(bw,"bowler");
            tr+=bw;
          }
         
         
          if( (tr<=-3 && remain<0) || tr>=-2)
          { 
            minimumPlayers=true; 
            console.log("You are in Condition"); 
          }
          else  minimumPlayers=false;
          console.log(tr,"All Remaining Players");

        }
      if (this.team.cur_players==9) {
        console.log(this.team.cur_players);
        let remain=this.team[p.role].currMem - this.team[p.role].min
        
          let k=this.team.keeper.currMem -this.team.keeper.min
          let b=this.team.batsman.currMem -this.team.batsman.min
          let al=this.team.allrounder.currMem -this.team.allrounder.min
          let bw=this.team.bowler.currMem -this.team.bowler.min
          let tr=0  
          if (k<0) {
            if (!(p.role=='keeper') && k<0  && remain >=0)  this._apiService.snackMessage('Keeper is Required')
            console.log(k,"keeper");
            tr+=k;
          }
          if (b<0) {
            if (!(p.role=='batsman')&& b<0 && remain >=0)  this._apiService.snackMessage('Batsman is Required')
            console.log(b,"batsman");
            tr+=b;
          }
          if (al<0) {
            if (!(p.role=='alrounder')&& al<0  && remain >=0)  this._apiService.snackMessage('Alrounder is Required')
            console.log(al,"alrounder");
            tr+=al;
          }
          if (bw<0) {
            if (!(p.role=='bowler')&& bw<0 && remain >=0)  this._apiService.snackMessage('Bowler is Required')
            console.log(bw,"bowler");
            tr+=bw;
          }

          if(tr<=-2 && remain>=0){
            console.log(remain,'Remaing player');
            minimumPlayers=false;
          }
          else{
            minimumPlayers=true
          }
      }
      if (this.team.cur_players==10) {
        console.log(this.team.cur_players);

        
          if (this.team.allrounder.currMem<this.team.allrounder.min && p.role!='allrounder') {
            this._apiService.snackMessage('Minmum 1 Allrounder is Required')
            minimumPlayers=false

          }
          else  if (this.team.keeper.currMem<this.team.keeper.min && p.role!='keeper') {
            this._apiService.snackMessage('Minmum 1 Keeper is Required')
            minimumPlayers=false

          }
          else if (this.team.batsman.currMem<this.team.batsman.min && p.role!='batsman') {
            this._apiService.snackMessage('Minmum 2 Batsman is Required')
            minimumPlayers=false

          }
          else if (this.team.bowler.currMem<this.team.bowler.min && p.role!='bowler') {
            this._apiService.snackMessage('Minmum 2 Bowler is Required')
            minimumPlayers=false
          }
      }

      if (!(this.team[p.team]<7)) {
          currentTeamPlayers=false;
          this._apiService.snackMessage('Maximum 7 are allowed from Same Team')
          
        }
      let remPoints=this.totalPoints-p.credit
      // if (remPoints<0) {
      //   minimumPlayers=false;
      //   this.toaster.error('',`Only ${this.totalPoints} left`)
      // } 
      if(p.role in this.team && this.team.cur_players<this.team.max_players && currentTeamPlayers && this.team[p.role].currMem<this.team[p.role].max && minimumPlayers) {
        this.team[p.role].players.push(p)
        this.team[p.role].currMem++;
        this.team[p.team]++;
        this.team.cur_players++;
        this.remaingPoints=this.totalPoints-p.credit
        this.totalPoints=this.remaingPoints
        p.isSelected=true
        this.team.totalplayers.push(p)
        if (this.team.cur_players>=8) {
          console.log('Time To Disable');
          this.checking_minimum(p.role)
        }
      }
      else{
        if(this.team.cur_players==11){
          this.toaster.error('',`You can't Select More Than 11 Players`)
        }
        else if ((this.team[p.role].currMem==this.team[p.role].max) ) {
          this.toaster.error('',`Maximum ${this.team[p.role].max} ${p.role} Allowed`)
        }
      }
    }
    else {
    
    this.team[p.role].players.splice(this.team[p.role].players.indexOf(p),1)
    this.team[p.role].currMem--;
    this.team[p.team]--;
    this.team.cur_players--;
    this.remaingPoints=this.totalPoints+Number(p.credit)
    this.totalPoints=this.remaingPoints
    console.log(this.team);
    p.isSelected=false;
    this.team.totalplayers.splice(this.team.totalplayers.indexOf(p),1)
    this.checkMinimum=false
  }
  if (this.team.totalplayers.length==11) {
    this.showNextButton=true
       }
  else this.showNextButton=false
  }

  goingback() {
    this.route.navigate(['/contest-team/tournaments', this.matchId])
  }

  saveMyTeam(){
    if (this.team.totalplayers.length==11) {
      let myplayers=[...this.team.keeper.players,...this.team.batsman.players,...this.team.allrounder.players,...this.team.bowler.players]
      localStorage.setItem('myteam',JSON.stringify(myplayers))
      if(this.teamid && this.cloneid) {
        console.log("for clone");
        this.route.navigate(['/contest-team/save-team',this.matchId])
      }
      else if(this.teamid){
        console.log("sending teamid");
        this.route.navigate(['/contest-team/save-team',this.matchId],{ queryParams: { teamid:this.teamid,teamnumber:this.teamnumber} })
      }
      else if(this.join_id && this.challenge_id) {
        console.log("Switch Team");
        this.route.navigate(['/contest-team/save-team',this.matchId],{ queryParams: { challengeId:this.challenge_id,joinId:this.join_id} })
      }
      else{
      sessionStorage.setItem('tmpsave',JSON.stringify(this.team.totalplayers))
      this.route.navigate(['/contest-team/save-team',this.matchId],{ queryParams: { tourid:this.tourid} })
      }
    }
    else{
      this._apiService.snackMessage('Minimum 11 Players is Required')
    }
  }

  resetmyteam(){

// empty the team properties of object

    this.team.keeper.players=[]
    this.team.keeper.currMem=0

    this.team.batsman.players=[]
    this.team.batsman.currMem=0

    this.team.allrounder.players=[]
    this.team.allrounder.currMem=0

    this.team.bowler.players=[]
    this.team.bowler.currMem=0

    this.team.totalplayers=[]
    this.team.cur_players=0;
    this.team.team1=0
    this.team.team2=0

    this._apiService.getAllplayers(this.matchId).subscribe((data:any)=>{
      data.filter((d:any)=>{d.isSelected=false})
    })
    this.allKeepers.filter((data:any)=>{
      data.isSelected=false
    })
    this.allBatsman.filter((data:any)=>{
      data.isSelected=false
    })
    this.allAllRounder.filter((data:any)=>{
      data.isSelected=false
    })
    this.allBowler.filter((data:any)=>{
      data.isSelected=false
    })

    this.totalPoints=100
    this.checkMinimum=false

  }

// for disable/opacity for minimum players
  checking_minimum(current_role:string){

    let keep=this.team.keeper.currMem -this.team.keeper.min
    let bat=this.team.batsman.currMem -this.team.batsman.min
    let alr=this.team.allrounder.currMem -this.team.allrounder.min
    let bow=this.team.bowler.currMem -this.team.bowler.min
    let totalremaings=0 

    if(keep<0) totalremaings+=keep 
    if(bat<0) totalremaings+=bat 
    if(alr<0) totalremaings+=alr 
    if(bow<0) totalremaings+=bow 
    console.log(totalremaings,'Total Reamaing for ',this.team.cur_players);
    let remain=this.team[current_role].currMem-this.team[current_role].min

      if ( (this.team.cur_players==8 && totalremaings==-3) ||(this.team.cur_players==9 && totalremaings==-2) ||(this.team.cur_players==10 && totalremaings==-1)) {
        
        console.log(current_role,'Current Role'); 
        console.log(remain,'Remaing players of current role');
  
        if ((remain>=0)) {
          this.checkMinimum=true;
          console.log(this.checkMinimum,'Yaa in Codititon');
          console.log(remain,current_role,'Inside Condition');
        }
        else{
          this.checkMinimum=false
          console.log(this.checkMinimum,'Elese Codition');
        }
      }
      else{
        this.checkMinimum=false
        console.log(this.checkMinimum,'Main else Condition');
      }
    

  }

  ngOnDestroy(): void {
    if (this.route.url!=`/contest-team/save-team/${this.matchId}`) {
      sessionStorage.clear()
    }
  }

}
