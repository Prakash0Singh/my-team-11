import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customPipe'
})
export class CustomPipePipe implements PipeTransform {

  transform(value: any[]): any[] {
    return value?.sort((n1,n2) => 
    {
      return n1.userno - n2.userno ; 
    });
  }

}
