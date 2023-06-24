import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortUsers'
})
export class SortUsersPipe implements PipeTransform {

  transform(value: any[]): any[] {
    return value?.sort((n1,n2) => 
    {
      return n1.rank - n2.rank ; 
    });
  }

}
