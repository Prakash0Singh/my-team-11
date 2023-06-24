import { Component } from '@angular/core';
import { ApiCallService } from 'src/app/service/api-call.service';

@Component({
  selector: 'app-refer-code',
  templateUrl: './refer-code.component.html',
  styleUrls: ['./refer-code.component.css']
})
export class ReferCodeComponent {

  constructor(public _apiService: ApiCallService,){}


}
