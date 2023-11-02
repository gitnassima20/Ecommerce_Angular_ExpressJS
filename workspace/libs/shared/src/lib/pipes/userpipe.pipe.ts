import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userpipe'
})
export class UserpipePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }

    const parts = value.split(' ');
    if (parts.length > 0) {
      return parts[0];
    } else {
      return value;
    }
  
  }

}
