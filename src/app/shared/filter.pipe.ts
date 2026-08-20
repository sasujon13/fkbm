import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], filterString: string, propNames?: string[]): any[] {
    if (!value || !filterString) {
      return value;
    }
  
    const normalizedFilter = filterString.trim().toLowerCase().normalize("NFD");
  
    return value.filter((item: any) => {
      const keys = propNames && propNames.length > 0 ? propNames : Object.keys(item);
      return keys.some(key => {
        const fieldValue = item[key];
        if (fieldValue && typeof fieldValue === 'string') {
          return fieldValue.trim().toLowerCase().normalize("NFD").includes(normalizedFilter);
        }
        return false;
      });
    });
  }  
}
