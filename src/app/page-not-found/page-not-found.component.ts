import { Component,ViewChild,OnInit, TemplateRef } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

constructor(public router:Router,private dialog:MatDialog){}

@ViewChild('callAPIDialog') callAPIDialog!: TemplateRef<any>; 

ngOnInit(): void {
  
}
showdialog(){
  this.dialog.open(this.callAPIDialog)

}
}
  



