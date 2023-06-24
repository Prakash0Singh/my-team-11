import { Component } from '@angular/core';

@Component({
  selector: 'app-t-c',
  templateUrl: './t-c.component.html',
  styleUrls: ['./t-c.component.css']
})
export class TCComponent {
  current_div='general';
  showthis(target:any){
    console.log(target.id);
    this.current_div=target.id
  }
}
