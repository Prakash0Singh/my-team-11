import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,  HttpBackend } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class ContestApiService {
  urlSearchParam=new URLSearchParams();
  constructor(private http:HttpClient,private router:Router,private httpBackend: HttpBackend,private _snackBar: MatSnackBar) {}

  url="http://143.110.244.110/jit11/api/"
  newHttpClient = new HttpClient(this.httpBackend);

  myteamlist(matchkey:string)
  {
    return this.http.get(`${this.url}myteam?matchkey=${matchkey}`)
  }
  
  joincontestapi(joinedteam:any){
    return this.http.post(`https://cors-anywhere.herokuapp.com/${this.url}joinleauge`,joinedteam)
  }
  
  myjoinedcontest(){
    return this.http.get(`${this.url}joinedmatches`)
  }
  
  getcontest(matchkey:any){
    return this.http.get(`${this.url}getAllContests?matchkey=${matchkey}`)//this.httpOptions
  }

  myjoinedteamsapi(matchid:any){
    return this.http.get(`${this.url}myjoinedleauges?matchkey=${matchid}`)
  }
  getleaderboard_challenge(challenge_id:any){
    return this.http.get(`${this.url}getleaderboard_challenge?challenge_id=${challenge_id}`)
  }

  getleaugesdetails(id:any){
    return this.http.get(`${this.url}leaugesdetails?challengeid=${id}`)
  }
  
  viewteam(id:any){
    return this.http.get(`${this.url}viewteam?teamid=${id}`)
  }

  swapteam(data:any){
    return this.http.post(`https://cors-anywhere.herokuapp.com/${this.url}switchteams`,data)
  }
  
  getlivescores(matchkey:any)
  {
    return this.http.get(`${this.url}getlivescores?matchkey=${matchkey}`)
  }

  getplayerinfo(playerid:any,matchkey:any){
    return this.http.get(`${this.url}getPlayerInfo?playerid=${playerid}&matchkey=${matchkey}`)
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
