import { Component,OnDestroy,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoaderCompComponent } from 'src/app/loader-comp/loader-comp.component';
import { ContestApiService } from 'src/app/service/contest-api.service';

@Component({
  selector: 'app-contests',
  templateUrl: './contests.component.html',
  styleUrls: ['./contests.component.css']
})
export class ContestsComponent implements OnInit,OnDestroy{

  finalStatus=''
  remaingTime: any[]=[];
  myjoinedTeams: any[]=[];
  showcontest='opened';

  transactions: any;
  openedbutton=true;
  livebutton=true;
  completebutton=true;

  constructor(public router:Router,private _contestService: ContestApiService,private dialog: MatDialog){}

  ngOnInit(): void {
    this.dialog.open(LoaderCompComponent)
  this.myjoinedContest()
  }

  ngOnDestroy(): void {
    this.dialog.closeAll()
  }

  myjoinedContest() {
    this._contestService.myjoinedcontest().subscribe({
      next:(res:any)=>{
        this.myjoinedTeams=res
// ---------------------
        this.transactions=res
        let unique_value=[...new Set(res.map((x:any)=>x.status ))]

        const transactions:any=[]
        let list:any[]=[]
  
        unique_value.filter((titles:any,index:number)=>{
          list=[]
          res.filter((data:any,index:number)=>{ 
            if (titles==data.status) {
              list.push(data)
            }
          })
        
          transactions.push({title:titles,list:list})
          
        })
        console.log(transactions);
        transactions.filter((name:any)=>{
          if (name.title=='closed' ) {
            name.list.some((f_status:any)=>{
              if (f_status.final_status=='pending'||f_status.final_status=='isReviewed') {
                this.livebutton=false
              }
              if (f_status.final_status=='winnerdeclared'||f_status.final_status=='isAbandoned'||f_status.final_status=='isCanceled') {
                this.completebutton=false
              }
            })
          }
          if(name.title=='opened' && name.list.length) {
            this.openedbutton=false
            console.log('Opened is foound');
          }
        })
//-------------------- 
        const myRemainingTime:any={
          'time':[],
          'day':[],
        }
        this.myjoinedTeams.filter((data:any)=>{
          let team1=data.team1logo.replace('http://143.110.244.110/jit11/public/','')
          let team2=data.team2logo.replace('http://143.110.244.110/jit11/public/','')
        data.team1logo=team1
        data.team2logo=team2
        let matchStartTiming:any=new Date(data.start_date);
        let currentTiming:any=new Date();
        let timeDifference:any=matchStartTiming - currentTiming
        if (timeDifference>=0) {
          myRemainingTime.time.push({t:Number((timeDifference / (1000 * 60 * 60))).toFixed(2),d:Math.floor((timeDifference/(1000*60*60*24)))})
        }
        else { myRemainingTime.time.push({t:-1,d:-1})}
        this.remaingTime=myRemainingTime.time
      })
      },error:(err:any)=>{
        this.dialog.closeAll()
        this._contestService.snackMessage('Error Occour On API Call')
      },complete:()=>{
        this.dialog.closeAll()
      }
    })
}
  contestshow(event:any,f_status:string){
    this.showcontest=event.target.value
    this.finalStatus=f_status
  }
  goiningJoinedContest(data:any,status:string){

      localStorage.setItem('currTeam',JSON.stringify(data))
      this.router.navigate(['contest-team/joined-list',data.matchkey],{queryParams:{status:status}})
  }
}
