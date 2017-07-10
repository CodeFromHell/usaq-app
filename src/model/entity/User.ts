export class User {
  constructor(public username: string, public password: string, public password_repeat?: string) {
  }

  static  toUserFromJSON(data : string){
    let jsonData = JSON.parse(data);
    var dataToUser : User = new User(jsonData.username, jsonData.password,  jsonData.password_repeat);
    return dataToUser;
  }

  static  toJSONFromUser(user : User){
    return JSON.stringify(user);
  }

}
