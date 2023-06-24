import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ApiCallService } from 'src/app/service/api-call.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  implements OnDestroy ,OnInit{
  
  constructor(private formBulider: FormBuilder, private _apiService: ApiCallService, private toaster: ToastrService ,private router:Router) { }

// --- Variable's Declaration ---

  hide:boolean=false;
  apiData: any;
  showOtp: boolean = false
  showregForm: boolean = true
  showloginForm: boolean = false
  userForm: any = this.formBulider.group({
    mobile: ['', [Validators.required,Validators.pattern("^[0-9]+$"),Validators.maxLength(10)]],
    email: ['', [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    password: ['', [Validators.required]]
  })

// --- Function's Declaration ---

  ngOnInit(): void {
    this._apiService.getUserToken()   
  }

  createUser() {
    this.userForm.markAllAsTouched();

    if (this.userForm.valid) {
      let data = new FormData();
      let userToken:any=0
      data.append('email', this.userForm.value.email)
      data.append('password', this.userForm.value.password)
      data.append('mobile', this.userForm.value.mobile)
      
      this.apiData=this._apiService.userRegister(data).subscribe({
        next: (res: any) => {
          console.log(res, "success");
          if (res[0].success) {
            userToken=res[0].tempuser
             this.showOtp = true
             this.showregForm = false
             this.toaster.success('','Successfully Registered')
             localStorage.setItem('tempUser',userToken)
             this.router.navigate(['/user-verify'])
            }
          else{
            this.toaster.warning(res[0].message)
          }
        }
      })
    }
  }

  onlyAcceptNumbers(event:any){
    console.log(event.value);
  }

  get fc(){
   return  this.userForm.controls
  }

  showloginform(){
    this.router.navigate(['/user-login'])
  }

  ngOnDestroy() {
    // this.apiData.unsubscribe();
  }
 
}
