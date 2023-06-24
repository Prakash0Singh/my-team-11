import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCallService } from '../service/api-call.service';

@Component({
  selector: 'app-contest-team',
  templateUrl: './contest-team.component.html',
  styleUrls: ['./contest-team.component.css']
})
export class ContestTeamComponent implements OnInit {

  constructor(public router:Router){}

  ngOnInit(): void {
    // console.log(this.router.url);
    if (this.router.url=='/contest-team') {
      this.router.navigate(['/menu/home'])
    }
  }
  
}
