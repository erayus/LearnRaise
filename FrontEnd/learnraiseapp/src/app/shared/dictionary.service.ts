import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";

@Injectable()
export class DictionaryService {
  constructor(private http: Http) {}
  lookUpFood( foodName: string ) {
    return this.http.get(`https://api.pearson.com/v2/dictionaries/ldoce5,lasde,wordwise,laad3,laes/entries?headword=${foodName.toLowerCase()}`)
      .map(
        (response: Response ) => {
          const data = response.json();
          const result = data.results;
          return result;
        },
        (error) => {
          alert(error);
        }
      )
  }
}
