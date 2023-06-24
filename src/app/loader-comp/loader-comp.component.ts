import { Component } from '@angular/core';
import { MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-loader-comp',
  templateUrl: './loader-comp.component.html',
  styleUrls: ['./loader-comp.component.css']
})
export class LoaderCompComponent {
 constructor(private matdialogRef:MatDialogRef<LoaderCompComponent>) {

  this.matdialogRef.disableClose=true


 }
}
