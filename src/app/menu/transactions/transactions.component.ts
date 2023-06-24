import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoaderCompComponent } from 'src/app/loader-comp/loader-comp.component';
import { ApiCallService } from 'src/app/service/api-call.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit,OnDestroy {
  mytrans_list: any[]=[];
  
  constructor(private _apiService:ApiCallService,private dialog: MatDialog) {}

  ngOnDestroy(): void {
    this.dialog.closeAll()
  }

  transactions:any=[]
  panelOpenState = false;

  ngOnInit(){

    this.dialog.open(LoaderCompComponent)
    this._apiService.getmytransactions().subscribe({
      next:(res:any)=>{
        this.dialog.closeAll()
        this.transactions=res
        let unique_value=[...new Set(res.map((x:any)=>x.date_time.substring(-1, 12)))]

        const transactions:any=[]
        let list:any[]=[]
  
        unique_value.filter((titles:any,index:number)=>{
          list=[]
          res.filter((data:any,index:number)=>{ 
            if (titles==data.date_time.substring(-1, 12)) {
              list.push(data)
            }
          })
        
          transactions.push({title:titles,list:list})
          
        })
        console.log(transactions);
        this.mytrans_list=transactions
      }
    })
  }

}
