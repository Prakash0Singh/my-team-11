import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiCallService } from '../service/api-call.service';
import { MatDialog } from '@angular/material/dialog';
import { LoaderCompComponent } from '../loader-comp/loader-comp.component';

@Injectable({
  providedIn: 'root'
})
export class AuthUserGuard implements CanActivate{
  constructor(private _apiService:ApiCallService,private router:Router,private dialog: MatDialog){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  if(localStorage.getItem('auth_key')) {
        this.dialog.open(LoaderCompComponent)
    this._apiService.checkuserdetails().subscribe({
      next:(data:any)=>{
        this._apiService.user_details=data[0]
          this.dialog.closeAll()
          if (data[0].dob==''|| data[0].state==''||data[0].team=='') {
            this.router.navigate(['/menu/fill-form'])
          }
        },
        error:(error:any)=>{
        this.dialog.closeAll()
        
      },
      complete:()=>{
        this.dialog.closeAll()
      }
    })
    
    return true
    
  }else{
      this.router.navigate(['/user-login'])
      return false;
  }
  }
}
