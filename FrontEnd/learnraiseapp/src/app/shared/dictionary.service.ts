import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class DictionaryService {
  constructor(private http: HttpClient) {}
  lookUpFood( foodName: string ) {
    return this.http.get<any>(`https://api.pearson.com/v2/dictionaries/ldoce5,lasde,wordwise,laad3,laes/entries?headword=${foodName.toLowerCase()}`)
      .map(
        (response) => {
          const result = response.results;
          return result;
  },
        (error) => {
          alert(error);
        }
      )
  }
}
