import { Component,OnDestroy,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoaderCompComponent } from 'src/app/loader-comp/loader-comp.component';
import { ApiCallService } from 'src/app/service/api-call.service';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})
export class NotifyComponent implements OnInit,OnDestroy {
  
  my_notify_list:any[]=[]
  todayDate=new Date().getDate()
  today: any[]=[];

  constructor(private _apiService:ApiCallService,private dialog: MatDialog){}
 
  ngOnDestroy(): void {
    this.dialog.closeAll()
  }

  ngOnInit(): void {
    
    this.dialog.open(LoaderCompComponent)
    
    this._apiService.getnotifications().subscribe({
      next:(res:any)=>{
        this.dialog.closeAll()
        console.log(res);

        const previous=res[0].previous
        this.today=res[0].today

        const toalData=[...previous];
        // ---------------
        let unique_value=[...new Set(toalData.map((x:any)=>x.created_at))]

        const notify:any=[]
        let list:any[]=[]
  
        unique_value.filter((titles:any,index:number)=>{
          list=[]
          toalData.filter((data:any,index:number)=>{ 
            if (titles==data.created_at) {
              list.push(data)
            }
          })
        
          notify.push({date:titles,msg:list})
          
        })
        console.log(notify);
        this.my_notify_list=notify
        // ---------------
      }
    })

  }

}
