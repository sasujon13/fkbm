import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], filterString: string, propNames: string[]): any[] {
    if (!value || !filterString || propNames.length === 0) {
      return value;
    }

    const normalizedFilter = filterString.trim().toLowerCase().normalize("NFD");

    return value.filter((item: any) => {
      return propNames.some(propName => {
        const fieldValue = item[propName];
        if (fieldValue && typeof fieldValue === 'string') {
          return fieldValue.trim().toLowerCase().normalize("NFD")
            .includes(normalizedFilter);
        }
        return false;
      });
    });
  }
}
