import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiCallService } from '../service/api-call.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

  walletbalance: any;
  userimage: any;

  userData: any = this.formBulider.group({
    team: ['', [Validators.required]],
    dob: ['', [Validators.required]],
    state: ['', [Validators.required]]
  })
 
  constructor(public router:Router ,private formBulider: FormBuilder,private _apiService: ApiCallService,private route:Router,private matdialog:MatDialog){}

  today=new Date()
  maxdate:any=new Date(
  this.today.getFullYear()-18,
  this.today.getMonth(),
  this.today.getDate()
  ) 

  ngOnInit(): void {
  };


  saveDeatils(){
    console.log('adjfnjns');
    this.userData.markAllAsTouched();
    if (this.userData.valid) {
      let dob=this.userData.value.dob.toLocaleString().split(',')[0];
      console.log(dob);
      let data = new FormData();
      data.append('dob',dob)
      data.append('team',this.userData.value.team)
      data.append('state',this.userData.value.state)
      this._apiService.updateuserdetails(data).subscribe({
        next:(res:any)=>{
          if (res[0].success) {
            this._apiService.snackMessage('Profile Details Completed')
          } else {
            this._apiService.snackMessage(res[0].message)
          }
          console.log(res);
        }
        ,complete:()=>{

          this.router.navigate(['/menu/home'])
        }
      }
      )
    }

  }

  get fc(){
    return  this.userData.controls
   }
  

}

