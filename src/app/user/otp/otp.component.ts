import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiCallService } from 'src/app/service/api-call.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnDestroy{
  
  constructor(private _apiService: ApiCallService, private toaster: ToastrService,private router:Router) { }

// --- Variable's Declaration ---

  apiData: any;
  userVerfiycode:string=''
  userToken:any=localStorage.getItem('tempUser')

// --- Function's Declaration ---

  ngOnInit(){
   this._apiService.getUserToken()   
  //  this._apiService.otpCheck()  
  }

  onOtpChange(value: any) {
  
    if (value.length==4) {
      let data=new FormData();
      data.append('tempuser',this.userToken);
      data.append('otp',value);
      this._apiService.veryOtp(data).subscribe({
        next:(res:any)=>{
          console.log(res[0]);
          if (res[0].success){
            localStorage.clear();
            this.toaster.success('','Successfully Verifyed')
            this.router.navigate(['/user-login'])
          }
          else{
            this.toaster.warning('','OTP not Valid');
          }
        }
      })
    }
  }

  verfyOtp(){}

  ngOnDestroy() {
      // this.apiData.unsubscribe();
  }
}
