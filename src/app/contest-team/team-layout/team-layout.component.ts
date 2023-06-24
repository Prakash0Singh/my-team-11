import { Component ,OnInit} from '@angular/core';

@Component({
  selector: 'app-team-layout',
  templateUrl: './team-layout.component.html',
  styleUrls: ['./team-layout.component.css'],
})
export class TeamLayoutComponent implements OnInit {
  constructor(){}
  myTeam:any[]=[]
  ngOnInit(): void {
    this.myTeam=JSON.parse(localStorage.getItem('myteam')||'[]')
  }

}
