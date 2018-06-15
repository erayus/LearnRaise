
/**
 * This is used to store and get information in the local storage
*/

export class LocalStorageManager{

  constructor(){}

  getUserInfo(){
    const userKey = Object.keys(window.localStorage)
      .filter(it => it.startsWith('firebase:authUser'))[0];
    if (userKey != undefined) {
      const user =  JSON.parse(localStorage.getItem(userKey));
      return user;
    } else {
      console.log("Error: Cannot find user Id in the local storage");
      return false;
    }
  }
}
