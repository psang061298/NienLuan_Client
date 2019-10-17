import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTitle'
})
export class FormatTitlePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.substr(0,args) + " ...";
  }

}
