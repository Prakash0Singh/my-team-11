import { Component, OnInit,OnDestroy,ViewChild, TemplateRef, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef ,MatBottomSheet} from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoaderCompComponent } from 'src/app/loader-comp/loader-comp.component';
import { ApiCallService } from 'src/app/service/api-call.service';
@Component({
  selector: 'app-balance-modal',
  templateUrl: './balance-modal.component.html',
  styleUrls: ['./balance-modal.component.css']
})
export class BalanceModalComponent implements OnInit {

  balance: any; 
  constructor(private bottomSheetRef:MatBottomSheetRef<BalanceModalComponent>,  @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,private _apiService:ApiCallService,private matBottomSheet:MatBottomSheet,private route:Router,private matdialog:MatDialog) {
    bottomSheetRef.disableClose=true
  }

  ngOnInit(){
    // this.bottomSheet.open(this.sheet)
    console.log(this.data.challenge_id);
    console.log(this.data.teams);
    console.log(this.data.matchid);
    this._apiService.getusableleBalance(this.data.challenge_id,this.data.teams).subscribe({next:(res:any)=>{
      this.balance=res[0]
      console.log(res[0]);
    }})
    console.log('modal dialog opened:'+this.data);
  }

  joincontest(){

    this.matdialog.open(LoaderCompComponent)
    
    let data=new FormData()
    data.append('matchkey',this.data.matchid)
    data.append('challengeid',this.data.challenge_id)
    data.append('teamid',this.data.teamno.toString())
    this._apiService.joincontestapi(data).subscribe({
      next:(res:any)=>{
        this.matdialog.closeAll()
        if (res.success) {
          console.log(data);
          this._apiService.snackMessage(res.message)
          this.matBottomSheet.dismiss()
          this.route.navigate(['contest-team/tournaments',this.data.matchid])
        }
        else{
          this.route.navigate(['contest-team/tournaments',this.data.matchid])
          this.matBottomSheet.dismiss()
          this._apiService.snackMessage(res.message)
        }
      },error:(err:any)=>{
        this.matdialog.closeAll()
        console.log(err);
        this._apiService.snackMessage('Error Occour On API Call')
      }
    }
    )
    
  }
  closeMat_Sheet(){
    this.matBottomSheet.dismiss()
    this.route.navigate(['contest-team/tournaments',this.data.matchid])
  }
  
}
