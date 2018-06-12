import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'typeShorten'
})

export class FoodTypeShortenPipe implements PipeTransform{
  transform(value: any) {
    if (value === 'noun' || value === 'verb' && value !== 'none') {
      return value.substr(0, 1);
    } else if (value !== 'noun' && value !== 'none'){
      return value.substr(0, 3);
    } else {
      return ' '
    }
  }
}
