import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,  HttpBackend } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class ApiCallService {
  user_details:any
  urlSearchParam=new URLSearchParams();
  
  // httpOptions: { headers: HttpHeaders; };

  constructor(private http:HttpClient,private router:Router,private httpBackend: HttpBackend,private _snackBar: MatSnackBar) {}

  url="http://143.110.244.110/jit11/api/"
  newHttpClient = new HttpClient(this.httpBackend);
  
  userRegister(createUser:object){
    return this.newHttpClient.post(`${this.url}tempregisteruser`,createUser)
  }
 
  veryOtp(data:any){
    return this.newHttpClient.post(`${this.url}registerusers`,data)
  }
  userLogin(user:any,password:any){
    return this.newHttpClient.get(`${this.url}loginuser?username=${user}&password=${password}`)
  }
  getMatches(){
    return this.http.get(`${this.url}getmatchlistagain`) //this.httpOptions
  }
  getcontest(matchkey:any){
    return this.http.get(`${this.url}getAllContests?matchkey=${matchkey}`)//this.httpOptions
  }
  getAllplayers(matchkey:any){
    return this.http.get(`${this.url}getallplayers?matchkey=${matchkey}`)
  }
  createmyteam(body:any){
    return this.http.post(`${this.url}createmyteam`,body)
  }
  myteamlist(matchkey:string)
  {
    return this.http.get(`${this.url}myteam?matchkey=${matchkey}`)
  }
  
  editteam(teamid:string){
    return this.http.get(`${this.url}viewteam?teamid=${teamid}`)
  }

  checkuserdetails(){
    return this.http.get(`${this.url}userfulldetails`)
  }

  updateuserdetails(update:any){
    return this.http.post(`https://cors-anywhere.herokuapp.com/${this.url}editprofile`,update)
  }
// contest
  joincontestapi(joinedteam:any){
    return this.http.post(`https://cors-anywhere.herokuapp.com/${this.url}joinleauge`,joinedteam)
  }
  myjoinedcontest(){
    return this.http.get(`${this.url}joinedmatches`)
  }
  myjoinedteamsapi(matchid:any){
    return this.http.get(`${this.url}myjoinedleauges?matchkey=${matchid}`)
  }
  getleaderboard_challenge(challenge_id:any){
    return this.http.get(`${this.url}getleaderboard_challenge?challenge_id=${challenge_id}`)
  }
 // contest
  getusableleBalance(id:any,count:any){
    return this.http.get(`${this.url}getUsableBalance?challengeid=${id}&total_team_count=${count}`)
  }
// notify
getnotifications(){
  return this.http.get(`${this.url}getnotification`)
}
// mytransactions
getmytransactions(){
  return this.http.get(`${this.url}mytransactions`)
}

getleaugesdetails(id:any){
  return this.http.get(`${this.url}leaugesdetails?challengeid=${id}`)
}
  // swap team
  swapteam(data:any){
    return this.http.post(`https://cors-anywhere.herokuapp.com/${this.url}switchteams`,data)
  }
  
  getUserToken(){
   if(localStorage.getItem('auth_key')){
     this.router.navigate(['/menu/home'])
   }
  }
  otpCheck(){
    if (localStorage.getItem('tempUser')) {
      this.router.navigate([''])
    }
  }
  snackMessage(message:string){
    this._snackBar.open(message,'',{
      panelClass:['limitPlayers'],
      horizontalPosition:'left',
      verticalPosition:'top',
      duration:1000,
    })
  }

  
}
