import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchdata'
})
export class SearchDataPipe implements PipeTransform {

  transform(items: any[], value: string, label: string, b: boolean = false, filteredDataLength: any): any[] {
    let result
    if (!items) return [];
    if (!value) return items;
    if (value == '' || value == null) return [];
    if (!b) {
      result = items.filter(e => e[label].toLowerCase().indexOf(value.toLowerCase())! > -1);
      filteredDataLength.count = result.length;
      console.log('Length:' + result.length)

      if (result.length === 0) {
        return [-1];
      }
    }
    else {
      result = items.filter(e => e.toLowerCase().indexOf(value.toLowerCase())! > -1);
    }
    return result;
  }

}