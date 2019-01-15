import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
// import * as https from "https";
declare var $: any;
@Injectable()
export class DictionaryService {
  wordNikAPI = "6f5c4a3558f34bbb7500c033d5c0ec4cb4447bbf144994657";
  constructor(private http: HttpClient) {
  }

  lookUpFood(foodName: string) {
    return this.http.get<any>(`https://googledictionaryapi.eu-gb.mybluemix.net/?define=${foodName.toLowerCase()}&lang=en`)
      .map(
        (response) => {
          // Format response into an object
          const result = response[0];
          return result;
        }
      )
  }

  getWordPronunciation(word) {
    return this.http.get<any>(`https://api.wordnik.com/v4/word.json/${word.toLowerCase()}/audio?useCanonical=false&limit=1&api_key=${this.wordNikAPI}`)
      .map(
        (response) => {
          // Format response into an object
          console.log(response);
          const mp3FileUrl = response[0].fileUrl;
          return mp3FileUrl;
        }
      )
  }
}
