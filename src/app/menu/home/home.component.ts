import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiCallService } from 'src/app/service/api-call.service';

import { Router } from '@angular/router';
import { LoaderCompComponent } from 'src/app/loader-comp/loader-comp.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnDestroy,OnInit {

  constructor(public router:Router ,private formBulider: FormBuilder,private _apiService: ApiCallService,private route:Router,private matdialog:MatDialog){}

// --- Variable's Declaration ---
today=new Date()
maxdate:any=new Date(
  this.today.getFullYear()-18,
  this.today.getMonth(),
  this.today.getDate()
  )  
  apiData: any;
  diff: any;
  remaingTime: any[]=[];
  upcommingMatches:any[]=[]
  currentTime=new Date();
  walletbalance: any;
  userimage: any;

// --- Function's Declaration ---
  
  ngOnInit(): void {
    this.matdialog.open(LoaderCompComponent)

    this.getMatchLists();
  };

  check_User_details_form() {

    this._apiService.checkuserdetails().subscribe({
      next:(data:any)=>{
      this.walletbalance=Math.floor(data[0].walletamaount)
      this.userimage=data[0].image
      if (data[0].dob==''|| data[0].state==''||data[0].team=='') {
        this.route.navigate(['/menu/fill-form'])
      }
    },error:(error:any)=>{
      this.matdialog.closeAll();
      localStorage.clear();
    }
    ,complete:()=> {
      this.matdialog.closeAll();
    },
  })
}
  
// for getting all match lists
  getMatchLists() {
    this.apiData=this._apiService.getMatches().subscribe({
      next:(res:any)=>{
        this.upcommingMatches=res[0].upcoming
        // console.log(this.upcommingMatches);
        const myRemainingTime:any={
          'time':[],
        }
        this.upcommingMatches.filter((data:any)=>{
          // console.log(data.time_start);
           let matchStartTiming:any=new Date(data.time_start);
        let currentTiming:any=new Date();
        let timeDifference:any=matchStartTiming - currentTiming
        myRemainingTime.time.push({
          t:((timeDifference / (1000 * 60 * 60))).toFixed(2),
          d:Math.floor((timeDifference/(1000*60*60*24))),
          // h:Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          // m:Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)),
          // s:Math.floor((timeDifference % (1000 * 60)) / 1000)
        })
        })
        console.log(myRemainingTime.time);
        this.remaingTime=myRemainingTime.time
      },
      complete:()=>{
        this.check_User_details_form()
      }
      
    })
  }

  matchContests(match:any){
    localStorage.setItem('currTeam', JSON.stringify(match))
    this.route.navigate(['contest-team/tournaments',match.matchkey])
  }
  
  ngOnDestroy() {
    // this.apiData.unsubscribe();
    this.matdialog.closeAll();
  }
 
}
