import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'typeShorten'
})

export class FoodTypeShortenPipe implements PipeTransform{
  transform(types: any[]) {
    let resultArray = [];
    for (let type of types){
      if (type === 'noun' || type === 'verb' && type !== 'none') {
        resultArray.push(type.substr(0, 1));
      } else if (type!== 'noun' && type !== 'none'){
        resultArray.push(type.substr(0, 3));
      } else {
        resultArray.push(' ')
      }
    }
    return resultArray
  }
}
