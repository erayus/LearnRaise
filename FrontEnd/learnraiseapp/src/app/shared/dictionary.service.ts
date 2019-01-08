import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
// import * as https from "https";
declare var $: any;
@Injectable()
export class DictionaryService {
  constructor(private http: HttpClient) {
  }

  lookUpFood(foodName: string) {
    return this.http.get<any>(`https://googledictionaryapi.eu-gb.mybluemix.net/?define=${foodName.toLowerCase()}&lang=en`)
      .map(
        (response) => {
          //Format response into an object
          const result = response[0];
          return result;
        }
      )
  }

  textOxford() {
    var result;

    var googleAPI = "https://googledictionaryapi.eu-gb.mybluemix.net/";
    var app_key = "6f5c4a3558f34bbb7500c033d5c0ec4cb4447bbf144994657";
    $.ajax({
      url:"https://api.wordnik.com/v4/word.json/cool/definitions?limit=200&includeRelated=false&useCanonical=false&includeTags=false&api_key=" + app_key,
      dataType: 'json',
      success: function (response) {
      }
    });
  }
}
