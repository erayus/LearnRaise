import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'spaceAdder'
})
//This pipe transform an array into a string separated by commas
export class FoodSynonymsSpaceAdderPipe implements PipeTransform{
  transform(value: string[]) {
    if (value){
      let stringWithCommmas = value.join(", ");
      return stringWithCommmas;
    }
  }

}

