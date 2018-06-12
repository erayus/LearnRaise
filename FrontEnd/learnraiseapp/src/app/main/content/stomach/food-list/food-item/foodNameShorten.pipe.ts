import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'nameShorten'
})

export class FoodNameShortenPipe implements PipeTransform{
  transform(value: any) {
    if (value.length > 25) {
      return value.substr(0, 22) + '..' ;
    } else {
      return value;
    }
 }
}

