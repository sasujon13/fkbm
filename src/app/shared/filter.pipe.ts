import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterString: string, propNames: string[]): any[] {
    if (!value || filterString === '' || propNames.length === 0) {
      return value;
    }

    return value.filter((item: any) => {
      for (const propName of propNames) {
        if (item[propName].trim().toLowerCase().includes(filterString.toLowerCase())) {
          return true; // Return true if any property matches the filter
        }
      }
      return false; // None of the properties match the filter
    });
  }
}
