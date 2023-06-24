import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiCallService } from 'src/app/service/api-call.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy,OnInit {
  serverError=false;
  
  constructor(private formBulider: FormBuilder, private _apiService: ApiCallService, private toaster: ToastrService,private router :Router) { }

// --- Variable's Declaration ---
  
  apiData: any;
  hide:boolean=false;
  loginFrom: any = this.formBulider.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required]]
  })

// --- Function's Declaration ---

  ngOnInit(): void {
   this._apiService.getUserToken()
  }

  loginUser() {
    let username=this.loginFrom.value.email
    let password=this.loginFrom.value.password
    this.loginFrom.markAllAsTouched();
    if (this.loginFrom.valid) {
      this.apiData=this._apiService.userLogin(username,password).subscribe({
        next:(res:any)=>{
          console.log(res);
          if (res[0].success) {
            localStorage.setItem('auth_key',res[0].auth_key)
            this.toaster.success('',res[0].message)
            this.router.navigate(['/menu'])
          }
          else{
            this.toaster.warning('',res[0].message)
          }
        },
        error:(errMsg:any)=>{
          this.serverError=true
          console.error(errMsg.error);
        }
      })
    }
  }

  showcreateForm(){
    this.router.navigate(['/register-user'])
  }

  ngOnDestroy() {
    // this.apiData.unsubscribe();
  }
}
