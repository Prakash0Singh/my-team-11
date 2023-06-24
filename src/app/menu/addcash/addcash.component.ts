import { Component,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiCallService } from 'src/app/service/api-call.service';

@Component({
  selector: 'app-addcash',
  templateUrl: './addcash.component.html',
  styleUrls: ['./addcash.component.css']
})
export class AddcashComponent implements OnInit {
  totalAmount:any='';
  availBal: any;
  defalutValue:any=100
  constructor( private _apiService: ApiCallService){}
  ngOnInit(): void {
  this.availBal=localStorage.getItem('totalbalance')
  console.log(this.availBal);
  }
  addbalance(){
    
  }
  clearBalance(){
    this.defalutValue=''
  }

  addhundred(){
    this.defalutValue=Number(this.defalutValue)+100;
  }
  addfivehundred(){
    this.defalutValue=Number(this.defalutValue)+500;
  }
  addcash(){
    if(this.defalutValue<10){
    this._apiService.snackMessage('Minimum ₹10 is requied')
    }
  }
}
