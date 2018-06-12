import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'foodFilter',
  pure: true
})
export class FoodFilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string): any {
    if (value.length === 0 || filterString === '') {
      return value
    }
    const resultArr = [];
    for (const item of value) {
      const filterStrLength = filterString.length;
      console.log(item[propName.substr(0, filterStrLength)]);
      if (item[propName].toLowerCase() === filterString.toLowerCase()) {
        resultArr.push(item);
      }else if (item[propName].substr(0, filterStrLength).toLowerCase() === filterString) {
        resultArr.push(item);
      }
    }
    return resultArr;
  }
}
